import Link from "next/link";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface LinkNavigationProps {
  item: {
    name: string;
    href: string;
    Icon: LucideIcon;
  };
  path: string;
}

const LinkNavigation: React.FC<LinkNavigationProps> = ({ item, path }) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        path === item.href && "bg-primary/10 text-primary"
      )}
    >
      <item.Icon className="h-4 w-4" />
      {item.name}
    </Link>
  );
};

export default LinkNavigation;
