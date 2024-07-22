import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { StageDeal } from "@prisma/client";
import TubSelectTrigger from "@/components/filters-ui/tub-select-trigger";
import { StageBadge } from "../page/company-page/stage-badge";

interface StageStatusFilterProps {
  stage?: StageDeal | "all" | "NOT_DIS";
  setStage: (e?: string) => void;
}

const StageStatusFilter: React.FC<StageStatusFilterProps> = ({
  stage,
  setStage,
}) => {
  return (
    <Select value={stage} onValueChange={setStage}>
      <TubSelectTrigger
        placeholder="Select Deal Stage"
        value={stage}
        setValue={setStage}
        nonValue="all"
      />
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Deal Stages</SelectLabel>
          <SelectItem value={"all"}>All Stages</SelectItem>
          {Object.keys(StageDeal).map((value) => (
            <SelectItem key={value} value={value}>
              <StageBadge nobadge stage={value as StageDeal} />
            </SelectItem>
          ))}
          <SelectItem value={"NOT_DIS"}>NOT_DIS</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StageStatusFilter;
