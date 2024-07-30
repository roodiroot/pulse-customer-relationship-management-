"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Case, Deal, StageDeal } from "@prisma/client";

interface TransformedData {
  date: string;
  ids: string[];
  length: number;
}

function transformData(data: Case[]): TransformedData[] {
  // Если данных нет, возвращаем пустой массив
  if (data.length === 0) return [];

  // Функция для получения диапазона дат
  function getDateRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  // Определяем самую раннюю и самую позднюю даты
  const dates = data
    .map((item) => item.date)
    .filter((date) => date !== null) as Date[];
  const minDate = new Date(Math.min(...dates.map((date) => date.getTime())));
  const maxDate = new Date(Math.max(...dates.map((date) => date.getTime())));

  // Получаем диапазон дат
  const dateRange = getDateRange(minDate, maxDate);

  // Создаем объект для группировки по датам
  const groupedData = dateRange.reduce(
    (acc: { [key: string]: TransformedData }, date) => {
      acc[date] = { date, ids: [], length: 0 };
      return acc;
    },
    {}
  );

  // Обрабатываем входные данные
  data.forEach((item) => {
    if (item.date) {
      const date = item.date.toDateString(); // Преобразуем дату в строку без времени
      if (groupedData[date]) {
        groupedData[date].ids.push(item.id);
        groupedData[date].length++;
      }
    }
  });

  // Преобразуем объект в массив
  return Object.values(groupedData);
}

export function CaseOverview({ cases }: { cases: Case[] }) {
  const data = transformData(cases);
  const searchParams = useSearchParams();
  const router = useRouter();

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
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
          dataKey="length"
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
  );
}
