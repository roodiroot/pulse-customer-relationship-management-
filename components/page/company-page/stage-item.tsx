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
          "flex-1 whitespace-nowrap inline-flex cursor-pointer items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          stage === item.value && "bg-muted cursor-auto "
        )}
      >
        {item.name}
      </span>
    );
  }
);
StageItem.displayName = "StageItem";

export { StageItem };
