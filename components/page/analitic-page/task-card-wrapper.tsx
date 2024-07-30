"use client";

import { useSearchParams } from "next/navigation";

import DataCard from "@/components/page/analitic-page/data-card";

interface TaskCardWrapperProps {
  count: number;
}
const TaskCardWrapper: React.FC<TaskCardWrapperProps> = ({ count }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const path = `/affairs?${params.toString()}`;
  return (
    <DataCard
      data={count}
      title="Tasks in Progress"
      label="tasks"
      href={path}
    />
  );
};

export default TaskCardWrapper;
