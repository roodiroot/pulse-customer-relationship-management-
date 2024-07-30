import WindowOneContainer from "@/components/utils/window-container";

export default function CalendarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WindowOneContainer className="p-0 sm:p-0 lg:p-0">
      <div className="lg:h-0 lg:min-h-full p-4">
        <div className="lg:flex lg:h-full lg:flex-col">{children}</div>
      </div>
    </WindowOneContainer>
  );
}
