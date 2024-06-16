import { Button } from "@/components/ui/button";
import Link from "next/link";

const DefaultZeroData = () => {
  return (
    <div className="flex flex-1 h-full items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Еще нет организаций
        </h3>
        <p className="text-sm text-muted-foreground">
          Хотите создать новую организацию?
        </p>
        <Button asChild className="mt-4">
          <Link href={"/companies/create"}>Добавить организацию</Link>
        </Button>
      </div>
    </div>
  );
};

export default DefaultZeroData;
