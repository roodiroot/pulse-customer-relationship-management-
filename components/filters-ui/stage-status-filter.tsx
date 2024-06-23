import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StageDeal } from "@prisma/client";

interface StageStatusFilterProps {
  stage?: StageDeal | "all" | "NOT_DIS";
  setStage: (e: StageDeal | "all" | "NOT_DIS") => void;
}

const StageStatusFilter: React.FC<StageStatusFilterProps> = ({
  stage,
  setStage,
}) => {
  return (
    <Select value={stage} onValueChange={setStage}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Тип сделки" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>Все</SelectItem>
        {Object.keys(StageDeal).map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
        <SelectItem value={"NOT_DIS"}>NOT_DIS</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StageStatusFilter;
