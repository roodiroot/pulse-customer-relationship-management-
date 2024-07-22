import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ExactDateFilterProps {
  setDate: (date: Date | undefined) => void;
  date?: Date;
  placeholder?: string;
}

const ExactDateFilter: React.FC<ExactDateFilterProps> = ({
  date,
  setDate,
  placeholder = "Select Date",
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className={cn(
            "justify-start text-left font-normal text-primary px-3",
            !!date && "bg-primary/20"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          {!!date && (
            <div onClick={() => setDate(undefined)} className="group">
              <Cross1Icon className="w-5 h-5 ml-3 text-foreground/60 group-hover:text-foreground" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => setDate(e)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default ExactDateFilter;
