"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";
import { changeResponsible } from "@/actions/company/change-responsible";

interface ResetResponsibleButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  userId: string | null;
  users?: User[];
  companyId: string;
}

const ResetResponsibleButton: React.FC<ResetResponsibleButtonProps> = ({
  companyId,
  userId,
  users,
}) => {
  const handleResponsibleChange = async (newResponsibleId: string) => {
    if (companyId) {
      await changeResponsible(companyId, newResponsibleId);
    }
  };

  return (
    <Select value={userId || "null"} onValueChange={handleResponsibleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Ответственный" />
      </SelectTrigger>
      <SelectContent>
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

export default ResetResponsibleButton;
