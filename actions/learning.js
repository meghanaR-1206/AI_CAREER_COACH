"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma"; // ✅ your prisma.js must export `db`
import { auth } from "@clerk/nextjs/server"; // assuming you use Clerk auth

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export async function createCourseWithGemini(skill) {
  const prompt = `
You are an expert course designer.

Create a beginner-friendly course on: "${skill}".

Respond ONLY in raw JSON (no backticks or markdown):
{
  "title": "Course Title",
  "description": "Brief course summary",
  "steps": [
    {
      "title": "Step Title",
      "content": "Explain this step in 3-5 sentences."
    }
  ]
}
Include 5–7 steps only.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    const cleaned = response.replace(/```json|```/g, "").trim();

    let course;
    try {
      course = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ Failed to parse Gemini output:", cleaned);
      throw new Error("Invalid JSON from Gemini");
    }

    // ✅ Validate structure
    if (!course.title || !Array.isArray(course.steps)) {
      console.error("❌ Gemini response missing title or steps:", course);
      throw new Error("Gemini returned invalid course structure");
    }

    // ✅ Save to DB
    const savedCourse = await db.course.create({
      data: {
        title: course.title,
        description: course.description || `Learn ${skill} with this structured course.`,
        steps: {
          create: course.steps.map((step, index) => ({
            title: step.title,
            content: step.content,
            order: index + 1,
          })),
        },
      },
      include: {
        steps: true,
      },
    });

    console.log("✅ Course created successfully:", savedCourse.id);
    return savedCourse;
  } catch (error) {
    console.log("🔥 db.course:", db.course);

    console.error("❌ Course creation failed:", error);
    throw new Error("Course generation failed. Please try again.");
  }
}
// ✅ 2. Mark step complete
export async function markStepComplete(courseId, stepId) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const progress = await db.courseProgress.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {
      completedSteps: {
        push: stepId,
      },
    },
    create: {
      userId,
      courseId,
      completedSteps: [stepId],
    },
  });

  return progress;
}

// ✅ 3. Get course progress for user
export async function getCourseProgress(courseId) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const progress = await db.courseProgress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  return progress?.completedSteps || [];
}

// ✅ 4. Get all available courses
export async function getCourses() {
  try {
    if (!db?.course?.findMany) {
      console.warn("db.course.findMany is unavailable.");
      return []; // fallback
    }

    const courses = await db.course.findMany({
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return []; // fallback empty array
  }
}

export async function explainStepWithGemini(courseTitle, stepTitle, stepContent) {
  const prompt = `
You are an expert educator.

Please explain the following step in more detail as part of the course "${courseTitle}".

Step Title: ${stepTitle}
Content: ${stepContent}

Your explanation should be beginner-friendly, use examples, and expand the concept clearly in 4–6 sentences.
Just return plain text only.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return text.trim();
  } catch (err) {
    console.error("❌ Gemini explanation failed:", err);
    return "Sorry, detailed explanation is currently unavailable.";
  }
}