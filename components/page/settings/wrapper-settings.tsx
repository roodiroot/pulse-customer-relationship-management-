const WrapperSettings = ({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="border-b pb-2 mb-4">
        <h2 className="text-lg font-bold md:text-2xl">{title}</h2>
      </div>
      {children}
    </>
  );
};

export default WrapperSettings;
