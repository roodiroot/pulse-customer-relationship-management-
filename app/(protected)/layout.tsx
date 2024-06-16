import Link from "next/link";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import Navigation from "./_components/navigation";
import Header from "./_components/header";
import Icon from "@/components/icons";
import pack from "@/package.json";
import SheetWrapper from "@/components/modals/sheet-wrapper";
import SheetPersonResponsible from "@/components/modals/sheet-person-responsible";

export default function CRMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Icon.logo className="w-5 fill-foreground" />
                <span className="">CRM</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <Navigation />
            </div>
            <div className="mt-auto p-4">v {pack.version}</div>
          </div>
        </div>
        <div className="flex flex-col ">
          <Header />
          <main className="flex max-h-[calc(100vh-60px)] overflow-y-auto flex-1 flex-col gap-4 p-2 sm:p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
