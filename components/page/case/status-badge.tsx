"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const StatusBadge = ({
  status,
  date,
}: {
  status: boolean;
  date: Date | null;
}) => {
  // if (!date) {
  //   return <Badge className="text-xs text-foreground">Без даты</Badge>;
  // }

  // let bg = "";

  // if (status) {
  //   bg = "bg-green-500/30";
  // } else if (!status && new Date() > date) {
  //   bg = "bg-red-500/30";
  // } else {
  //   bg = "bg-sky-500/30";
  // }

  return (
    <Badge className={cn("text-xs text-foreground whitespace-nowrap")}>
      {status ? "Completed" : "Not Completed"}
    </Badge>
  );
};

export default StatusBadge;
