"use server";

import { getCompanyById } from "@/data/companies/get-companies";

export const showOneCompanyById = async (id: string) => {
  const company = await getCompanyById(id);

  return company;
};
