import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionType } from "@prisma/client";
import TubSelectTrigger from "./tub-select-trigger";

interface TypeStatusFilterProps {
  type?: string;
  setType: (value?: string) => void;
}

const TypeStatusFilter: React.FC<TypeStatusFilterProps> = ({
  type,
  setType,
}) => (
  <Select value={type} onValueChange={setType}>
    <TubSelectTrigger
      placeholder="Select Task Type "
      value={type}
      setValue={setType}
      nonValue="all"
    />
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Task Types</SelectLabel>
        <SelectItem value="all">All Task Types</SelectItem>
        {Object.keys(ActionType).map((name) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default TypeStatusFilter;
