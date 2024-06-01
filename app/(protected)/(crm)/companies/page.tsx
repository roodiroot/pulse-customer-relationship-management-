import HeadBody from "@/components/cast-ui/head-body";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CompanyList from "../../_components/company-list";
import { showCompanies } from "@/actions/company/show-companyes";
import { currentUser } from "@/lib/auth";

const CompanyesPage = async () => {
  const user = await currentUser();
  const companyes = await showCompanies(
    user?.role !== "ADMIN" ? user?.id : undefined
  );
  return (
    <>
      <div className="flex items-center gap-4">
        <HeadBody>Организации</HeadBody>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button asChild size="sm">
            <Link href="/companies/create">Создать</Link>
          </Button>
        </div>
      </div>
      {companyes ? (
        <CompanyList data={companyes} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Еще нет организаций
            </h3>
            <p className="text-sm text-muted-foreground">
              Хотите создать новую организацию?
            </p>
            <Button asChild className="mt-4">
              <Link href={"/companyes/create"}>Добавить организацию</Link>
            </Button>
            CompanyList
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyesPage;
