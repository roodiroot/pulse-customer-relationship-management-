"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { User, UserRole } from "@prisma/client";
import { changeUserRoleById } from "@/actions/personal/change-user";

interface SheetChangeUserRoleProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  user?: { id: string; name: string };
  users?: User[] | null;
  role?: UserRole;
}

const SheetChangeUserRole: React.FC<SheetChangeUserRoleProps> = ({
  role,
  users,
  user,
  open,
  onOpenChange,
}) => {
  const [roleSelect, setRoleSelect] = useState<string | undefined>();
  const roles = Object.keys(UserRole);

  const submit = async () => {
    if (user?.id && roleSelect)
      await changeUserRoleById({
        userId: user?.id,
        role: roleSelect as UserRole,
      });
    onOpenChange(false);
  };

  if (["USER", "SALES_REP"].includes(role as UserRole)) return null;
  return (
    <Sheet onOpenChange={() => onOpenChange(!open)} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Вы хотите изменить роль у {user?.name}?</SheetTitle>
          <SheetDescription>Выберите новую роль</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <Select value={roleSelect} onValueChange={setRoleSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Роль" />
            </SelectTrigger>
            <SelectContent>
              {roles?.map((role) => {
                if (role === UserRole.ADMIN) return null;
                return (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button onClick={submit}>Назначить</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetChangeUserRole;
