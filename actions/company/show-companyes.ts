"use server";

import { ROW_TABLE } from "@/constance/row-table";
import { getAllCompanies } from "@/data/company/data-company";
import { UserRole } from "@prisma/client";

export const showCompanies = async ({
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
  };
}) => {
  if (["USER"].includes(user?.userRole || "") || user?.bloked) {
    return {
      success: false,
      error: "У вас нет разрешения на доступ к этой странице",
      companies: [],
      count: 0,
    };
  }

  const take = Number(params?.take) || ROW_TABLE;
  const page = Number(params?.page) || 1;
  const skip = page * take - take;
  const responsible =
    params?.responsible === "null" ? null : params?.responsible || undefined;
  const userId = ["ADMIN", "SALES_MANAGER"].includes(user?.userRole || "USER")
    ? responsible
    : user?.userId;
  const start = params?.date ? new Date(params.date) : undefined;
  const end = params?.dateEnd
    ? new Date(new Date(params.dateEnd).getTime() + 86400000)
    : start
    ? new Date(start.getTime() + 86400000)
    : undefined;

  const data = await getAllCompanies({
    userId,
    start,
    end,
    take,
    skip,
  });
  return { success: true, error: "", ...data };
};
