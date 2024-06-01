import { db } from "@/lib/db";
import { Company } from "@prisma/client";

export interface ResCompany extends Company {
  user: {
    name: string | null;
  } | null;
}

export const getAllCompanies = async (
  userId?: string,
  take?: number,
  skip?: number
): Promise<ResCompany[] | null> => {
  try {
    const companies = await db.company.findMany({
      where: { userId },
      include: { user: { select: { name: true } } },
      take,
      skip,
    });
    return companies;
  } catch {
    return null;
  }
};

export const getCompanyById = async (id: string) => {
  try {
    const company = await db.company.findUnique({
      where: { id },
      include: {
        user: { select: { name: true } },
        deals: {
          orderBy: { name: "asc" },
        },
        contacts: {
          orderBy: { name: "desc" },
        },
      },
    });
    return company;
  } catch {
    return null;
  }
};
