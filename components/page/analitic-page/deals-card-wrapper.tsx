"use client";

import { useSearchParams } from "next/navigation";

import DataCard from "@/components/page/analitic-page/data-card";

interface DealCardWrapperProps {
  count: number;
}
const DealCardWrapper: React.FC<DealCardWrapperProps> = ({ count }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const path = `/deals?${params.toString()}`;
  return (
    <DataCard
      data={count}
      title="Deals in Progress"
      label="deals"
      href={path}
    />
  );
};

export default DealCardWrapper;
