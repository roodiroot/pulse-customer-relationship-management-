"use server";

import { getDealById } from "@/data/deal/get-deals";

export const showOneDealById = async (id: string) => {
  const deal = await getDealById(id);

  return deal;
};
