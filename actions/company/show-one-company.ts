"use server";

import { getCompanyById } from "@/data/companies/get-companies";
import { currentUser } from "@/lib/auth";

export const showOneCompanyById = async (id: string) => {
  const user = await currentUser();
  const company = await getCompanyById(id);
  if (user?.role === "ADMIN" || user?.id === company?.userId) {
    return company;
  }
  return null;
};
