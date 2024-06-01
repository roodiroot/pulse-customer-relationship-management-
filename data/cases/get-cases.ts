import { ROW_TABLE } from "@/constance/row-table";
import { db } from "@/lib/db";
import { Case, Company, Deal } from "@prisma/client";

interface DealList extends Deal {
  company: Company;
}

export interface CaseList extends Case {
  deals: DealList[];
}

const endDate = (date?: Date) => {
  if (date) {
    const start = new Date(date);
    return new Date(start?.getTime() + 86400000);
  }
  return undefined;
};

export const getAllCases = async (params?: any) => {
  // console.log("параметры", params);
  const parametrsSearch = {
    where: {
      deals: { company: { userId: params?.userId } },
      date: {
        gte: params?.start ? new Date(params?.start) : undefined,
        lte: params?.end ? params?.end : endDate(params?.start),
      },
      type: params?.type,
      finished: params?.finished,
    },
  };
  try {
    const cases = await db.case.findMany({
      ...parametrsSearch,

      take: params?.take || ROW_TABLE,
      skip: params?.skip || 0,
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
    return null;
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
