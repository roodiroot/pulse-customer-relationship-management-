"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { User, UserRole } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Button } from "../ui/button";
import { changeResponsibleBeIds } from "@/actions/company/change-responsible";

interface SheetPersonResponsibleProps {
  showModalResponsible: boolean;
  setShowModalResponsible: (value: boolean) => void;
  users?: User[] | null;
  elementsId: string[];
  setRowSelection: ({}) => void;
  role?: UserRole;
}

const SheetPersonResponsible: React.FC<SheetPersonResponsibleProps> = ({
  role,
  users,
  elementsId,
  showModalResponsible,
  setRowSelection,
  setShowModalResponsible,
}) => {
  const [responsible, setResponsible] = useState<string | undefined>();
  const submit = async () => {
    if (responsible === undefined) return;
    await changeResponsibleBeIds(elementsId, responsible).then(() => {
      setShowModalResponsible(false);
      setRowSelection({});
    });
  };
  if (role === UserRole.USER) return null;
  return (
    <Sheet
      onOpenChange={() => setShowModalResponsible(!showModalResponsible)}
      open={showModalResponsible}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Изменить ответственного у выбраных компаний?</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <Select value={responsible} onValueChange={setResponsible}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ответственный" />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={submit}>Назначить</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetPersonResponsible;
