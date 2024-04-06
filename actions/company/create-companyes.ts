"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { CompanySchema } from "@/schemas";
import { createContact } from "../contact/create-contact";

export const createCompany = async (value: z.infer<typeof CompanySchema>) => {
  const validated = CompanySchema.parse(value);
  if (!validated) {
    return {
      error: "Введены не правильные данные",
    };
  }

  try {
    const company = await db.company.create({
      data: {
        name: validated.name,
        comment: validated.comment,
        TIN: validated.TIN,
      },
    });
    for (let i = 0; i < validated.contacts.length; i++) {
      await createContact(
        {
          name: validated.contacts[i].name,
          phone: validated.contacts[i].phone,
          mail: validated.contacts[i].mail,
          comment: validated.contacts[i].comment,
        },
        company.id
      );
    }
    revalidatePath("/add-project");
    return {
      success: "Данные успешно сохранены",
      company,
    };
  } catch {
    return {
      error: "Не предвиденная ошибка",
    };
  }
};
