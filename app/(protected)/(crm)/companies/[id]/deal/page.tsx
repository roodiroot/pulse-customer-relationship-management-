import BackButton from "@/components/back-button";
import DealCreate from "@/components/page/deal-create/deal-create";
import Container from "@/components/utils/container";
import HeaderForCRM from "@/components/utils/header-for-crm";

const DealCreatePage = async ({ params }: { params: { id: string } }) => {
  return (
    <Container>
      <div className="flex items-center gap-4 lg:col-span-3">
        <BackButton />
        <HeaderForCRM text="Создание сделки" />
      </div>
      <DealCreate companyId={params.id} />
    </Container>
  );
};

export default DealCreatePage;
