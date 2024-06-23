"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCompany = async (companyId: string) => {
  if (!companyId) return { error: "Не указан ID компании." };

  try {
    await db.company.delete({
      where: { id: "cluqlffmw001u5ld8mfx38cji" },
    });
    revalidatePath("/analytics");
    revalidatePath("/companies");
    return { success: "Компания успешно удалена." };
  } catch (e) {
    console.log(e);
    return {
      error: "Не обработанная ошибка.",
    };
  }
};
