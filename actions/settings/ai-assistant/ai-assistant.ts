"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const ai_comment_summarization = async () => {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found." };
  }
  const settings = await db.settings.findUnique({
    where: { userId: user?.id },
  });
  if (!settings) {
    try {
      // register settings
      await db.settings.create({
        data: {
          userId: user.id,
        },
      });
    } catch (error) {
      return { error: "Что то пошло не так." };
    }
  }
  try {
    await db.settings.update({
      where: { userId: user?.id },
      data: { aiAssistent: !user?.settings.aiAssistent },
    });
    revalidatePath("/companies/[id]/[dealId]", "page");
  } catch {
    return { error: "Что то пошло не так." };
  }
};
