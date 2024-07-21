import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { currentUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import FormError from "@/components/ui/form-error";
import Container from "@/components/utils/container";
import { showUsers } from "@/actions/personal/show-users";
import HeaderForCRM from "@/components/utils/header-for-crm";
import DealList from "@/components/page/company-page/deal-list";
import ContactsList from "@/components/page/company-page/contact-list";
import { showOneCompanyById } from "@/actions/company/show-one-company";
import UpdateFormCompany from "@/components/page/company-create/update-form-company";
import ResetResponsibleButton from "@/components/page/company-page/buttons/reset-responsible";

import { UserRole } from "@prisma/client";
import ColTwoContainer from "@/components/utils/col-two-container";
import ColOneContainer from "@/components/utils/col-one-container";

const ComanyPage = async ({ params }: { params: { id: string } }) => {
  const company = await showOneCompanyById(params.id);
  const user = await currentUser();
  const data = await showUsers({ user });

  if (!company) {
    return (
      <Container>
        <FormError message="You do not have sufficient permissions to view this resource." />
      </Container>
    );
  }

  return (
    <Container>
      <ColTwoContainer>
        <div className="flex items-center gap-4 lg:col-span-3">
          <BackButton />
          <HeaderForCRM text={company?.name} />
          <div className="ml-auto flex flex-col sm:flex-row gap-4 items-center">
            {user?.role === UserRole.ADMIN ? (
              <ResetResponsibleButton
                users={data?.users}
                userId={company?.userId}
                companyId={company?.id}
              />
            ) : (
              <Badge variant="outline">{user?.name}</Badge>
            )}
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href={`/companies/${company?.id}/deal`}>
                Create a deal
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <ContactsList contacts={company?.contacts} companyId={company.id} />
        <DealList dealList={company?.deals} companyId={company?.id} />
      </ColTwoContainer>
      <ColOneContainer>
        <UpdateFormCompany company={company} />
      </ColOneContainer>
    </Container>
  );
};

export default ComanyPage;
