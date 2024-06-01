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
import { ActionType, User } from "@prisma/client";

interface FiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  users?: User[] | null;
}

const FilterDeals: React.FC<FiltersProps> = ({ users }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<Date | undefined>();
  const [responsible, setResponsible] = useState<string | undefined>();

  const searchdate = searchParams.get("date");
  const searchresrponsible = searchParams.get("responsible");

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

  const addingResponsible = (e: string) => {
    setResponsible(e);
    if (e === "all") return del("responsible");
    return start("responsible", e);
  };

  useEffect(() => {
    if (searchdate) {
      setDate(new Date(searchdate));
    }
    if (searchresrponsible) {
      setResponsible(searchresrponsible);
    }
  }, [searchdate, searchresrponsible]);

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
            {date ? format(date, "PPP") : <span>Выберите дату</span>}
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
      <Select value={responsible} onValueChange={addingResponsible}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ответственный" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
          <SelectItem value={"null"}>Не назначен</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDeals;
