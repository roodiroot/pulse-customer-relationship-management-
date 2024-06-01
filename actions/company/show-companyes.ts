"use server";

import { getAllCompanies } from "@/data/companies/get-companies";

export const showCompanies = async (
  userId?: string,
  take?: number,
  skip?: number
) => {
  const companies = await getAllCompanies(userId, take, skip);
  return companies;
};
