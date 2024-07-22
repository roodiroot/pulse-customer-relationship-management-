import { Cross1Icon } from "@radix-ui/react-icons";
import { SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";

interface TubSelectTriggerProps {
  value: string | undefined;
  setValue: (value?: string) => void;
  nonValue?: string;
  placeholder?: string;
}
const TubSelectTrigger: React.FC<TubSelectTriggerProps> = ({
  value,
  setValue,
  nonValue,
  placeholder,
}) => {
  const booleanValue = value ? value === nonValue : true;
  return (
    <div className="relative">
      <SelectTrigger
        variant="link"
        className={cn(
          "relative",
          !booleanValue && "bg-primary/20 pr-10 rounded-md"
        )}
      >
        <SelectValue placeholder={placeholder} className="relative z-0" />
      </SelectTrigger>
      <div
        onClick={() => setValue(nonValue)}
        className="absolute right-3 top-2 z-10 cursor-pointer group"
      >
        {!booleanValue && (
          <Cross1Icon className="w-5 h-5 ml-3 text-foreground/60 group-hover:text-foreground" />
        )}
      </div>
    </div>
  );
};

export default TubSelectTrigger;
