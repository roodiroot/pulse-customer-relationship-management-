import { ROW_TABLE } from "@/constance/row-table";
import { db } from "@/lib/db";
import { ActionType, Case, Company, Deal, StageDeal } from "@prisma/client";

export interface ResCase extends Case {
  deals: {
    id: string | null;
    createdAt: Date | null;
    name: string | null;
    companyId: string | null;
    stage: string | null;
    company: Company | null;
  } | null;
}

interface DataCase {
  userId?: string | null;
  start?: Date;
  end?: Date;
  type?: ActionType;
  finished?: boolean;
  take?: number;
  skip?: number;
}

export const getAllCases = async ({
  userId,
  type,
  finished,
  start,
  end,
  take,
  skip,
}: DataCase): Promise<{ cases: ResCase[]; count: number }> => {
  const parametrsSearch = {
    where: {
      deals: { company: { userId } },
      date: {
        gte: start,
        lte: end,
      },
      type,
      finished,
    },
  };
  try {
    const cases = await db.case.findMany({
      ...parametrsSearch,
      take: take || ROW_TABLE,
      skip: skip || 0,
      include: {
        deals: {
          include: {
            company: true,
          },
        },
      },
    });
    const count = await db.case.count({
      ...parametrsSearch,
    });

    return { cases, count };
  } catch {
    throw new Error("error");
  }
};

export const getCaseById = async (id: string) => {
  try {
    const work = await db.case.findUnique({
      where: { id },
    });
    if (!work) return null;
    return work;
  } catch {
    return null;
  }
};
