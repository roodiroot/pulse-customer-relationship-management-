"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={24}
        height={24}
        sizes="24x24"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

  if (resolvedTheme === "dark") {
    return (
      <div
        onClick={() => setTheme("light")}
        className="cursor-pointer w-full h-full flex gap-3 items-center justify-between"
      >
        Светло
        <Sun
          className="text-foreground/70 w-4 h-4"
          onClick={() => setTheme("light")}
        />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div
        onClick={() => setTheme("dark")}
        className="cursor-pointer w-full h-full flex gap-3 items-center justify-between"
      >
        Темно
        <Moon className="text-foreground/70 w-4 h-4" />
      </div>
    );
  }
};

export default ThemeSwitch;
