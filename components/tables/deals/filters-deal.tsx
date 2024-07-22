"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ExactDateFilter from "@/components/filters-ui/exact-date-filter";
import ResponsibleFilter from "@/components/filters-ui/responsible-filter";
import ContainerFilters from "@/components/filters-ui/container-filters";

import { StageDeal, User } from "@prisma/client";
import StageStatusFilter from "@/components/filters-ui/stage-status-filter";

interface FiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  users?: { users: User[]; count: number } | null;
  permission?: boolean;
}

const FiltersDeal: React.FC<FiltersProps> = ({ users, permission = false }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<Date | undefined>();
  const [dateEnd, setDateEnd] = useState<Date | undefined>();
  const [responsible, setResponsible] = useState<string | undefined>();
  const [stage, setStage] = useState<StageDeal | "all" | "NOT_DIS" | undefined>(
    undefined
  );

  const searchdate = searchParams.get("date");
  const searchstage = searchParams.get("stage");
  const searchdateend = searchParams.get("dateEnd");
  const searchresrponsible = searchParams.get("responsible");

  const addParamToUrl = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page"); // удаляем параметр page и возвращаем на первую страницу
      params.set(key, value);
      router.push(`${pathname}?${params}`);
    },
    [searchParams, pathname, router]
  );

  const removeParamFromUrl = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(`${pathname}?${params}`);
    },
    [searchParams, pathname, router]
  );

  const addingDate = (e?: Date) => {
    setDate(e);
    if (!e) return removeParamFromUrl("date");
    return addParamToUrl("date", new Date(e).toJSON());
  };
  const addingStage = (e?: StageDeal | "all" | "NOT_DIS") => {
    setStage(e);
    if (!e || e === "all") return removeParamFromUrl("stage");
    return addParamToUrl("stage", e);
  };
  const addingDateEnd = (e?: Date) => {
    setDateEnd(e);
    if (!e) return removeParamFromUrl("dateEnd");
    return addParamToUrl("dateEnd", new Date(e).toJSON());
  };
  const addingResponsible = (e?: string) => {
    setResponsible(e);
    if (e === "all" || !e) return removeParamFromUrl("responsible");
    return addParamToUrl("responsible", e);
  };

  useEffect(() => {
    if (searchdate) setDate(new Date(searchdate));
    if (searchstage) setStage(searchstage as StageDeal);
    if (searchdateend) setDateEnd(new Date(searchdateend));
    if (searchresrponsible) setResponsible(searchresrponsible);
  }, [searchdate, searchresrponsible, searchdateend, searchstage]);

  return (
    <ContainerFilters>
      <ResponsibleFilter
        permission={permission}
        users={users?.users}
        setResponsible={addingResponsible}
        responsible={responsible}
      />
      <ExactDateFilter
        date={date}
        setDate={addingDate}
        placeholder="Deal Creation Date/Start"
      />
      <ExactDateFilter
        date={dateEnd}
        setDate={addingDateEnd}
        placeholder="Deal Creation Date/End"
      />
      <StageStatusFilter stage={stage} setStage={addingStage as () => void} />
    </ContainerFilters>
  );
};

export default FiltersDeal;
