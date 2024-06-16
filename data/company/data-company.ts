import { db } from "@/lib/db";
import { Company } from "@prisma/client";

export interface ResCompany extends Company {
  user: {
    name: string | null;
  } | null;
}

interface DataCompanies {
  userId?: string | null;
  responsible?: string | null;
  take?: number;
  skip?: number;
}

export const getAllCompanies = async ({
  userId,
  take,
  skip,
}: DataCompanies): Promise<{ companies: ResCompany[]; count: number }> => {
  const wherwSearchParams = {
    where: {
      userId: userId,
    },
  };
  try {
    const companies = await db.company.findMany({
      ...wherwSearchParams,
      include: { user: { select: { name: true } } },
      take,
      skip,
    });
    const count = await db.company.count({
      ...wherwSearchParams,
    });
    return { companies, count };
  } catch {
    throw new Error("Error fetching companies");
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
