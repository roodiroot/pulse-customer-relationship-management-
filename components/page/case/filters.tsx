"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ActionType } from "@prisma/client";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [finished, setFinished] = useState("3");
  const [type, setType] = useState<ActionType | undefined | "all">();

  const searchdate = searchParams.get("date");
  const searchfinished = searchParams.get("finished");
  const searchtype = searchParams.get("type");

  const start = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page"); // удаляем параметр page и возвращаем на первую страницу
      params.set(key, value);
      router.push(pathname + "?" + params.toString());
    },
    [searchParams]
  );

  const del = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(pathname + "?" + params.toString());
    },
    [searchParams]
  );

  const addingDate = (e?: Date) => {
    setDate(e);
    if (!e) return del("date");
    return start("date", new Date(e).toJSON());
  };

  const addingStatus = (e: string) => {
    setFinished(e);
    if (e === "3") return del("finished");
    return start("finished", e);
  };
  const addingType = (e: ActionType | "all") => {
    setType(e);
    if (!e || e === "all") return del("type");
    return start("type", e);
  };

  useEffect(() => {
    if (searchdate) {
      setDate(new Date(searchdate));
    }
    if (
      searchfinished === "1" ||
      searchfinished === "2" ||
      searchfinished === "3"
    ) {
      setFinished(searchfinished);
    }
    if (searchtype) {
      setType(searchtype as ActionType);
    }
  }, [searchdate, searchfinished, searchtype]);

  return (
    <div className="pt-3 grid  gap-x-4 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
            onSelect={(e) => addingDate(e)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select value={finished} onValueChange={addingStatus}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">Все</SelectItem>
          <SelectItem value="2">Не выполнено</SelectItem>
          <SelectItem value="1">Выполнено</SelectItem>
        </SelectContent>
      </Select>
      <Select value={type} onValueChange={addingType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Тип" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>Все</SelectItem>
          <SelectItem value={ActionType.Call}>Звонок</SelectItem>
          <SelectItem value={ActionType.Meet}>Встреча</SelectItem>
          <SelectItem value={ActionType.Brief}>Бриффинг</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
