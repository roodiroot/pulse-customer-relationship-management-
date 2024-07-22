"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ResponsibleFilter from "@/components/filters-ui/responsible-filter";
import ExactDateFilter from "@/components/filters-ui/exact-date-filter";
import ContainerFilters from "@/components/filters-ui/container-filters";

import { User } from "@prisma/client";

interface FiltersCompanyProps extends React.HTMLAttributes<HTMLDivElement> {
  users: { users: User[]; count: number } | null;
  permission?: boolean;
}

const FiltersCompany: React.FC<FiltersCompanyProps> = ({
  users,
  permission = false,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<Date | undefined>();
  const [responsible, setResponsible] = useState<string | undefined>();

  const searchdate = searchParams.get("date");
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

  const addingResponsible = (e?: string) => {
    setResponsible(e);
    if (e === "all" || !e) return removeParamFromUrl("responsible");
    return addParamToUrl("responsible", e);
  };

  useEffect(() => {
    if (searchdate) setDate(new Date(searchdate));
    if (searchresrponsible) setResponsible(searchresrponsible);
  }, [searchdate, searchresrponsible]);

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
        placeholder="Company Creation Date"
      />
    </ContainerFilters>
  );
};

export default FiltersCompany;
