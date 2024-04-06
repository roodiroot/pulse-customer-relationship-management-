"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NextThemeProvider enableSystem defaultTheme="system" attribute="class">
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
