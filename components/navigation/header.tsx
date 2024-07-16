import Link from "next/link";
import { Menu } from "lucide-react";

import SearchPanel from "../../app/(protected)/_components/search";
import Icon from "@/components/icons";
import UserButton from "../../app/(protected)/_components/user-button";
import { navigationMenu } from "@/routes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2">
              <Icon.logo className="w-5 fill-foreground" />
              <span className="">CRM</span>
            </Link>
            {navigationMenu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <item.Icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto"></div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <SearchPanel />
      </div>
      <UserButton />
    </header>
  );
};

export default Header;
