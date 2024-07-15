"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { CalendarIcon, Clock10Icon } from "lucide-react";
import { ActionType, Case, StageDeal } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SaveCaseSchema } from "@/schemas";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import TimePicker from "@/components/ui/time-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSuccess from "@/components/ui/form-success";
import { createCase } from "@/actions/case/create-case";
import StageRow from "@/components/page/company-page/stage-row";
import CompanyCaseList from "@/components/page/company-page/company-case-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TiptapCase from "../../tiptap/tiptap-case";
import { Separator } from "@/components/ui/separator";

interface CompanyCaseBlockProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  dealId: string;
  close?: () => void;
  companyName?: string;
  dealCase?: Case[];
  stage?: StageDeal | null;
}

const CompanyCaseBlock: React.FC<CompanyCaseBlockProps> = ({
  companyName,
  dealId,
  dealCase,
  stage,
  close,
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [time, setTime] = useState("10:00");

  const form = useForm<z.infer<typeof SaveCaseSchema>>({
    resolver: zodResolver(SaveCaseSchema),
    defaultValues: {
      type: ActionType.Call || undefined,
      comment: "",
      date: new Date(),
    },
  });

  const submit = (
    value: z.infer<typeof SaveCaseSchema>,
    completed?: boolean
  ) => {
    let d: Date;
    if (completed) {
      d = new Date();
    } else {
      d = new Date(value.date);
      d.setHours(Number(time.split(":")[0]));
      d.setMinutes(Number(time.split(":")[1]));
    }

    setError("");
    setSuccess("");
    if (!dealId) return;
    startTransition(() => {
      createCase({ ...value, date: d }, dealId, completed)
        .then((res) => {
          if (res.error) {
            return setError(res.error || "");
          }

          setSuccess(res.success || "");
          form.reset();
          if (close) {
            close();
          }
        })
        .catch(() => {
          setError("Unhandled error");
        });
    });
  };

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col">
          <div className="relative col-span-2 flex flex-col gap-2">
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }: { field: any }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <TiptapCase
                        description={field.value}
                        onChange={field.onChange}
                        className="min-h-[200px] border-0 bg-muted/40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger variant="link">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(ActionType).map((name) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={name}
                            value={name}
                          >
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="link"
                            className={cn(
                              "w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 absolute z-[150]"
                        align="start"
                      >
                        <Calendar
                          className=""
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <div className="flex flex-col">
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="link"
                      className={cn("w-full", !time && "text-muted-foreground")}
                    >
                      {time ? time : <span>Время события</span>}
                      <Clock10Icon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <TimePicker setTime={setTime} className="mt-2" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <Separator className="w-full mt-2" />

          <div className="">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={form.handleSubmit((value) => submit(value))}
              className="mt-3 "
            >
              Set event for the future
            </Button>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={form.handleSubmit((value) => submit(value, true))}
              className="mt-3"
            >
              Complete task now
            </Button>
          </div>
          <div className="col-span-2 mt-4 h-11">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </div>
      </Form>
    </>
  );
};

export default CompanyCaseBlock;
