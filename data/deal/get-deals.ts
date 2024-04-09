import { ROW_TABLE } from "@/constance/row-table";
import { db } from "@/lib/db";
import { Deal } from "@prisma/client";

const endDate = (date?: Date) => {
  if (date) {
    const start = new Date(date);
    return new Date(start?.getTime() + 86400000);
  }
  return undefined;
};

export const getAllDeals = async (params?: any, skip?: number) => {
  // console.log("параметры", params);
  const parametrsSearch = {
    where: {
      createdAt: {
        gte: params?.start ? new Date(params?.start) : undefined,
        lte: params?.end ? params?.end : endDate(params?.start),
      },
      stage: params?.stage,
      // type: params?.type,
      // finished: params?.finished,
    },
  };
  try {
    const deals = await db.deal.findMany({
      ...parametrsSearch,
      take: params?.take || ROW_TABLE,
      skip: params?.skip || 0,
      include: {
        company: true,
      },
    });

    const count = await db.deal.count({
      ...parametrsSearch,
    });
    return { deals, count };
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
