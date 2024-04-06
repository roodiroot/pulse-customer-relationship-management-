import CreateForm from "@/components/page/company-create/create-form";

const CreateCompanyPage = () => {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <CreateForm />
      </div>
    </div>
  );
};

export default CreateCompanyPage;
