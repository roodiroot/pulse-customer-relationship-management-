"use client";

import { sendPostRequest } from "@/actions/yandexGPT";
import AiGeneratedCase from "@/components/page/blocks/case-item/ai-generated-case";
import CompletedCase from "@/components/page/blocks/case-item/completed-case";
import { Button } from "@/components/ui/button";
import { Case } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";

interface GenerateProps extends React.HTMLAttributes<HTMLDivElement> {
  companyCase?: Case[];
}
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
const Generate: React.FC<GenerateProps> = ({ companyCase }) => {
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();
  //   console.log(convertArrayToString(companyCase));
  const handleGenerate = () => {
    // console.log(companyCase);
    // console.log(convertArrayToString(companyCase));
    startTransition(() => {
      sendPostRequest(convertArrayToString(companyCase)).then(
        ({ message, status }) => {
          if (status === "ALTERNATIVE_STATUS_FINAL") {
            setComment(message.text);
          }
        }
      );
    });
  };
  return (
    <div className="space-y-6">
      <Button
        className="relative"
        disabled={isPending}
        variant="outline"
        onClick={() => handleGenerate()}
      >
        {isPending ? (
          <div>
            Generate Event Summary
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <LoaderCircle className="w-4 h-4 animate-spin" />
            </div>
          </div>
        ) : (
          "Generate Event Summary"
        )}
      </Button>
      {comment && (
        <AiGeneratedCase
          comment={comment}
          date={new Date()}
          type="ai"
          responsible="ai"
        />
      )}
    </div>
  );
};

export default Generate;
