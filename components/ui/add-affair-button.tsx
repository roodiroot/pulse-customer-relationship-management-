"use client";

import Link from "next/link";
import { Pickaxe, PlusCircle } from "lucide-react";

import { Button } from "./button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AddAffairButton = ({
  dealId,
  className,
}: {
  dealId: string;
  className?: string;
}) => {
  const pathname = usePathname();
  return (
    <Button
      asChild
      variant="link"
      className={cn("flex gap-2 py-0 h-auto", className)}
    >
      <Link href={`${pathname}?createCase=${dealId || "true"}`}>
        <Pickaxe className="w-4 h-4" />
        Add Task to Deal
      </Link>
    </Button>
  );
};

export default AddAffairButton;
