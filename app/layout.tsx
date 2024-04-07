import { auth } from "@/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { cn } from "@/lib/utils";
import TanstackProvider from "@/providers/tanstack-provider";
import ThemeProvider from "@/providers/theme-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer Relationship Management",
  description: "Matryoshka-studio Customer Relationship Management",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="ru" suppressHydrationWarning>
        <body className={cn("overflow-hidden", inter.className)}>
          <ThemeProvider>
            <TanstackProvider>{children}</TanstackProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;
