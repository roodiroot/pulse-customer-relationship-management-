import Link from "next/link";

import { navigationMenu } from "@/routes";

const Navigation = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigationMenu.map((item, index) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <item.Icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
