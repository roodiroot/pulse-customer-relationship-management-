"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCompany = async (companyId: string) => {
  if (!companyId) return { error: "Не указан ID компании." };

  console.log(companyId);
  try {
    console.log("Start drop");
    const as = await db.company.delete({
      where: { id: "cluqlffmw001u5ld8mfx38cji" },
    });
    console.log("F drop");
    revalidatePath("/companies");
    return { success: "Компания успешно удалена." };
  } catch (e) {
    console.log(e);
    return {
      error: "Не обработанная ошибка.",
    };
  }
};
