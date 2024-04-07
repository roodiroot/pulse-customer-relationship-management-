"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UpdateCompanySchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "@/components/ui/form-error";
import { Textarea } from "@/components/ui/textarea";
import FormSuccess from "@/components/ui/form-success";
import { Company, Contact } from "@prisma/client";
import { updateCompany } from "@/actions/company/update-company";
import { Button } from "@/components/ui/button";

interface CompanyList extends Company {
  contacts: Contact[];
}

interface UpdateFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  company: CompanyList | null;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ company }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateCompanySchema>>({
    resolver: zodResolver(UpdateCompanySchema),
    defaultValues: {
      name: company?.name || "",
      TIN: company?.TIN || "",
      dateRegistr: company?.dateRegistr || "",
      address: company?.address || "",
      owner: company?.owner || "",
      mainOKVED: company?.mainOKVED || "",
      comment: company?.comment || "",
    },
  });

  if (company === null) {
    return <div>Loading...</div>;
  }

  const onSubmit = (value: z.infer<typeof UpdateCompanySchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updateCompany(value, company.id).then((data) => {
        if (data?.error) {
          return setError(data?.error || "");
        }
        setSuccess(data?.success || "");
      });
    });
  };

  const regExp = /^\d+$/;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название компании</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Это название компании, оно будет отражаться везде где
                  упомнинается компания. Лучше не вводить ее полностью.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-8 sm:flex-row">
            <FormField
              control={form.control}
              name="TIN"
              rules={{
                required: true,
                pattern: regExp,
              }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>ИНН</FormLabel>
                  <FormControl>
                    <Input placeholder="-" {...field} />
                  </FormControl>
                  <FormDescription>
                    По этому полю так же можно осуществлять поиск.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRegistr"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Дата регистрации</FormLabel>
                  <FormControl>
                    <Input placeholder="-" {...field} />
                  </FormControl>
                  <FormDescription>
                    Вводимая дата должна быть формата 01.12.2020.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Юр адрес</FormLabel>
                <FormControl>
                  <Input placeholder="-" {...field} />
                </FormControl>
                <FormDescription>
                  Юр адрес компании, который был указан при регестрации.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainOKVED"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Основной оквед</FormLabel>
                <FormControl>
                  <Input placeholder="-" {...field} />
                </FormControl>
                <FormDescription>
                  По окведу возможно примерно определить направление
                  деятельности компании.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Руководитель компании</FormLabel>
                <FormControl>
                  <Input placeholder="-" {...field} />
                </FormControl>
                <FormDescription>
                  ФИО руководителя и его должность в компании.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарий</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="-"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Этот комментарий фиден на странице дел. По этому стоит
                  подрезюмировать общий взгляд о компании.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error || ""} />
          <FormSuccess message={success || ""} />
          <Button
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
          >
            Обновить информацию
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateForm;
