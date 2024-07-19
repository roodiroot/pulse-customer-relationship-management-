"use server";

import { MIN_COUNT_CASE_FOR_GENERATE } from "@/constance/constance";
import { getSummariesByDealId } from "@/data/summary/data-summaries";
import { generateGPT } from "@/data/yandexGPT";
import { db } from "@/lib/db";

import { Case } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
  const currendDeal = await db.deal.findUnique({ where: { id: dealId } });
  if (!currendDeal) return { error: "Не верный id сделки." };

  const finishCases = arr?.filter((item) => item.finished)?.length || 0;
  if (!arr || finishCases < MIN_COUNT_CASE_FOR_GENERATE)
    return { error: "Не достаточно кейсов для генерации резюме." };

  const input = convertArrayToString(arr);

  try {
    const { count } = await getSummariesByDealId(dealId);
    if (count) {
      await db.summary.deleteMany({ where: { dealId } });
    }
    const { message, status } = await generateGPT(input);
    if (status !== "ALTERNATIVE_STATUS_FINAL" || !message?.text)
      return { error: "Генерация неудалась." };
    await db.summary.create({
      data: {
        comment: message.text,
        dealId: currendDeal.id,
      },
    });
    revalidatePath("/companies/[id]/[dealId]", "page");
    return { success: "Success." };
  } catch (error) {
    return { error: "Генерация неудалась." };
  }
};
