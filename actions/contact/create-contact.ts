"use server";

import { getCompanyById } from "@/data/company/data-company";
import { db } from "@/lib/db";
import { ContactSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createContact = async (
  value: z.infer<typeof ContactSchema>,
  companyId?: string
) => {
  if (!companyId) {
    return {
      error: "Не указан ID компании.",
    };
  }
  const validated = ContactSchema.parse(value);
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
    await db.contact.create({
      data: {
        name: validated.name,
        phone: validated.phone.replace(/\D/g, ""),
        mail: validated.mail,
        comment: validated.comment,
        companyId,
      },
    });
    revalidatePath("/companies/[id]", "page");
    return {
      success: "Данные успешно сохранены.",
    };
  } catch {
    return {
      error: "Не предвиденная ошибка.",
    };
  }
};
