import { showCases } from "@/actions/case/show-cases";
import { ActionType, Case, Company } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export interface CaseRes extends Case {
  company: Company;
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
    queryFn: () =>
      showCases({
        type,
        finished,
        start,
        end,
      }),
  });
};
