import { db } from "@/lib/db";
import { Settings } from "@prisma/client";
import { Session } from "next-auth";

export const getSettings = async (userId: string): Promise<Settings[]> => {
  try {
    const settings = await db.settings.findMany({ where: { userId: userId } });
    return settings;
  } catch {
    throw new Error("Failed to fetch settings");
  }
};
