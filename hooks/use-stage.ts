import { stages } from "@/constance/stages";
import { StageDeal } from "@prisma/client";

export const useStage = (stage: StageDeal) => {
  if (!stage || stage === null) return { name: "нет стадии", value: null };
  const selectedStage = stages.find((s) => s.value === stage);

  return selectedStage || { name: "нет стадии", value: null };
};
