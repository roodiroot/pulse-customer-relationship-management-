"use server";

import { getCompanyById } from "@/data/companies/get-companies";
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

  const company = await getCompanyById(companyId);
  if (!company) {
    return {
      error: "Компании с таким ID не существует.",
    };
  }

  try {
    const deal = await db.deal.create({
      data: {
        name: validated.name,
        companyId: companyId,
      },
    });
    revalidatePath("/companies/[id]");
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
