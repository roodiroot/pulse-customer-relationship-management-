import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TubSelectTrigger from "./tub-select-trigger";

interface AffairStatusFilterProps {
  status?: string;
  setStatus: (value?: string) => void;
}

const statusList = [
  {
    value: "all",
    name: "All Task Statuses",
  },
  {
    value: "2",
    name: "Not Completed",
  },
  {
    value: "1",
    name: "Completed",
  },
];

const AffairStatusFilter: React.FC<AffairStatusFilterProps> = ({
  status,
  setStatus,
}) => {
  return (
    <Select value={status} onValueChange={setStatus}>
      <TubSelectTrigger
        placeholder="Task Status"
        value={status}
        setValue={setStatus}
        nonValue="all"
      />
      <SelectContent>
        {statusList.map(({ value, name }) => (
          <SelectItem key={value} value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AffairStatusFilter;
