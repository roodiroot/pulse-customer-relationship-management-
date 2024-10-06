"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const tables = [
  {
    tab: "/calendar/month",
    label: "Month",
  },
  {
    tab: "/calendar/week",
    label: "Week",
  },
];
const CalendarTypeSwitch = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="hidden w-[200px] justify-between sm:inline-flex"
            >
              {tables.find((table: any) => table.tab === pathname)?.label}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            <Button
              variant="ghost"
              aria-expanded={open}
              className="h-8 w-8 p-0 sm:hidden"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="overflow-hidden p-1  [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium ">
            {tables.map((i: any) => (
              <div
                key={i.tab}
                onClick={() => {
                  setOpen(false);
                  router.push(i.tab);
                }}
                className={cn(
                  "hover:bg-muted/40 cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-gray-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-gray-800 ",
                  pathname === i.tab && "bg-muted/40"
                )}
              >
                {i.label}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarTypeSwitch;
