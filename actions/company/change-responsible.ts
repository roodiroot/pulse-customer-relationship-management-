"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getUserById } from "@/data/auth/user";
import { getCompanyById } from "@/data/companies/get-companies";

export const changeResponsible = async (
  companyId: string,
  userId: string | null
) => {
  if (userId === "null") userId = null;
  const company = await getCompanyById(companyId); // проверка на существование компании
  if (!company)
    return {
      error: "Такой компании не существует",
    };

  if (userId !== null) {
    const user = await getUserById(userId); // проверка на существование юзера
    if (!user)
      return {
        error: "Такого пользователя не существует",
      };
  }

  try {
    await db.company.update({
      where: {
        id: companyId,
      },
      data: {
        userId: userId,
      },
    });
    revalidatePath("/companies/[id]", "page");
  } catch {
    return {
      error: "Не предвиденная ошибка",
    };
  }
};
