"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Improves a text field (summary, project, etc.) using Gemini AI
 * @param {string} input - The text to improve
 * @param {string} type - The type of field (e.g., "summary", "project")
 */
export async function improveTextWithAI(input, type) {
  if (!input || input.trim().length === 0) {
    return { error: "No input provided" };
  }

  const prompt = `
  Improve the following ${type} for a resume. Make it concise, professional, and ATS-friendly:\n\n${input}
  It is either about the person's project or the summary part in the Resume. give 3 to 4 lines.
  Return only the improved text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();
    return { improved: response };
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    return { error: "Failed to generate improved text" };
  }
}

export async function getResume() {
  const { userId } = await auth();
  const user = await db.resume.findUnique({
    where: { userId },
  });
  return user?.content ? JSON.parse(user.content) : null;
}


export async function saveResume(data) {
  const { userId } = await auth();
  await db.resume.upsert({
    where: { userId },
    update: {
      content: JSON.stringify(data),
      updatedAt: new Date(),
    },
    create: {
      userId,
      content: JSON.stringify(data),
    },
  });
}


export async function enhanceResumeWithAI(resumeData) {
  if (!resumeData || Object.keys(resumeData).length === 0) {
    return { error: "No resume data provided" };
  }

  const prompt = `
You are an expert in resume writing and optimization. Enhance the following resume JSON to be more concise, professional, and ATS-friendly:

${JSON.stringify(resumeData, null, 2)}

Return only the improved JSON, with the same structure. Do not add explanations or markdown formatting.
`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // 🔍 Remove Markdown ```json ... ``` wrapper if present
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```json|```/g, "").trim();
    }

    // 🧠 Parse JSON safely
    try {
      const parsed = JSON.parse(responseText);
      return { improved: parsed };
    } catch (parseErr) {
      console.error("❌ Still failed to parse AI JSON:", responseText);
      return { error: "AI response could not be parsed as JSON" };
    }
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    return { error: "Failed to enhance resume" };
  }
}
