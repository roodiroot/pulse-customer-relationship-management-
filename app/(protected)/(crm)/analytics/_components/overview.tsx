"use client";

import { Deal, StageDeal } from "@prisma/client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];
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
export function Overview({ deals }: { deals: Deal[] }) {
  const data = transformArray(deals);

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
        <YAxis />
        <Tooltip
          wrapperClassName="bg-red-500 rounded-[4px] bg-opacity-50 p-2 text-slate-500"
          labelClassName=""
        />
        <Bar
          dataKey="ids.length"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
