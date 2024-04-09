"use server";

import { getAllDeals } from "@/data/deal/get-deals";

export const showDeals = async (params?: any) => {
  const cases = await getAllDeals(params);
  return cases;
};
