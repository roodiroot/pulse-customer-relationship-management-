import { db } from "@/lib/db";
import { ROW_TABLE } from "@/constance/row-table";
import { Deal, StageDeal, UserRole } from "@prisma/client";

export interface ResDeals extends Deal {
  company: {
    name: string | null;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
      role: UserRole;
    } | null;
  } | null;
}

interface DataDeals {
  userId?: string | null;
  start?: Date;
  end?: Date;
  stage?: StageDeal;
  take?: number;
  skip?: number;
}

export const getAllDeals = async ({
  userId,
  start,
  end,
  stage,
  take,
  skip,
}: DataDeals): Promise<{ deals: ResDeals[]; count: number }> => {
  const parametrsSearch = {
    where: {
      company: {
        userId: userId,
      },
      createdAt: {
        gte: start,
        lte: end,
      },
      stage: stage,
    },
  };
  try {
    const deals = await db.deal.findMany({
      ...parametrsSearch,
      take: take || ROW_TABLE,
      skip: skip || 0,
      include: {
        company: {
          include: { user: true },
        },
      },
    });

    const count = await db.deal.count({
      ...parametrsSearch,
    });
    return { deals, count };
  } catch {
    throw new Error("error");
  }
};

export const getDealById = async (id: string) => {
  try {
    const deal = await db.deal.findUnique({
      where: { id },
      include: {
        company: {
          include: { user: true },
        },
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
