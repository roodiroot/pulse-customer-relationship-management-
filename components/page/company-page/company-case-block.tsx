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

interface CompanyCaseBlockProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  companyName?: string;
  dealId?: string;
  dealCase?: Case[];
  stage?: StageDeal | null;
}

const CompanyCaseBlock: React.FC<CompanyCaseBlockProps> = ({
  companyName,
  dealId,
  dealCase,
  stage,
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
        })
        .catch(() => {
          setError("Не обработанная ошибка");
        });
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>{companyName}</CardTitle>
          <StageRow stage={stage} dealId={dealId || ""} />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="grid grid-cols-2 gap-x-4 pb-6 ">
              <div className="col-span-2 grid  items-start gap-x-4 lg:grid-cols-3">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Тип</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выбирите тип события" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ActionType.Call}>
                            Звонок
                          </SelectItem>
                          <SelectItem value={ActionType.Brief}>Бриф</SelectItem>
                          <SelectItem value={ActionType.Meet}>
                            Встреча
                          </SelectItem>
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
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm leading-6">Дата</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
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
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
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
                  <Label className="text-sm leading-6">Время</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full mt-2",
                          !time && "text-muted-foreground"
                        )}
                      >
                        {time ? time : <span>Время события</span>}
                        <Clock10Icon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <TimePicker setTime={setTime} className="mt-2" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mt-4 col-span-2">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }: { field: any }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Комментарий</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Это прекрасная организация, которая стремиться сотрудничать со мной во всех моих начинаниях. И платит мне много денег за это. Что поможет нам вместе стать самыми востребованными организациями."
                          className="min-h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-x-3">
                <Button
                  variant="outline"
                  disabled={isPending}
                  onClick={form.handleSubmit((value) => submit(value))}
                  className="mt-3"
                >
                  Сохранить
                </Button>
                <Button
                  disabled={isPending}
                  onClick={form.handleSubmit((value) => submit(value, true))}
                  className="mt-3"
                >
                  Выполнить
                </Button>
              </div>
              <div className="col-span-2 mt-4 h-11">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
            </div>
          </Form>
          <CompanyCaseList companyCase={dealCase} />
        </CardContent>
      </Card>
    </>
  );
};

export default CompanyCaseBlock;
