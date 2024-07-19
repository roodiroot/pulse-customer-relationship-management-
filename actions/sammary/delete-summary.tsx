"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSummariesByDealId } from "@/data/summary/data-summaries";

export const deleteSummariesByDealId = async (dealId: string) => {
  try {
    const { count } = await getSummariesByDealId(dealId);
    if (count) {
      await db.summary.deleteMany({ where: { dealId } });
    }
    revalidatePath("/companies/[id]/[dealId]", "page");
    return { success: "Success." };
  } catch (error) {
    return { error: "Что то пошло не так." };
  }
};
