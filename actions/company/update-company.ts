"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { CompanySchema, UpdateCompanySchema } from "@/schemas";
import { createContact } from "../contact/create-contact";
import { getCompanyById } from "@/data/companies/get-companies";

export const updateCompany = async (
  value: z.infer<typeof UpdateCompanySchema>,
  companyId: string
) => {
  const validated = UpdateCompanySchema.parse(value);
  if (!validated) {
    return {
      error: "Введены не правильные данные",
    };
  }

  const company = await getCompanyById(companyId);
  if (!company) {
    return {
      error: "Компании с таким ID не существует.",
    };
  }

  try {
    const company = await db.company.update({
      where: { id: companyId },
      data: {
        name: validated.name,
        comment: validated.comment,
        TIN: validated.TIN,
        address: validated.address,
        mainOKVED: validated.mainOKVED,
        owner: validated.owner,
        dateRegistr: validated.dateRegistr,
      },
    });
    revalidatePath("/companies/[id]", "page");
    return {
      success: "Данные успешно обновлены",
      company,
    };
  } catch {
    return {
      error: "Не предвиденная ошибка",
    };
  }
};
