"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { StageDeal } from "@prisma/client";
import { useStage } from "@/hooks/use-stage";
import { Badge } from "@/components/ui/badge";

interface StageItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  stage?: StageDeal | null;
}

const StageBadge = React.forwardRef<HTMLInputElement, StageItemProps>(
  ({ stage = "NEW", ...props }, ref) => {
    const name = useStage(stage || StageDeal.NEW)?.name;

    return (
      // <span
      //   ref={ref}
      //   {...props}
      //   className={cn(
      //     "whitespace-nowrap cursor-pointer inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
      //     stage === StageDeal.NEW &&
      //       "bg-sky-400 text-primary-foreground border-sky-400/50",
      //     stage === StageDeal.ACCESS &&
      //       "bg-teal-400 text-primary-foreground border-teal-400/50",
      //     stage === StageDeal.APPOINTMENT &&
      //       "bg-fuchsia-600 text-primary-foreground border-fuchsia-600/50",
      //     stage === StageDeal.DIAGNOSTICS &&
      //       "bg-indigo-600 text-primary-foreground border-indigo-600/50",
      //     stage === StageDeal.INVOICE &&
      //       "bg-green-500 text-primary-foreground border-green-500/50",
      //     stage === StageDeal.PAYMENTAGREEMENT &&
      //       "bg-teal-400 text-primary-foreground border-teal-400/50",
      //     stage === StageDeal.DEFERREDPAYMENT &&
      //       "bg-rose-600 text-primary-foreground border-rose-600/50",
      //     stage === StageDeal.PAYMENT &&
      //       "bg-lime-500 text-primary-foreground border-lime-500/50",
      //     stage === StageDeal.REFUSAL &&
      //       "bg-red-600 text-primary-foreground border-red-600/50",
      //     stage === null && "bg-muted text-muted-foreground border-muted"
      //   )}
      // >
      //   {name}
      // </span>
      <Badge variant="outline" className="whitespace-nowrap">
        {name}
      </Badge>
    );
  }
);
StageBadge.displayName = "StageBadge";

export { StageBadge };
