import { useQuery } from "@tanstack/react-query";
import { ActionType, Case, Company, Deal } from "@prisma/client";

import { showCases } from "@/actions/case/show-cases";

export interface DealCompany extends Deal {
  company: Company;
}

export interface CaseRes extends Case {
  deals: DealCompany;
}

export const useFetchCases = ({
  type,
  finished,
  start,
  end,
}: {
  type?: ActionType;
  finished?: boolean;
  start?: Date;
  end?: Date;
}) => {
  return useQuery({
    queryKey: ["cases", { type, finished, start, end }],
    queryFn: () => showCases({}),
  });
};
