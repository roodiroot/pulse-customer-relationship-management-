"use server";

import { ActionType, UserRole } from "@prisma/client";

import { ROW_TABLE } from "@/constance/row-table";
import { getAllCases } from "@/data/cases/data-case";

export const showCases = async ({
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
    type?: ActionType;
    finished?: string;
    take?: string;
    page?: string;
    responsible?: string;
  };
}) => {
  if (["USER"].includes(user?.userRole || "") || user?.bloked) {
    return {
      success: false,
      error: "У вас нет разрешения на доступ к этой странице",
      cases: [],
      count: 0,
    };
  }

  const responsible = params?.responsible || undefined;
  const userId = ["ADMIN", "SALES_MANAGER"].includes(user?.userRole || "USER")
    ? responsible
    : user?.userId;
  const take = Number(params?.take) || ROW_TABLE;
  const page = Number(params?.page) || 1;
  const skip = page * take - take;
  const start = params?.date ? new Date(params.date) : undefined;
  const end = params?.dateEnd
    ? new Date(new Date(params.dateEnd).getTime() + 86400000)
    : start
    ? new Date(start.getTime() + 86400000)
    : undefined;
  const type = params?.type;
  const finished =
    params?.finished === "1"
      ? true
      : params?.finished === "2"
      ? false
      : undefined;

  const data = await getAllCases({
    userId,
    type,
    finished,
    start,
    end,
    skip,
    take,
  });
  return { success: true, error: "", ...data };
};
