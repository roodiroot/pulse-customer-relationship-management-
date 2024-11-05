"use server";

import { getSettings } from "@/data/settings/get-settings";

export const showSettingsForUser = async (userId?: string) => {
  if (!userId) return;

  const settings = await getSettings(userId);
  return settings;
};
