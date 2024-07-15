"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { ValidationRule } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormChangeField from "@/components/page/company-create/change-field/form-change-field";
import { Separator } from "@/components/ui/separator";

interface ChangeFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
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
}

const ChangeField: React.FC<ChangeFieldProps> = ({
  title,
  field,
  value,
  companyId,
  pattern,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 w-full">
          <div className="text-xs font-light text-muted-foreground">
            {title}
          </div>
          {open ? (
            <FormChangeField
              companyId={companyId}
              field={field}
              value={value}
              pattern={pattern}
              close={() => setOpen(false)}
            />
          ) : (
            <div className="w-full flex justify-between items-center text-sm">
              <p>{value}</p>
            </div>
          )}
        </div>
        {!open && (
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            size="icon"
            className="w-7 h-7 shrink-0 text-muted-foreground"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
    </>
  );
};

export default ChangeField;
