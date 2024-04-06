const AuhtLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-[calc(100vh-96px-5.5rem)] w-full flex items-center">
      {children}
    </div>
  );
};

export default AuhtLayout;
