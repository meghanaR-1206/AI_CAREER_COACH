"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "High" | "Medium" | "Low",
  "topSkills": ["skill1", "skill2"],
  "marketOutlook": "Positive" | "Neutral" | "Negative",
  "keyTrends": ["trend1", "trend2"],
  "recommendedSkills": ["skill1", "skill2"]
}

Only return valid raw JSON — no explanation, no markdown, no formatting. At least 5 roles, 5 skills, and 5 trends.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  const cleanedText = response.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleanedText);
    console.log("📦 Gemini Insights:", parsed);
    return parsed;
  } catch (err) {
    console.error("❌ Gemini output parsing failed:", response);
    throw new Error("Invalid Gemini response format");
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { industryInsight: true },
  });

  if (!user) throw new Error("User not found");

  // 👇 Check if insights already exist
  if (!user.industryInsight) {
    console.log("🚀 No insights found, generating with Gemini for:", user.industry);
    try {
      const insights = await generateAIInsights(user.industry);
      console.log("📦 Gemini Insights (after generation):", insights);

      const industryInsight = await db.industryInsight.create({
        data: {
          industry: user.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return industryInsight;
    } catch (err) {
      console.error("❌ Failed to generate Gemini insights:", err);
      throw new Error("Gemini generation failed");
    }
  }

  console.log("✅ Using existing insight from DB for:", user.industry);
  return user.industryInsight;
}
