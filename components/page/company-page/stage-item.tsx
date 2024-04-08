import * as React from "react";

import { cn } from "@/lib/utils";
import { StageDeal } from "@prisma/client";

interface StageItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  item: {
    value: StageDeal;
    name: string;
  };
  stage?: StageDeal | null;
}

const StageItem = React.forwardRef<HTMLInputElement, StageItemProps>(
  ({ stage, item, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className={cn(
          "flex-1 whitespace-nowrap cursor-pointer inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          stage === item.value &&
            stage === StageDeal.NEW &&
            "bg-sky-400 text-primary-foreground border-sky-400/50",
          stage === item.value &&
            stage === StageDeal.ACCESS &&
            "bg-teal-400 text-primary-foreground border-teal-400/50",
          stage === item.value &&
            stage === StageDeal.APPOINTMENT &&
            "bg-fuchsia-600 text-primary-foreground border-fuchsia-600/50",
          stage === item.value &&
            stage === StageDeal.DIAGNOSTICS &&
            "bg-indigo-600 text-primary-foreground border-indigo-600/50",
          stage === item.value &&
            stage === StageDeal.INVOICE &&
            "bg-green-500 text-primary-foreground border-green-500/50",
          stage === item.value &&
            stage === StageDeal.PAYMENTAGREEMENT &&
            "bg-teal-400 text-primary-foreground border-teal-400/50",
          stage === item.value &&
            stage === StageDeal.DEFERREDPAYMENT &&
            "bg-rose-600 text-primary-foreground border-rose-600/50",
          stage === item.value &&
            stage === StageDeal.PAYMENT &&
            "bg-lime-500 text-primary-foreground border-lime-500/50",
          stage === item.value &&
            stage === StageDeal.REFUSAL &&
            "bg-red-600 text-primary-foreground border-red-600/50"
        )}
      >
        {item.name}
      </span>
    );
  }
);
StageItem.displayName = "StageItem";

export { StageItem };
