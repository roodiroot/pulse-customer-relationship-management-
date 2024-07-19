"use server";

import { ROW_TABLE } from "@/constance/constance";
import { getAllDeals } from "@/data/deal/data-deal";
import { StageDeal, UserRole } from "@prisma/client";

export const showDeals = async ({
  user,
  params,
}: {
  user?: {
    userId?: string;
    userRole?: UserRole;
    bloked?: boolean;
  };
  params?: {
    date?: string;
    dateEnd?: string;
    take?: string;
    page?: string;
    responsible?: string;
    stage?: StageDeal | "NOT_DIS" | "all";
  };
}) => {
  if (["USER"].includes(user?.userRole || "") || user?.bloked) {
    return {
      success: false,
      error: "У вас нет разрешения на доступ к этой странице",
      deals: [],
      count: 0,
    };
  }

  const responsible =
    params?.responsible === "null" ? null : params?.responsible || undefined;
  const userId = ["ADMIN", "SALES_MANAGER"].includes(user?.userRole || "USER")
    ? responsible
    : user?.userId;

  const stage =
    params?.stage === "all"
      ? undefined
      : params?.stage === "NOT_DIS"
      ? null
      : params?.stage;
  const take = Number(params?.take) || ROW_TABLE;
  const page = Number(params?.page) || 1;
  const skip = page * take - take;
  const start = params?.date ? new Date(params.date) : undefined;
  const end = params?.dateEnd
    ? new Date(new Date(params.dateEnd).getTime() + 86400000)
    : start
    ? new Date(start.getTime() + 86400000)
    : undefined;

  const data = await getAllDeals({
    userId,
    start,
    end,
    take,
    skip,
    // @ts-ignore
    stage,
  });

  return {
    success: true,
    error: "",
    ...data,
  };
};
