import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Cross1Icon } from "@radix-ui/react-icons";
import TubSelectTrigger from "./tub-select-trigger";

interface ResponsibleFilterProps {
  responsible: string | undefined;
  setResponsible: (value?: string) => void;
  users?: User[] | null;
  permission?: boolean;
}

const ResponsibleFilter: React.FC<ResponsibleFilterProps> = ({
  users,
  responsible,
  setResponsible,
  permission = false,
}) => {
  if (permission)
    return (
      <Select value={responsible} onValueChange={setResponsible}>
        <TubSelectTrigger
          placeholder="Select an Assignee"
          value={responsible}
          setValue={setResponsible}
          nonValue="all"
        />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Assignees</SelectLabel>
            <SelectItem value={"all"}>Select All Assignees</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
            <SelectItem value={"null"}>Unassigned</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
};

export default ResponsibleFilter;
