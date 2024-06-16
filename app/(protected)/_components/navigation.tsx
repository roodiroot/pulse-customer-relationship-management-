import Link from "next/link";

import { navigationMenu } from "@/routes";
import { currentRole } from "@/lib/auth";
import { cn } from "@/lib/utils";

const Navigation = async () => {
  const role = await currentRole();
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigationMenu.map((item) => {
        if (item.name === "Менеджеры") {
          if (["ADMIN", "SALES_MANAGER"].includes(role || "USER")) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <item.Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          }
          return null;
        }
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              (item.name === "Показатели" || item.name === "Аналитика") &&
                "cursor-default text-muted-foreground/20 hover:text-muted-foreground/20"
            )}
          >
            <item.Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
