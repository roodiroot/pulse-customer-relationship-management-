"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ExactDateFilter from "@/components/filters-ui/exact-date-filter";
import ResponsibleFilter from "@/components/filters-ui/responsible-filter";
import ContainerFilters from "@/components/filters-ui/container-filters";

import { ActionType, StageDeal, User } from "@prisma/client";
import StageStatusFilter from "@/components/filters-ui/stage-status-filter";
import TypeStatusFilter from "@/components/filters-ui/type-status-filter";
import AffairStatusFilter from "@/components/filters-ui/affair-status-filter";

interface FiltersAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
  users?: { users: User[]; count: number } | null;
  permission?: boolean;
}

const FiltersAnalytics: React.FC<FiltersAnalyticsProps> = ({
  users,
  permission = false,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [finished, setFinished] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [dateEnd, setDateEnd] = useState<Date | undefined>();
  const [type, setType] = useState<ActionType | undefined | "all">();
  const [responsible, setResponsible] = useState<string | undefined>();
  const [stage, setStage] = useState<StageDeal | "all" | "NOT_DIS" | undefined>(
    undefined
  );

  const searchdate = searchParams.get("date");
  const searchtype = searchParams.get("type");
  const searchstage = searchParams.get("stage");
  const searchdateend = searchParams.get("dateEnd");
  const searchfinished = searchParams.get("finished") || "";
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
  const addingStage = (e: StageDeal | "all" | "NOT_DIS") => {
    setStage(e);
    if (!e) return removeParamFromUrl("stage");
    return addParamToUrl("stage", e);
  };
  const addingDateEnd = (e?: Date) => {
    setDateEnd(e);
    if (!e) return removeParamFromUrl("dateEnd");
    return addParamToUrl("dateEnd", new Date(e).toJSON());
  };
  const addingResponsible = (e: string) => {
    setResponsible(e);
    if (e === "all") return removeParamFromUrl("responsible");
    return addParamToUrl("responsible", e);
  };
  const addingStatus = (e: string) => {
    setFinished(e);
    if (e === "3") return removeParamFromUrl("finished");
    return addParamToUrl("finished", e);
  };
  const addingType = (e: ActionType | "all") => {
    setType(e);
    if (!e || e === "all") return removeParamFromUrl("type");
    return addParamToUrl("type", e);
  };

  useEffect(() => {
    if (searchdate) setDate(new Date(searchdate));
    if (searchtype) setType(searchtype as ActionType);
    if (searchstage) setStage(searchstage as StageDeal);
    if (searchdateend) setDateEnd(new Date(searchdateend));
    if (searchresrponsible) setResponsible(searchresrponsible);
    if (["1", "2", "3"].includes(searchfinished)) setFinished(searchfinished);
  }, [
    searchtype,
    searchdate,
    searchresrponsible,
    searchdateend,
    searchstage,
    searchfinished,
  ]);

  return (
    <ContainerFilters>
      <ExactDateFilter date={date} setDate={addingDate} />
      <ExactDateFilter date={dateEnd} setDate={addingDateEnd} />
      <ResponsibleFilter
        permission={permission}
        users={users?.users}
        setResponsible={addingResponsible}
        responsible={responsible}
      />
      <StageStatusFilter stage={stage} setStage={addingStage} />
      <TypeStatusFilter setType={addingType} type={type} />
      <AffairStatusFilter setStatus={addingStatus} status={finished} />
    </ContainerFilters>
  );
};

export default FiltersAnalytics;
