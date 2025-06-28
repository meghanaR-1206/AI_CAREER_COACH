"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // 🔁 Generate Gemini insights BEFORE transaction
  let insights;
  const existing = await db.industryInsight.findUnique({
    where: { industry: data.industry },
  });

  if (!existing) {
    try {
      insights = await generateAIInsights(data.industry);
    } catch (err) {
      console.error("❌ Gemini generation failed:", err);
      throw new Error("Failed to generate industry insights");
    }
  }

  try {
    const result = await db.$transaction(async (tx) => {
      let industryInsight = existing;

      if (!existing) {
        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio || "",
          skills: Array.isArray(data.skills) ? data.skills : [],
        },
      });

      return { updatedUser, industryInsight };
    });

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("❌ Error updating user:", error);
    throw new Error("Failed to update profile");
  }
}


export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  return {
    isOnboarded: !!user?.industry,
  };
}
