import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Icon.logoSite className="absolute bottom-4 left-4 w-24 fill-foreground" />
      <Button asChild variant="secondary">
        <Link href={"/auth/login"}>Sign In</Link>
      </Button>
    </main>
  );
}
