"use server";

import { getDealById } from "@/data/deal/get-deals";
import { currentUser } from "@/lib/auth";

export const showOneDealById = async (id: string) => {
  const user = await currentUser();
  const deal = await getDealById(id);
  if (user?.role === "ADMIN" || user?.id === deal?.company?.userId) {
    return deal;
  }
  return null;
};
