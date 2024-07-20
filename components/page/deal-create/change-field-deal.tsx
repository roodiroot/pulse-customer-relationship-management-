"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { ValidationRule } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormChangeFieldDeal from "./form-change-field-deal";

interface ChangeFieldDealProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  field: "name" | "contractPrice";
  value: string;
  dealId: string;
  pattern?: ValidationRule<RegExp> | undefined;
}

const ChangeFieldDeal: React.FC<ChangeFieldDealProps> = ({
  title,
  field,
  value,
  dealId,
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
            <FormChangeFieldDeal
              dealId={dealId}
              fieldName={field}
              value={value}
              pattern={pattern}
              close={() => setOpen(false)}
            />
          ) : (
            <div className="w-full flex justify-between items-center text-sm">
              <p>
                {field === "contractPrice"
                  ? Number(value).toLocaleString("en-US") + " $"
                  : value}
              </p>
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

export default ChangeFieldDeal;
