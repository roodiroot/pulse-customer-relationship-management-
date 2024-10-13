"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CompanySchema } from "@/schemas";
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
    revalidatePath("/analytics");
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
