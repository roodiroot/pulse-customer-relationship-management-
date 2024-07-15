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
import DealCreate from "../page/deal-create/deal-create";

interface CreateDealSheetProps {}

const CreateDealSheet: React.FC<CreateDealSheetProps> = ({}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams();
  const dealParam = param.get("createDeal");

  useEffect(() => {
    if (dealParam) {
      setOpen(true);
    }
  }, [dealParam]);

  const handleClose = async () => {
    const params = new URLSearchParams(param.toString());
    params.delete("createDeal");
    router.push(`${pathname}?${params}`);
    setOpen(false);
  };

  return (
    <Sheet onOpenChange={() => handleClose()} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a deal</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {/* <ContactCreate companyId={contactParam} close={handleClose} /> */}
          {dealParam && (
            <DealCreate companyId={dealParam} close={handleClose} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateDealSheet;
