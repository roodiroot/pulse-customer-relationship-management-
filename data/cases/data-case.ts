import { db } from "@/lib/db";
import { ROW_TABLE } from "@/constance/constance";

import { ActionType, Case, Company } from "@prisma/client";
import dayjs from "dayjs";

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
  // проверяем даты которые пришли на валидность
  if (!dayjs(start).isValid()) {
    start = undefined;
  }
  if (!dayjs(end).isValid()) {
    end = undefined;
  }

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
    // console.log({ start: start, end: end, count }, cases);
    return { cases, count };
  } catch (err) {
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
