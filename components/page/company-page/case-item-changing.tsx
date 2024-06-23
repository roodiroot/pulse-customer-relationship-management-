import { updateCase } from "@/actions/case/update-case";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { changeDate } from "@/lib/change-date";
import { actionType } from "@/lib/changing-types-action";
import { UpdateCaseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionType } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TiptapCase from "../../tiptap/tiptap-case";

interface CaseItemChangingProps extends React.HTMLAttributes<HTMLDivElement> {
  caseId: string;
  comment: string | null;
  date: Date | null;
  type: ActionType;
  responsible?: string | null;
}

const CaseItemChanging: React.FC<CaseItemChangingProps> = ({
  caseId,
  comment,
  date,
  type,
  responsible = "",
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateCaseSchema>>({
    resolver: zodResolver(UpdateCaseSchema),
    defaultValues: {
      comment: comment || "",
    },
  });

  const submit = (value: z.infer<typeof UpdateCaseSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updateCase(value, caseId);
    });
  };

  return (
    <Card className="pt-3 rounded-md">
      <CardContent className="text-sm">
        <Form {...form}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2">
                <FormLabel className="w-full flex items-center justify-between">
                  <span>
                    {changeDate(date).date} {changeDate(date).time}{" "}
                    {changeDate(date).dayWeek}
                  </span>{" "}
                  {date && date < new Date() ? (
                    <Badge variant="destructive">Событие просрочено</Badge>
                  ) : (
                    <Badge>Ожидает выполнения</Badge>
                  )}
                </FormLabel>
                <FormControl>
                  <TiptapCase
                    description={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button
          disabled={isPending}
          variant="default"
          size="sm"
          className="mt-2"
          onClick={form.handleSubmit(submit)}
        >
          Сделать
        </Button>
      </CardContent>
      <CardFooter className="bg-muted/50 py-3 border-t">
        <div className="text-xs text-muted-foreground w-full flex justify-between">
          <div className="flex items-center gap-2">
            <span>Не выполнено</span> <div className="">{responsible}</div>
          </div>
          <Badge variant="secondary">{actionType(type)}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CaseItemChanging;
