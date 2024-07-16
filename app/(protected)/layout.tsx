import LayoutContainer from "./_components/layout-container";
import CreateDealSheet from "@/components/modals/create-deal-sheet";
import CreateCaseSheet from "@/components/modals/create-affair-sheet";
import ShowContactSheet from "@/components/modals/show-contact-sheet";
import CreateContactSheet from "@/components/modals/create-contact-sheet";

export default function CRMLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams: {
    createContact: string;
  };
}>) {
  return (
    <>
      <LayoutContainer>{children}</LayoutContainer>
      <ShowContactSheet />
      <CreateContactSheet />
      <CreateDealSheet />
      <CreateCaseSheet />
    </>
  );
}
