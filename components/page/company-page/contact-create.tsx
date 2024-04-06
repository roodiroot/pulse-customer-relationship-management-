"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputPhoneMask from "@/components/mask/input-phone-mask";
import { useForm } from "react-hook-form";
import { ContactSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createContact } from "@/actions/contact/create-contact";

interface ContactCreateProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  companyId?: string;
}

const ContactCreate: React.FC<ContactCreateProps> = ({ companyId }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      phone: "",
      name: "",
      mail: "",
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof ContactSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      createContact(values, companyId).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
    });
  }

  return (
    <div className="grid w-full items-start gap-6">
      <Form {...form}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Новый контакт
          </legend>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-baseline">
                  <FormLabel>Имя</FormLabel>
                </div>
                <FormControl>
                  <Input {...field} type="text" placeholder="Иванов Иван дир" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <InputPhoneMask
                    setValue={field.onChange}
                    value={field.value}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="example@mail.com"
                  />
                </FormControl>
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
                    {...field}
                    placeholder="Буквально пару слов..."
                    className="min-h-[4rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="">
          <Button onClick={form.handleSubmit(onSubmit)}>Добавить</Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactCreate;
