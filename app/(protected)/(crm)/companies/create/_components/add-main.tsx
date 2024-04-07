"use client";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CompanySchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import FormError from "@/components/ui/form-error";
import { Textarea } from "@/components/ui/textarea";
import FormSuccess from "@/components/ui/form-success";
import { cn } from "@/lib/utils";

interface AddMainInfoCompanyProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<z.infer<typeof CompanySchema>, any, undefined>;
  error?: string | null;
  success?: string | null;
}

const AddMainInfoCompany: React.FC<AddMainInfoCompanyProps> = ({
  form,
  success,
  error,
  className,
}) => {
  const regExp = /^\d+$/;
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
          <CardDescription>
            Введите название и описание компании.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid  gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <div className="grid gap-3 sm:col-span-2 xl:col-span-1">
              {/* Название компании */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        pattern={"^d+$"}
                        type="text"
                        className="w-full"
                        placeholder="ООО Ромашка"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* ИНН компании */}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="TIN"
                rules={{
                  required: true,
                  pattern: regExp,
                }}
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>ИНН</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="w-full"
                        placeholder="1234567890"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              {/* Дата регистрации компании */}
              <FormField
                control={form.control}
                name="dateRegistr"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Дата регистрации</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full"
                        placeholder="12.01.2022"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3  sm:col-span-2 xl:col-span-1">
              {/* Юр адрес компании */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Юр адрес</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full"
                        placeholder="603002. Нижегородская обл. г Нижний Новгород. ул Советская. 21/1. помещ. П8 офис 4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3  sm:col-span-2 xl:col-span-1">
              {/* Основной ОКВЕД компании */}
              <FormField
                control={form.control}
                name="mainOKVED"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Основной ОКВЕД</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full"
                        placeholder="46.43.1 Торговля оптовая электрической бытовой техникой"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              {/* Руководитель компании */}
              <FormField
                control={form.control}
                name="owner"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Руководитель</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full"
                        placeholder="Глумов Александр Михайлович"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Комментарий к компании */}
            <div className="grid gap-3 sm:col-span-2 xl:col-span-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }: { field: any }) => (
                  <FormItem>
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
          </div>
        </CardContent>
      </Card>
      <FormError message={error || ""} />
      <FormSuccess message={success || ""} />
    </div>
  );
};

export default AddMainInfoCompany;
