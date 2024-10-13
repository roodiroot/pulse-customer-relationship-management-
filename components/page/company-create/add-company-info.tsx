import { z } from "zod";
import { CompanySchema } from "@/schemas";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import InputWrapper from "@/components/page/company-create/input-wrapper";
import TextAreaWrapper from "@/components/page/company-create/textarea-wrapper";

interface AddCompanyInfoProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<z.infer<typeof CompanySchema>, any, undefined>;
  error?: string | null;
  success?: string | null;
}
const AddCompanyInfo: React.FC<AddCompanyInfoProps> = ({
  form,
  success,
  error,
  className,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWrapper
                require
                {...field}
                title="Company Name"
                description='Enter the full official name of the company. For example: LLC "Romashka", Sole Proprietor Ivanov I.I., JSC "Lily".'
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="TIN"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWrapper
                require
                {...field}
                title="Company Tax ID (INN)"
                description="Enter the company's Taxpayer Identification Number (INN). For example: 1327013793."
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dateRegistr"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWrapper
                {...field}
                title="Registration Date"
                description="Enter the official company registration date. For example: 2020-03-15."
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWrapper
                {...field}
                title="Legal Address"
                description="Enter the full legal address of the company. For example: Russia, Moscow, Lenin St., 1."
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="mainOKVED"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWrapper
                {...field}
                title="Main OKVED (Industry Code)"
                description="Enter the main OKVED code (All-Russian Classification of Economic Activities). For example: 62.01 — Software development."
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="owner"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWrapper
                {...field}
                title="Director"
                description="Enter the full name of the company’s director. For example: Ivanov Ivan Ivanovich."
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <TextAreaWrapper
                {...field}
                title="Comment"
                description="Add any additional information about the company."
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormError message={error || ""} />
      <FormSuccess message={success || ""} />
    </div>
  );
};

export default AddCompanyInfo;
