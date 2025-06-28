"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
You are a JSON-only response generator.

Generate exactly 10 multiple-choice technical interview questions for a ${user.industry} professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.

Each question must have:
- 4 options (a-d)
- 1 correct answer
- 1 explanation

Respond ONLY with the following strict JSON format (no Markdown, no extra text):

{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    },
    ...
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("🧠 GEMINI RAW RESPONSE:\n", text);

    // Remove Markdown ticks or extra text if needed
    const cleanedText = text.replace(/```(?:json)?\n?|```/g, "").trim();

    // Try parsing the JSON
    let quiz;
    try {
      const match = cleanedText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON object found in Gemini response.");
      quiz = JSON.parse(match[0]);
    } catch (err) {
      console.error("❌ Error parsing Gemini JSON:\n", err);
      throw new Error("Failed to parse Gemini quiz JSON format.");
    }

    return quiz.questions;
  } catch (error) {
    console.error("❌ Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect: "${q.answer}"\nUser: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
Based on the user's wrong answers for ${user.industry}, give 1 specific and encouraging tip for improvement.

Avoid pointing out mistakes directly. Instead, say what to study or practice next.

Wrong Answers:
${wrongText}
`;

    try {
      const tipResult = await model.generateContent(improvementPrompt);
      improvementTip = tipResult.response.text().trim();
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}
