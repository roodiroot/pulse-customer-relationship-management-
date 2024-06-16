import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";

interface ResponsibleFilterProps {
  responsible: string | undefined;
  setResponsible: (value: string) => void;
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
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ответственный" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
          <SelectItem value={"null"}>Не назначен</SelectItem>
        </SelectContent>
      </Select>
    );
};

export default ResponsibleFilter;
