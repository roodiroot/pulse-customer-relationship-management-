"use client";

import { z } from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationRule, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdateCompanySchema, UpdateContactSchema } from "@/schemas";
import { updateCompany } from "@/actions/company/update-company";
import { updateContact } from "@/actions/contact/update-contact";

interface FormChangeFieldContactProps
  extends React.HTMLAttributes<HTMLDivElement> {
  field: string;
  value: string;
  contactId: string;
  pattern?: ValidationRule<RegExp> | undefined;
  close: () => void;
  setChangeValue: (value: string) => void;
  callback?: (value: string) => void;
}

const FormChangeFieldContact: React.FC<FormChangeFieldContactProps> = ({
  field,
  value,
  contactId,
  pattern,
  close,
  setChangeValue,
  callback,
}: any) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateContactSchema>>({
    resolver: zodResolver(UpdateContactSchema),
    defaultValues: {
      [field]: value,
    },
  });

  const handleSubmit = (formData: z.infer<typeof UpdateContactSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updateContact(formData, contactId)
        .then((data) => {
          if (data?.success) {
            value = Object.values(formData)[0];
            setChangeValue(Object.values(formData)[0]);
            if (callback) {
              callback(Object.values(formData)[0]);
            }
          }
        })
        .finally(() => {
          if (close) {
            close();
          }
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-1">
        <FormField
          control={form.control}
          name={field}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="-" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => close()} className="ml-1" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default FormChangeFieldContact;
