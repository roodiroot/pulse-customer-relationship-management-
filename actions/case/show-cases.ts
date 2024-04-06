"use server";

import { getAllCases } from "@/data/cases/get-cases";

export const showCases = async (params?: any) => {
  const cases = await getAllCases(params);
  return cases;
};
