"use client";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";

interface ActionElement {
  name?: string;
  onClick: () => void;
}

interface DropdownActionsProps extends React.HTMLAttributes<HTMLSelectElement> {
  actionsList: ActionElement[];
  role?: UserRole;
}

const DropdownActions: React.FC<DropdownActionsProps> = ({
  actionsList,
  children,
  role,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actionsList.map((action, index) => {
          if (
            action.name === "Назначить ответственного" &&
            role !== UserRole.ADMIN
          ) {
            console.log("hello");
            return null;
          }
          return (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {action.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownActions;
