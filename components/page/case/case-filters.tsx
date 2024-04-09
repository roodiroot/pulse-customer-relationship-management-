"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionType } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CaseFilters = ({
  setType,
  type,
  setFinished,
  finished,
  setDate,
  date,
}: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const start = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("fruit", "apple");
    router.push(pathname + "?" + params.toString());
  };
  const del = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("fruit");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="pt-3 grid  gap-x-4 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Button onClick={start}>ADD</Button>
      <Button onClick={del}>DEL</Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select
        onValueChange={(value) => setFinished(value === "1" ? true : false)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">Не выполнено</SelectItem>
          <SelectItem value="1">Выполнено</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Тип" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ActionType.Call}>Звонок</SelectItem>
          <SelectItem value={ActionType.Meet}>Встреча</SelectItem>
          <SelectItem value={ActionType.Brief}>Бриффинг</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={() => {
          setType(undefined), setFinished(undefined), setDate(undefined);
        }}
      >
        Сбросить
      </Button>
    </div>
  );
};

export default CaseFilters;
