"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { generateGPT } from "@/data/yandexGPT";
import { MIN_COUNT_CASE_FOR_GENERATE } from "@/constance/constance";
import { getSummariesByDealId } from "@/data/summary/data-summaries";

import { Case } from "@prisma/client";

function convertArrayToString(arr?: Case[]) {
  return arr
    ?.map((item, index) => {
      if (!item?.finished) return;
      // Форматируем дату в нужный формат
      const formattedDate = item?.date?.toString();
      // Убираем HTML теги из комментария
      const cleanComment =
        item?.comment?.replace(/<\/?[^>]+(>|$)/g, "") || "пустой комментарий";
      // Формируем строку для текущего объекта
      const responsible = item?.responsible || "ответственный не определен";
      return `${
        index + 1
      }. ${formattedDate} менеджер по продажам ${responsible}, осуществил "${
        item.type
      }".Комментарий к событию: "${cleanComment}"`;
    })
    .join("\n");
}

export const summaryGenerate = async (dealId: string, arr: Case[]) => {
  const currentDeal = await db.deal.findUnique({ where: { id: dealId } });
  if (!currentDeal) return { error: "Invalid deal ID." };

  const finishedCases = arr?.filter((item) => item.finished)?.length || 0;
  if (!arr || finishedCases < MIN_COUNT_CASE_FOR_GENERATE)
    return { error: "Not enough cases for generating a summary." };

  const input = convertArrayToString(arr);

  try {
    const summaryCount = await getSummariesByDealId(dealId);
    if (summaryCount.count) {
      await db.summary.deleteMany({ where: { dealId } });
    }

    const generateGPTResponse = await generateGPT(input);
    if (
      generateGPTResponse.status !== "ALTERNATIVE_STATUS_FINAL" ||
      !generateGPTResponse.message?.text
    ) {
      return { error: "Failed to generate." };
    }

    await db.summary.create({
      data: {
        comment: generateGPTResponse.message.text,
        dealId: currentDeal.id,
      },
    });
    revalidatePath("/companies/[id]/[dealId]", "page");
    return { success: "Success." };
  } catch (error) {
    return { error: "Failed to generate." };
  }
};
