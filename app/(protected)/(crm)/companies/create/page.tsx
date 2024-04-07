import BackButton from "@/components/back-button";
import CreateForm from "@/components/page/company-create/create-form";
import Container from "@/components/utils/container";
import HeaderForCRM from "@/components/utils/header-for-crm";

const CreateCompanyPage = () => {
  return (
    <Container>
      <div className="flex items-center gap-4 lg:col-span-3">
        <BackButton />
        <HeaderForCRM text="Создание компании" />
      </div>
      <CreateForm />
    </Container>
  );
};

export default CreateCompanyPage;
