"use client";

import { usePathname } from "next/navigation";

import { navigationMenu } from "@/routes";
import { useCurrentRole } from "@/hooks/use-current-role";
import LinkNavigation from "@/components/navigation/link-navigation";

const Navigation = () => {
  const role = useCurrentRole();
  const path = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigationMenu.map((item) => {
        if (item.name === "Менеджеры") {
          if (["ADMIN", "SALES_MANAGER"].includes(role || "USER")) {
            return <LinkNavigation key={item.name} item={item} path={path} />;
          }
          return null;
        }
        return <LinkNavigation item={item} key={item.name} path={path} />;
      })}
    </nav>
  );
};

export default Navigation;
