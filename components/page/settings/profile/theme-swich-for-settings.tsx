"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import CheckboxWrapper from "@/components/page/settings/checkbox-wrapper";

const ThemeSwitchForSettings = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(
    () => setMounted(resolvedTheme === "dark" ? true : false),
    [resolvedTheme]
  );

  const changeTheme = () => {
    setMounted(!mounted);
    setTheme(mounted ? "light" : "dark");
  };

  return (
    <div className="border-b pb-6">
      <CheckboxWrapper
        checked={mounted}
        onCheckedChange={changeTheme}
        title="Enable Dark Mode"
        description="Switch to dark mode for a more comfortable viewing experience in low light."
      />
    </div>
  );
};
export default ThemeSwitchForSettings;
