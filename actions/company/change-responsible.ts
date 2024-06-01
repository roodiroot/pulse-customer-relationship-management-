"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getUserById } from "@/data/auth/user";
import { getCompanyById } from "@/data/companies/get-companies";

export const changeResponsible = async (companyId: string, userId: string) => {
  const company = await getCompanyById(companyId); // проверка на существование компании
  if (!company)
    return {
      error: "Такой компании не существует",
    };

  const user = await getUserById(userId); // проверка на существование юзера
  if (!user)
    return {
      error: "Такого пользователя не существует",
    };

  try {
    await db.company.update({
      where: {
        id: companyId,
      },
      data: {
        userId: userId === "null" ? null : userId,
      },
    });
    revalidatePath("/companies/[id]", "page");
  } catch {
    return {
      error: "Не предвиденная ошибка",
    };
  }
};
