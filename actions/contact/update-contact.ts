"use server";

import { db } from "@/lib/db";
import { UpdateContactSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateContact = async (
  value: z.infer<typeof UpdateContactSchema>,
  contactId: string
) => {
  const validatedFiled = UpdateContactSchema.safeParse(value);
  if (!validatedFiled) {
    return { error: "Некорректные данные" };
  }

  console.log(value);

  try {
    await db.contact.update({
      where: { id: contactId },
      data: {
        name: value.name,
        mail: value.mail,
        comment: value.comment,
        phone: value.phone,
      },
    });
    revalidatePath("/companies/[id]", "page");
    revalidatePath("/companies/[id]/deal/[dealId]", "page");
    return {
      success: "Успешно изменено.",
    };
  } catch {
    return {
      error: "Ошибка записи.",
    };
  }
};
