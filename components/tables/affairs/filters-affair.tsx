"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ActionType, User } from "@prisma/client";
import ExactDateFilter from "@/components/filters-ui/exact-date-filter";
import ContainerFilters from "@/components/filters-ui/container-filters";
import AffairStatusFilter from "@/components/filters-ui/affair-status-filter";
import TypeStatusFilter from "@/components/filters-ui/type-status-filter";
import ResponsibleFilter from "@/components/filters-ui/responsible-filter";

interface FiltersAffairProps extends React.HTMLAttributes<HTMLDivElement> {
  users: { users: User[]; count: number } | null;
  permission?: boolean;
}

const FiltersAffair: React.FC<FiltersAffairProps> = ({
  users,
  permission = false,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<Date | undefined>();
  const [dateEnd, setDateEnd] = useState<Date | undefined>();
  const [finished, setFinished] = useState<string | undefined>();
  const [type, setType] = useState<ActionType | undefined | "all">();
  const [responsible, setResponsible] = useState<string | undefined>();

  const searchdate = searchParams.get("date");
  const searchtype = searchParams.get("type");
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

  const addingDateEnd = (e?: Date) => {
    setDateEnd(e);
    if (!e) return removeParamFromUrl("dateEnd");
    return addParamToUrl("dateEnd", new Date(e).toJSON());
  };

  const addingStatus = (e?: string) => {
    setFinished(e);
    if (e === "all" || !e) return removeParamFromUrl("finished");
    return addParamToUrl("finished", e);
  };
  const addingType = (e?: ActionType | "all") => {
    setType(e);
    if (!e || e === "all") return removeParamFromUrl("type");
    return addParamToUrl("type", e);
  };
  const addingResponsible = (e?: string) => {
    setResponsible(e);
    if (e === "all" || !e) return removeParamFromUrl("responsible");
    return addParamToUrl("responsible", e);
  };

  useEffect(() => {
    if (searchdate) setDate(new Date(searchdate));
    if (searchtype) setType(searchtype as ActionType);
    if (searchdateend) setDateEnd(new Date(searchdateend));
    if (searchresrponsible) setResponsible(searchresrponsible);
    if (["1", "2", "3"].includes(searchfinished)) setFinished(searchfinished);
  }, [
    searchdate,
    searchdateend,
    searchfinished,
    searchtype,
    searchresrponsible,
  ]);

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
        placeholder="Task Creation Date/Start"
      />
      <ExactDateFilter
        date={dateEnd}
        setDate={addingDateEnd}
        placeholder="Task Creation Date/End"
      />
      <TypeStatusFilter
        setType={addingType as (e?: string) => void}
        type={type}
      />
      <AffairStatusFilter setStatus={addingStatus} status={finished} />
    </ContainerFilters>
  );
};

export default FiltersAffair;
