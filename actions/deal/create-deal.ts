"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { CreateDealSchema } from "@/schemas";
import { getCompanyById } from "@/data/company/data-company";

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
    revalidatePath("/analytics");
    revalidatePath("/companies/[id]", "page");
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
