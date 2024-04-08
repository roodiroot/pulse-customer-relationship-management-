"use client";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreateDealSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createDeal } from "@/actions/deal/create-deal";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import { useRouter } from "next/navigation";

interface DealCreateProps extends React.HTMLAttributes<HTMLDivElement> {
  companyId: string;
}

const DealCreate: React.FC<DealCreateProps> = ({ companyId }) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateDealSchema>>({
    resolver: zodResolver(CreateDealSchema),
    defaultValues: {
      name: "Разработка сайта",
    },
  });

  function onSubmit(values: z.infer<typeof CreateDealSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      createDeal(values, companyId).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        router.push(`/companies/${companyId}/deal/${data.deal?.id}`);
        form.reset();
      });
    });
  }

  return (
    <Form {...form}>
      <div className=" space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="">
                <FormLabel>Название сделки</FormLabel>
              </div>
              <FormControl>
                <Input {...field} type="text" placeholder="Разработка сайта" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          <Button disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
            Создать
          </Button>
        </div>
        <FormError message={error || ""} />
        <FormSuccess message={success || ""} />
      </div>
    </Form>
  );
};

export default DealCreate;
