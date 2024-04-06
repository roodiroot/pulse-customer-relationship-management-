"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { UpdateCaseSchema } from "@/schemas";
import { getCaseById } from "@/data/cases/get-cases";

//Выполнение сохраненного дела
export const updateCase = async (
  value: z.infer<typeof UpdateCaseSchema>,
  caseId: string
) => {
  const validated = UpdateCaseSchema.parse(value);
  if (!validated) {
    return { error: "Необходимо заполнить поле комментарий." };
  }
  const work = await getCaseById(caseId);
  if (!work) {
    return { error: "Коментарий с таким ID не найден." };
  }

  try {
    await db.case.update({
      where: { id: caseId },
      data: { comment: validated.comment, date: new Date(), finished: true },
    });
    revalidatePath("/companies/[id]", "page");
    return { success: "Успешно сохранено." };
  } catch {
    return { error: "Ошибка при сохранении." };
  }
};
