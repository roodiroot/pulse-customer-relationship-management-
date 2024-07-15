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

const TypeStatusFilter: React.FC<TypeStatusFilterProps> = ({
  type,
  setType,
}) => (
  <Select value={type} onValueChange={setType}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Тип дела" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">Show all</SelectItem>
      {Object.keys(ActionType).map((name) => (
        <SelectItem key={name} value={name}>
          {name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default TypeStatusFilter;
