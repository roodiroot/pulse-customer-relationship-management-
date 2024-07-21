import { StageDeal } from "@prisma/client";

import BackButton from "@/components/back-button";
import Container from "@/components/utils/container";
import HeaderForCRM from "@/components/utils/header-for-crm";
import { showOneDealById } from "@/actions/deal/show-one-deal";
import ContactsList from "@/components/page/company-page/contact-list";
import { StageBadge } from "@/components/page/company-page/stage-badge";
import { showOneCompanyById } from "@/actions/company/show-one-company";
import CommentCompany from "@/components/page/company-page/comment-company";
import CompanyCaseBlock from "@/components/page/company-page/company-case-block";
import FormError from "@/components/ui/form-error";
import CompanyCaseList from "@/components/page/company-page/company-case-list";
import AddAffairButton from "@/components/ui/add-affair-button";
import { Separator } from "@/components/ui/separator";
import StageRow from "@/components/page/company-page/stage-row";
import Generate from "@/components/generate/summary/generate";
import { showSummariesById } from "@/actions/sammary/show-summary";
import { MIN_COUNT_CASE_FOR_GENERATE } from "@/constance/constance";
import UpdateFormDeal from "@/components/page/deal-create/update-form-deal";
import ColTwoContainer from "@/components/utils/col-two-container";
import ColOneContainer from "@/components/utils/col-one-container";

const AffairsDealPage = async ({
  params,
}: {
  params: { dealId: string; id: string };
}) => {
  const deal = await showOneDealById(params.dealId);
  const company = await showOneCompanyById(params.id);
  const summary = await showSummariesById(params.dealId);

  if (!deal) {
    return (
      <Container>
        <FormError message="Insufficient permissions to view this resource." />
      </Container>
    );
  }

  return (
    <Container>
      <ColTwoContainer>
        <div className="flex items-center gap-4">
          <BackButton />
          <HeaderForCRM text={deal?.name} />
          <StageBadge
            stage={deal?.stage || StageDeal.NEW}
            className=" inline-flex"
          />
        </div>
        <StageRow stage={deal?.stage} dealId={deal?.id || ""} />
        <ContactsList contacts={company?.contacts} companyId={company?.id} />
        <AddAffairButton dealId={deal.id} className="mt-6" />
        <CompanyCaseList companyCase={deal?.cases} />
      </ColTwoContainer>
      <ColOneContainer>
        <UpdateFormDeal deal={deal} />
        <CommentCompany
          companyId={company?.id}
          companyName={company?.name}
          comment={company?.comment}
        />
        {deal?.cases?.filter((i) => i.finished)?.length >=
        MIN_COUNT_CASE_FOR_GENERATE ? (
          <Generate
            companyCase={deal?.cases}
            dealId={deal.id}
            summary={summary}
          />
        ) : null}
      </ColOneContainer>
    </Container>
  );
};

export default AffairsDealPage;
