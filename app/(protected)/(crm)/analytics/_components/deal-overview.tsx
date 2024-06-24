"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Deal, StageDeal } from "@prisma/client";

interface TransformedDeal {
  name: StageDeal | "NOT_DIS";
  ids: string[];
  total: number;
}

function transformArray(deals: Deal[]): TransformedDeal[] {
  const stageMap: { [key: string]: TransformedDeal } = {};

  // Инициализация всех стадий в stageMap
  for (const stage in StageDeal) {
    if (isNaN(Number(stage))) {
      // Проверка для исключения числовых ключей из enum
      stageMap[StageDeal[stage as keyof typeof StageDeal]] = {
        name: StageDeal[stage as keyof typeof StageDeal],
        ids: [],
        total: 0,
      };
    }
  }

  // Инициализация NOT_DIS отдельно
  stageMap["NOT_DIS"] = {
    name: "NOT_DIS",
    ids: [],
    total: 0,
  };

  deals.forEach((deal) => {
    const stageKey = deal.stage ?? "NOT_DIS";
    stageMap[stageKey].ids.push(deal.id);
  });

  const totalDeals = deals.length;

  Object.values(stageMap).forEach((transformedDeal) => {
    transformedDeal.total = Math.round(
      (transformedDeal.ids.length / totalDeals) * 100
    );
  });

  return Object.values(stageMap);
}
export function DealOverview({ deals }: { deals: Deal[] }) {
  const data = transformArray(deals);
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Bar
          dataKey="ids.length"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary cursor-pointer"
          onClick={(event) => {
            const params = new URLSearchParams(searchParams.toString());
            if (params.has("stage")) {
              params.delete("stage");
            }
            params.set("stage", event.name);
            router.push(`/deals?${params.toString()}`);
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
