"use server";

import { getCompanyById } from "@/data/companies/get-companies";
import { getDealById } from "@/data/deals/get-deals";

export const showOneDealById = async (id: string) => {
  const deal = await getDealById(id);

  return deal;
};
