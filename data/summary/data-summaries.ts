import { db } from "@/lib/db";

import { Summary } from "@prisma/client";

export const getSummariesByDealId = async (
  dealId: string
): Promise<{ summary: Summary[]; count: number }> => {
  try {
    const summary = await db.summary.findMany({
      where: { dealId },
    });
    const count = await db.summary.count({
      where: { dealId },
    });
    return { summary, count };
  } catch {
    throw new Error("error");
  }
};
