"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ForgotPasswordSchema } from "@/schemas";

import CardWrapper from "@/components/auth/card-wrapper";
import { reset } from "@/actions/auth/reset";
import { Input } from "../ui/input";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { Button } from "../ui/button";

const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const submit = (value: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");
    console.log(value);
    startTransition(() => {
      reset(value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Восстановление пароля"
      backButtonLabek="Вернуться на страницу логина"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
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
              Восстановить
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
