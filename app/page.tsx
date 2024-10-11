import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <div className="flex flex-row justify-between py-4 px-4">
        <Icon.logoSite className="h-6 fill-primary" />
        <Button asChild variant="secondary">
          <Link href={"/auth/login"}>Sign In</Link>
        </Button>
      </div>
      <main className="min-h-screen flex justify-center items-center">
        <Icon.logoSite className="w-24 fill-primary" />
      </main>
    </div>
  );
}
