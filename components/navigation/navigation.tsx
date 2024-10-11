import Link from "next/link";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import pack from "@/package.json";
import Icon from "@/components/icons";
import NavigationList from "@/components/navigation/navigation-list";

const Navigation = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/calendar/month" className="flex items-center gap-2">
            <Icon.logo className="h-5  fill-primary" />
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <NavigationList />
        </div>
        <div className="mt-auto p-4">v {pack.version}</div>
      </div>
    </div>
  );
};

export default Navigation;
