import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionType } from "@prisma/client";

interface TypeStatusFilterProps {
  type?: string;
  setType: (value: ActionType | "all") => void;
}

const typesList = [
  {
    value: "all",
    name: "Все",
  },
  {
    value: ActionType.Call,
    name: "Звонок",
  },
  {
    value: ActionType.Meet,
    name: "Встреча",
  },
  {
    value: ActionType.Brief,
    name: "Бриф",
  },
];

const TypeStatusFilter: React.FC<TypeStatusFilterProps> = ({
  type,
  setType,
}) => {
  return (
    <Select value={type} onValueChange={setType}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Тип" />
      </SelectTrigger>
      <SelectContent>
        {typesList.map(({ value, name }) => (
          <SelectItem key={value} value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TypeStatusFilter;
