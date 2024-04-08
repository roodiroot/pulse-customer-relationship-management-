import { stages } from "@/constance/stages";
import { StageDeal } from "@prisma/client";

export const useStage = (stage: StageDeal) => {
  if (!stage || stage === null) return { name: "нет стадии", value: null };
  let selectStage;
  for (let i = 0; i < stages.length; i++) {
    if (stages[i].value === stage) {
      selectStage = stages[i];
    }
  }
  return selectStage;
};
