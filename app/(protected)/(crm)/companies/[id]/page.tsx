import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import Container from "@/components/utils/container";
import HeaderForCRM from "@/components/utils/header-for-crm";
import UpdateForm from "@/components/page/company-create/update-form";
import ContactsList from "@/components/page/company-page/contact-list";
import { showOneCompanyById } from "@/actions/company/show-one-company";
import ContactCreate from "@/components/page/company-page/contact-create";

const ComanyPage = async ({ params }: { params: { id: string } }) => {
  const company = await showOneCompanyById(params.id);
  return (
    <Container>
      <div className="flex items-center gap-4 lg:col-span-3">
        <BackButton />
        <HeaderForCRM text={company?.name} />
        <div className="ml-auto">
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href={`/companies/${company?.id}/affairs`}>
              Дела
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 order-2 lg:order-1">
        <UpdateForm company={company} />
      </div>
      <div className="grid gap-4 order-1 lg:order-2 lg:sticky lg:top-0">
        <ContactsList contacts={company?.contacts} />
        <ContactCreate companyId={company?.id} />
      </div>
    </Container>
  );
};

export default ComanyPage;
