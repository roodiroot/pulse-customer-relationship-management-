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
  companyId?: string | null;
  close?: () => void;
}

const ContactCreate: React.FC<ContactCreateProps> = ({ companyId, close }) => {
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
    if (!companyId) {
      return setError("Company id not specified");
    }
    setError("");
    setSuccess("");
    startTransition(() => {
      createContact(values, companyId).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (close) {
          close();
        }
        form.reset();
      });
    });
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-baseline">
              <FormLabel>Contact Name</FormLabel>
            </div>
            <FormControl>
              <Input {...field} type="text" placeholder="Marcus Krajcik Sr." />
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
            <FormLabel>Phone</FormLabel>
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
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="text" placeholder="example@mail.com" />
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
            <FormLabel>Сomment</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Just a few words..."
                className="min-h-[4rem]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-2">
        <Button onClick={form.handleSubmit(onSubmit)}>Create</Button>
        {close && (
          <Button variant="outline" onClick={() => close()}>
            Сancel
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ContactCreate;
