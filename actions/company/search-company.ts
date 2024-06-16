"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { SearchSchema } from "@/schemas";

export const search = async (value: z.infer<typeof SearchSchema>) => {
  const string = value?.text.trim();

  if (!string) {
    return [];
  }
  if (string === "" || string.length < 4 || string.length > 50) {
    return [];
  }

  const result = await db.company.findMany({
    where: {
      OR: [
        { name: { contains: string, mode: "insensitive" } },
        { TIN: { contains: string, mode: "insensitive" } },
        {
          contacts: {
            some: { phone: { contains: string, mode: "insensitive" } },
          },
        },
      ],
    },
    include: { contacts: true },
  });
  return result;
};
