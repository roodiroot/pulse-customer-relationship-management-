import { db } from "@/lib/db";

export const getAllDeals = async (take?: number, skip?: number) => {
  try {
    const deals = await db.deal.findMany({ take, skip });
    return deals;
  } catch {
    return null;
  }
};

export const getDealById = async (id: string) => {
  try {
    const deal = await db.deal.findUnique({
      where: { id },
      include: {
        cases: {
          orderBy: { date: "asc" },
        },
      },
    });
    return deal;
  } catch {
    return null;
  }
};
