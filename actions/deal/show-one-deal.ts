"use server";

import { getDealById } from "@/data/deal/data-deal";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const showOneDealById = async (id: string) => {
  const user = await currentUser();
  const deal = await getDealById(id);
  if (user?.role === UserRole.ADMIN || user?.id === deal?.company?.userId) {
    return deal;
  }
  return null;
};
