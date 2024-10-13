"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navigationSettings } from "@/routes";

const Navigation = () => {
  const path = usePathname();

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
