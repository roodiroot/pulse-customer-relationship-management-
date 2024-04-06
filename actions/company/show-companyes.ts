"use server";

import { getAllCompanies } from "@/data/companies/get-companies";

export const showCompanies = async (take?: number, skip?: number) => {
  const companies = await getAllCompanies(take, skip);
  return companies;
};
