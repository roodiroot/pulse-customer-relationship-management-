"use client";

import { useSearchParams } from "next/navigation";

import DataCard from "@/components/page/analitic-page/data-card";

interface CompanyCardWrapperProps {
  count: number;
}
const CompanyCardWrapper: React.FC<CompanyCardWrapperProps> = ({ count }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const path = `/companies?${params.toString()}`;
  return (
    <DataCard data={count} title="Companies" label="comanies" href={path} />
  );
};

export default CompanyCardWrapper;
