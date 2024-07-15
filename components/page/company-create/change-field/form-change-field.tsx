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
import { UpdateCompanySchema } from "@/schemas";
import { updateCompany } from "@/actions/company/update-company";

interface FormChangeFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  field:
    | "name"
    | "TIN"
    | "dateRegistr"
    | "address"
    | "owner"
    | "mainOKVED"
    | "comment";
  value: string;
  companyId: string;
  pattern?: ValidationRule<RegExp> | undefined;
  close: () => void;
}

const FormChangeField: React.FC<FormChangeFieldProps> = ({
  field,
  value,
  companyId,
  pattern,
  close,
}: any) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateCompanySchema>>({
    resolver: zodResolver(UpdateCompanySchema),
    defaultValues: {
      [field]: value,
    },
  });

  const handleSubmit = (formData: z.infer<typeof UpdateCompanySchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updateCompany(formData, companyId)
        .then((response) => {
          if (response?.error) {
            setError(response.error);
          } else {
            setSuccess(response.success);
          }
        })
        .finally(() => {
          close();
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
            pattern: pattern,
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
        <Button>Save</Button>
      </form>
    </Form>
  );
};

export default FormChangeField;
