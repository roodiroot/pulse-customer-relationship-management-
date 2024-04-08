"use server";

import { db } from "@/lib/db";
import { StageDeal } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/companies/[id]/deal/[dealId]", "page");
    revalidatePath("/companies/[id]", "page");
    return { success: "Статус успешно изменен." };
  } catch {
    return { error: "Не удалось изменить статус сделки." };
  }
};
