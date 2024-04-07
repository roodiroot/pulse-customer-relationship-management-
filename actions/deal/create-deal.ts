"use server";

import { db } from "@/lib/db";
import { CreateDealSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createDeal = async (
  value: z.infer<typeof CreateDealSchema>,
  companyId?: string
) => {
  if (!companyId) {
    return {
      error: "Не указан ID компании.",
    };
  }
  const validated = CreateDealSchema.parse(value);
  if (!validated) {
    return {
      error: "Введены не правильные данные.",
    };
  }

  try {
    const deal = await db.deal.create({
      data: {
        name: validated.name,
        companyId: companyId,
      },
    });
    return {
      success: "Сделка успешно создана.",
      deal,
    };
  } catch {
    return {
      error: "Не предвиденная ошибка.",
    };
  }
};
