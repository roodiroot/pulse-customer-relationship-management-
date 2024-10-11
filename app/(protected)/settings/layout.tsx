import Link from "next/link";
import Container from "@/components/utils/container";
import Navigation from "@/components/page/settings/navigation";

const SettingsLayout = ({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams: {
    createContact: string;
  };
}>) => {
  return (
    <div className="absolute inset-0 grid items-start gap-y-4 lg:grid-cols-4 auto-rows-min">
      <div className="h-full overflow-y-auto px-2 py-4 sm:px-4 lg:py-6 lg:px-6 space-y-4">
        <Navigation />
      </div>
      <div className="auto-rows-max items-start lg:col-span-3 order-2 lg:order-1 h-full overflow-y-auto px-2 py-4 lg:py-6 sm:px-4 space-y-4 ">
        {children}
      </div>
    </div>
  );
};
export default SettingsLayout;
