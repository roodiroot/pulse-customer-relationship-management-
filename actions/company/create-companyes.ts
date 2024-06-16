"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { CompanySchema } from "@/schemas";
import { createContact } from "../contact/create-contact";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const createCompany = async (value: z.infer<typeof CompanySchema>) => {
  const validated = CompanySchema.parse(value);
  const user = await currentUser();
  if (!user) {
    return {
      error: "Не найден user",
    };
  }
  if (user.role === UserRole.USER || user?.bloked) {
    return {
      error: "У вас нет прав для создания компании",
    };
  }
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
        address: validated.address,
        mainOKVED: validated.mainOKVED,
        owner: validated.owner,
        dateRegistr: validated.dateRegistr,
        userId: user.id,
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
