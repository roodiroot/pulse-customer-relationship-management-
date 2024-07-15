"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ContactCreate from "../page/company-page/contact-create";

interface CreateContactSheetProps {}

const CreateContactSheet: React.FC<CreateContactSheetProps> = ({}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams();
  const contactParam = param.get("createContact");

  useEffect(() => {
    if (contactParam) {
      setOpen(true);
    }
  }, [contactParam]);

  const handleClose = async () => {
    const params = new URLSearchParams(param.toString());
    params.delete("createContact");
    router.push(`${pathname}?${params}`);
    setOpen(false);
  };

  return (
    <Sheet onOpenChange={() => handleClose()} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a contact</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <ContactCreate companyId={contactParam} close={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateContactSheet;
