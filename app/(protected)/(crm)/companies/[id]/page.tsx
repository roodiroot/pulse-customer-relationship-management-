import BackButton from "@/components/back-button";
import ContactsList from "@/components/page/company-page/contact-list";
import { showOneCompanyById } from "@/actions/company/show-one-company";
import ContactCreate from "@/components/page/company-page/contact-create";
import CommentCompany from "@/components/page/company-page/comment-company";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyCaseBlock from "@/components/page/company-page/company-case-block";

const ComanyPage = async ({ params }: { params: { id: string } }) => {
  const company = await showOneCompanyById(params.id);
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-x-8 md:gap-y-4 lg:grid-cols-3 xl:grid-cols-3">
      <div className="flex items-center gap-4 lg:col-span-3">
        <BackButton />
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {company?.name}
        </h1>
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 order-2 lg:order-1">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Создать дело</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyCaseBlock
              companyId={company?.id}
              companyCase={company?.cases}
            />
          </CardContent>
        </Card>
      </div>
      <div className=" grid gap-4 order-1 lg:order-2 lg:sticky lg:top-0">
        <CommentCompany comment={company?.comment} />
        <ContactsList contacts={company?.contacts} />
        <ContactCreate companyId={company?.id} />
      </div>
    </div>
  );
};

export default ComanyPage;
