"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
export function DealOverview({
  deals,
  className,
}: {
  deals: Deal[];
  className?: string;
}) {
  const data = transformArray(deals);
  const searchParams = useSearchParams();
  const router = useRouter();

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <div className={className}>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            className="cursor-pointer"
            dataKey="ids.length"
            name="count"
            fill="var(--color-desktop)"
            radius={4}
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
      </ChartContainer>
    </div>
  );
}
