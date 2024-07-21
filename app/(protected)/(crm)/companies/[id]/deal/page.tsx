import BackButton from "@/components/back-button";
import DealCreate from "@/components/page/deal-create/deal-create";
import ColTwoContainer from "@/components/utils/col-two-container";
import Container from "@/components/utils/container";
import HeaderForCRM from "@/components/utils/header-for-crm";

const DealCreatePage = async ({ params }: { params: { id: string } }) => {
  return (
    <Container>
      <ColTwoContainer>
        <div className="flex items-center gap-4 lg:col-span-3">
          <BackButton />
          <HeaderForCRM text="Creating a deal" />
        </div>
        <DealCreate companyId={params.id} />
      </ColTwoContainer>
    </Container>
  );
};

export default DealCreatePage;
