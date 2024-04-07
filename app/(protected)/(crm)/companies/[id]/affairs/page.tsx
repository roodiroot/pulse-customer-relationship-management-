import Link from "next/link";

import BackButton from "@/components/back-button";
import ContactsList from "@/components/page/company-page/contact-list";
import { showOneCompanyById } from "@/actions/company/show-one-company";
import ContactCreate from "@/components/page/company-page/contact-create";
import CommentCompany from "@/components/page/company-page/comment-company";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyCaseBlock from "@/components/page/company-page/company-case-block";
import { Badge } from "@/components/ui/badge";
import HeaderForCRM from "@/components/utils/header-for-crm";
import Container from "@/components/utils/container";

const AffairsCompanyPage = async ({ params }: { params: { id: string } }) => {
  const company = await showOneCompanyById(params.id);
  return (
    <Container>
      <div className="flex items-center gap-4 lg:col-span-3">
        <BackButton />
        <Link href={`/companies/${params.id}`}>
          <HeaderForCRM text={company?.name} />
        </Link>
        <Badge variant="secondary">Этап сделки</Badge>
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 order-2 lg:order-1">
        <CompanyCaseBlock
          companyId={company?.id}
          companyCase={company?.cases}
        />
      </div>
      <div className=" grid gap-4 order-1 lg:order-2 lg:sticky lg:top-0">
        <CommentCompany companyId={params.id} comment={company?.comment} />
        <ContactsList contacts={company?.contacts} />
        <ContactCreate companyId={company?.id} />
      </div>
    </Container>
  );
};

export default AffairsCompanyPage;
