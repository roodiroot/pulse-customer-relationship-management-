"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SaveCaseSchema } from "@/schemas";

//Сохраниение дела
export const createCase = async (
  value: z.infer<typeof SaveCaseSchema>,
  dealId: string,
  finished = false
) => {
  if (!dealId) {
    return { error: "Не указан ID компании." };
  }

  const validated = SaveCaseSchema.parse(value);
  if (!validated) {
    return { error: "Не пройдена валидация формы." };
  }
  if (finished) {
    if (validated.comment.length === 0) {
      return { error: "Необходимо заполнить поле комментарий." };
    }
  }
  if (!finished) {
    if (validated.date <= new Date()) {
      return { error: "Дата сохраняемого события должна быть больше текущей." };
    }
  }
  await db.case.create({
    data: {
      ...value,
      finished,
      dealId,
    },
  });
  revalidatePath("/companies/[id]/[dealId]", "page");

  return { success: "Дело успешно добавлено." };
};
