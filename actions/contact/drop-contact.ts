"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dropContact = async (contactId: string) => {
  if (!contactId) {
    return {
      error: "Не указан ID контакта.",
    };
  }

  try {
    await db.contact.delete({
      where: {
        id: contactId,
      },
    });
    revalidatePath("/companies/[id]", "page");
    return { success: "Контакт успешно удален." };
  } catch {
    return {
      error: "Не обработанная ошибка.",
    };
  }
};
