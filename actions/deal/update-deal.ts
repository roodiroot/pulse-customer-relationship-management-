"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { UpdateDealSchema } from "@/schemas";
import { getCompanyById } from "@/data/company/data-company";
import { getDealById } from "@/data/deal/data-deal";

export const updateDeal = async (
  value: z.infer<typeof UpdateDealSchema>,
  dealId: string
) => {
  const validated = UpdateDealSchema.parse(value);
  if (!validated) {
    return {
      error: "Введены не правильные данные",
    };
  }

  const deal = await getDealById(dealId);
  if (!deal) {
    return {
      error: "Сделки с таким ID не существует.",
    };
  }

  try {
    const deal = await db.deal.update({
      where: { id: dealId },
      data: {
        name: validated.name,
        contractPrice: validated.contractPrice,
      },
    });
    revalidatePath("/companies/[id]/[dealId]", "page");
    return {
      success: "Данные успешно обновлены",
      deal,
    };
  } catch {
    return {
      error: "Не предвиденная ошибка",
    };
  }
};
