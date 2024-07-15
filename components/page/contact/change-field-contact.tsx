"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { ValidationRule } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormChangeField from "@/components/page/company-create/change-field/form-change-field";
import FormChangeFieldContact from "./form-change-field-contact";
import { Separator } from "@/components/ui/separator";

interface ChangeFieldContactProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  field: string;
  value: string;
  contactId: string;
  pattern?: ValidationRule<RegExp> | undefined;
  callback?: (value: string) => void;
}

const ChangeFieldContact: React.FC<ChangeFieldContactProps> = ({
  title,
  field,
  value,
  contactId,
  pattern,
  children,
  callback,
}) => {
  const [open, setOpen] = useState(false);
  const [changeValue, setChangeValue] = useState(value);

  return (
    <>
      <div className="relative flex items-start justify-between gap-2">
        <div className="absolute top-0 left-0 text-muted-foreground">
          {children}
        </div>
        <div className="pl-7 w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="text-xs font-light text-muted-foreground">
              {title}
            </div>
            {open ? (
              <FormChangeFieldContact
                contactId={contactId}
                field={field}
                value={value}
                pattern={pattern}
                setChangeValue={setChangeValue}
                close={() => setOpen(false)}
                callback={callback}
              />
            ) : (
              <div className="w-full flex justify-between items-center text-sm">
                <p>{changeValue}</p>
              </div>
            )}
          </div>
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

export default ChangeFieldContact;
