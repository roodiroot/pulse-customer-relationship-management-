import { db } from "@/lib/db";

export const getSettingsByUserId = async (userId: string) => {
  try {
    const settings = await db.settings.findUnique({ where: { userId } });
    return settings;
  } catch (error) {
    return null;
  }
};
