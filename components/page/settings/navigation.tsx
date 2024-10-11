"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationSettings = [
  {
    name: "Profile",
    href: "/settings/profile",
  },
  {
    name: "Integrations",
    href: "/settings/integrations",
  },
];

const Navigation = () => {
  const path = usePathname();

  console.log(path);
  return (
    <nav className="grid gap-1 text-sm text-muted-foreground">
      {navigationSettings.map((i) => (
        <Link
          key={i.name}
          href={i.href}
          className={cn(
            "py-1 px-2 rounded-md hover:bg-primary/10",
            path === i.href && "font-semibold text-primary"
          )}
        >
          {i.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
