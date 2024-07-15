"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { stages } from "@/constance/stages";
import { StageDeal } from "@prisma/client";
import { StageItem } from "./stage-item";
import { useCallback, useState, useTransition } from "react";
import { appointStageForDeal } from "@/actions/deal/appoint-stage-for-deal";

interface StageRowProps extends React.HTMLAttributes<HTMLDivElement> {
  dealId: string;
  stage?: StageDeal | null;
}

const StageRow: React.FC<StageRowProps> = ({ dealId, stage }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const submit = useCallback(
    (value: StageDeal) => {
      setError("");
      setSuccess("");
      startTransition(() => {
        appointStageForDeal(dealId, value).then((res) => {
          console.log(res);
        });
      });
    },
    [dealId]
  );
  return (
    <div className="py-2 flex flex-row flex-wrap gap-1">
      {stages.map((item) => (
        <AlertDialog key={item.value}>
          <AlertDialogTrigger asChild>
            <StageItem item={item} stage={stage} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
              <AlertDialogDescription>
                Уверены что хотите поменять стадию сделка на{" "}
                <StageItem item={item} stage={stage} />.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction onClick={() => submit(item.value)}>
                Изменить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </div>
  );
};

export default StageRow;
