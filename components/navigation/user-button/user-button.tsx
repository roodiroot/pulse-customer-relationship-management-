"use client";

import Link from "next/link";
import { LucideLogOut, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/auth/logout-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/icons";

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            <Icon.fox className="fill-primary w-6" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-foreground/70" />
            <Link href="/settings/profile">Settings</Link>
          </div>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <ThemeSwitch />
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <LucideLogOut className="w-4 h-4 text-foreground/70" />
            <LogoutButton>Logout</LogoutButton>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
