"use server";

import { getSummariesByDealId } from "@/data/summary/data-summaries";

export const showSummariesById = async (id: string) => {
  const summary = await getSummariesByDealId(id);
  return summary;
};
