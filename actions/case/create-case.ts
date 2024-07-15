"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SaveCaseSchema } from "@/schemas";

import { currentUser } from "@/lib/auth";
import { getDealById } from "@/data/deal/data-deal";
import { ActionType } from "@prisma/client";

//Сохраниение дела
export const createCase = async (
  value: z.infer<typeof SaveCaseSchema>,
  dealId: string,
  finished = false
) => {
  if (!dealId) {
    return { error: "Company ID not specified." };
  }

  const validated = SaveCaseSchema.parse(value);
  if (!validated) {
    return { error: "Form validation failed." };
  }

  const deal = await getDealById(dealId);
  if (!deal) {
    return { error: "No deal exists with this ID." };
  }

  if (finished) {
    if (validated.comment.length === 0) {
      return { error: "The comment field must be filled out." };
    }
  }
  if (!finished) {
    if (validated.date <= new Date()) {
      return {
        error:
          "The date of the saved event must be later than the current date.",
      };
    }
  }

  const user = await currentUser();

  await db.case.create({
    data: {
      ...value,
      type: value.type as ActionType,
      responsible: user?.name,
      finished,
      dealId,
    },
  });
  revalidatePath("/affairs");
  revalidatePath("/companies/[id]/[dealId]", "page");
  return { success: "Task successfully added." };
};
