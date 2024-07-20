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
import { UpdateCompanySchema, UpdateDealSchema } from "@/schemas";
import { updateCompany } from "@/actions/company/update-company";
import NumberInput from "@/components/ui/input-number";
import { updateDeal } from "@/actions/deal/update-deal";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";

interface FormChangeFieldDealProps
  extends React.HTMLAttributes<HTMLDivElement> {
  fieldName: "name" | "contractPrice";
  value: string;
  dealId: string;
  pattern?: ValidationRule<RegExp> | undefined;
  close: () => void;
}

const FormChangeFieldDeal: React.FC<FormChangeFieldDealProps> = ({
  fieldName,
  value,
  dealId,
  pattern,
  close,
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateDealSchema>>({
    resolver: zodResolver(UpdateDealSchema),
    defaultValues: {
      [fieldName]: value,
    },
  });

  const handleSubmit = (formData: z.infer<typeof UpdateDealSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updateDeal(formData, dealId)
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-1">
          <FormField
            control={form.control}
            name={fieldName}
            rules={{
              required: true,
              pattern: pattern,
            }}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  {fieldName === "contractPrice" ? (
                    <NumberInput
                      gvalue={Number(field.value)}
                      onChange={field.onChange}
                      placeholder="Planned contract price"
                    />
                  ) : (
                    <Input placeholder="-" {...field} />
                  )}
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
      {/* <FormError message={error} />
      <FormSuccess message={success} /> */}
    </>
  );
};

export default FormChangeFieldDeal;
