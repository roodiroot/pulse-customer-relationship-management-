"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ExactDateFilter from "@/components/filters-ui/exact-date-filter";
import ResponsibleFilter from "@/components/filters-ui/responsible-filter";
import ContainerFilters from "@/components/filters-ui/container-filters";

import { User } from "@prisma/client";

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

  const searchdate = searchParams.get("date");
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

  useEffect(() => {
    if (searchdate) setDate(new Date(searchdate));
    if (searchdateend) setDateEnd(new Date(searchdateend));
    if (searchresrponsible) setResponsible(searchresrponsible);
  }, [searchdate, searchresrponsible, searchdateend]);

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
    </ContainerFilters>
  );
};

export default FiltersDeal;
