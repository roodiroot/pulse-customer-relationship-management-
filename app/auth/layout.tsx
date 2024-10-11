import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuhtLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <div className="flex flex-row justify-between py-4 px-4">
        <Link href={"/"}>
          <Icon.logoSite className="h-6 fill-primary" />
        </Link>
        <Button asChild variant="link">
          <Link href={"/auth/login"}>Sign In</Link>
        </Button>
      </div>

      <div className="min-h-[calc(100vh-96px-5.5rem)] w-full flex items-center">
        {children}
      </div>
    </div>
  );
};

export default AuhtLayout;
