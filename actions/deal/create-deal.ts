"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { CreateDealSchema } from "@/schemas";
import { getCompanyById } from "@/data/company/data-company";

export const createDeal = async (
  value: z.infer<typeof CreateDealSchema>,
  companyId?: string
) => {
  if (!companyId) {
    return {
      error: "Company ID not specified.",
    };
  }
  const validated = CreateDealSchema.parse(value);
  if (!validated) {
    return {
      error: "Invalid data entered.",
    };
  }

  const company = await getCompanyById(companyId);
  if (!company) {
    return {
      error: "There is no technology with ID this way.",
    };
  }

  try {
    const deal = await db.deal.create({
      data: {
        name: validated.name,
        contractPrice: validated.contractPrice,
        companyId: companyId,
      },
    });
    revalidatePath("/analytics");
    revalidatePath("/companies/[id]", "page");
    return {
      success: "The deal has been successfully created.",
      deal,
    };
  } catch {
    return {
      error: "Unexpected error.",
    };
  }
};
