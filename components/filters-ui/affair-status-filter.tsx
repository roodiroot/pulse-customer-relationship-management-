import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AffairStatusFilterProps {
  status: string;
  setStatus: (value: string) => void;
}

const statusList = [
  {
    value: "3",
    name: "Все",
  },
  {
    value: "2",
    name: "Не выполнено",
  },
  {
    value: "1",
    name: "Выполнено",
  },
];

const AffairStatusFilter: React.FC<AffairStatusFilterProps> = ({
  status,
  setStatus,
}) => {
  return (
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Статус" />
      </SelectTrigger>
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
