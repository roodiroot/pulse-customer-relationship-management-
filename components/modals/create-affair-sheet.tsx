"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CompanyCaseBlock from "@/components/page/company-page/company-case-block";

interface CreateCaseSheetProps {}

const CreateCaseSheet: React.FC<CreateCaseSheetProps> = ({}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams();
  const caseParam = param.get("createCase");

  useEffect(() => {
    if (caseParam) {
      setOpen(true);
    }
  }, [caseParam]);

  const handleClose = async () => {
    const params = new URLSearchParams(param.toString());
    params.delete("createCase");
    router.push(`${pathname}?${params}`);
    setOpen(false);
  };

  return (
    <Sheet onOpenChange={() => handleClose()} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Task to Deal</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <CompanyCaseBlock dealId={caseParam || ""} close={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
    // <Dialog onOpenChange={() => handleClose()} open={open}>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Create a case with the company</DialogTitle>
    //     </DialogHeader>
    //     <CompanyCaseBlock dealId={caseParam || ""} />
    //   </DialogContent>
    // </Dialog>
  );
};

export default CreateCaseSheet;
