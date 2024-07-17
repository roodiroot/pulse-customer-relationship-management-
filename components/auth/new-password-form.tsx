"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Suspense, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewPasswordSchema } from "@/schemas";

import { useSearchParams } from "next/navigation";

import CardWrapper from "@/components/auth/card-wrapper";
import { newPassword } from "@/actions/auth/new-password";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const NewPasswordForm_1 = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const submit = (value: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(value, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Смена пароля"
      backButtonLabek="Вернуться на страницу логина"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый пароль</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="text-accent  dark:bg-accent-300 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Сменить пароль
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

const NewPasswordForm = () => {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <NewPasswordForm_1 />
    </Suspense>
  );
};

export default NewPasswordForm;
