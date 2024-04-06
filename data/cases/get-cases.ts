import { db } from "@/lib/db";
import { Case, Company } from "@prisma/client";

export interface CaseList extends Case {
  company: Company;
}

const endDate = (date?: Date) => {
  if (date) {
    return new Date(date?.getTime() + 86400000);
  }
  return;
};

export const getAllCases = async (
  params?: any,
  take?: number,
  skip?: number
): Promise<CaseList[] | null> => {
  try {
    const cases = await db.case.findMany({
      where: {
        date: {
          gte: params?.start,
          lte: params?.end ? params?.end : endDate(params?.start),
        },
        type: params?.type,
        finished: params?.finished,
      },
      take,
      skip,
      include: { company: true },
    });
    return cases;
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
