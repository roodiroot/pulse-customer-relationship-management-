"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "./button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AddDealButton = ({
  companyId,
  className,
}: {
  companyId?: string;
  className: string;
}) => {
  const pathname = usePathname();
  return (
    <Button
      asChild
      variant="link"
      className={cn("flex gap-2 p-0 h-auto", className)}
    >
      <Link href={`${pathname}?createDeal=${companyId || "true"}`}>
        <PlusCircle className="w-4 h-4" />
        Add deal
      </Link>
    </Button>
  );
};

export default AddDealButton;
