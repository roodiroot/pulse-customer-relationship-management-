"use client";

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
import TiptapCase from "../../../tiptap/tiptap-case";
import CaseItemHeader from "./case-item-header";
import { CircleCheck } from "lucide-react";
import IconCase from "./icon-case";

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
    <div className="relative pl-6 flex flex-col gap-2">
      <div className="absolute top-0 left-0">
        <IconCase type={type} />
      </div>
      <CaseItemHeader
        type={type}
        responsible={responsible || "not assigned"}
        date={date || new Date()}
        status={true}
      />
      <div className="relative flex gap-1 pb-6">
        <div className="flex-1 flex flex-col">
          <Form {...form}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }: { field: any }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <TiptapCase
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="absolute " />
                </FormItem>
              )}
            />
          </Form>
        </div>
        <Button
          disabled={isPending}
          className="h-auto self-stretch"
          onClick={form.handleSubmit(submit)}
        >
          <div>
            <CircleCheck className="w-5 h-5" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default CaseItemChanging;
