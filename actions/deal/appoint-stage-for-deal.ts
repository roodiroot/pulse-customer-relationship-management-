"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { StageDeal } from "@prisma/client";

export const appointStageForDeal = async (dealId: string, stage: StageDeal) => {
  if (!dealId || !stage) return { error: "Не все данные переданы." };

  try {
    await db.deal.update({
      where: {
        id: dealId,
      },
      data: {
        stage: stage,
      },
    });
    revalidatePath("/analytics");
    revalidatePath("/companies/[id]", "page");
    revalidatePath("/companies/[id]/deal/[dealId]", "page");
    return { success: "Статус успешно изменен." };
  } catch {
    return { error: "Не удалось изменить статус сделки." };
  }
};
