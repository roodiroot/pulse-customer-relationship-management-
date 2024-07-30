"use client";

import { Button } from "@/components/ui/button";

const WeekTimeSwich = ({
  offset,
  setOffset,
}: {
  offset: number;
  setOffset: (value: number) => void;
}) => {
  return (
    <div className="">
      <Button
        onClick={() => setOffset(offset - 1)}
        variant="outline"
        className="rounded-r-none border-r-0"
      >
        &lsaquo;
      </Button>
      <Button
        onClick={() => setOffset(0)}
        variant="outline"
        className="rounded-none border-x-0"
      >
        Today
      </Button>
      <Button
        onClick={() => setOffset(offset + 1)}
        variant="outline"
        className="rounded-l-none border-l-0"
      >
        &rsaquo;
      </Button>
    </div>
  );
};

export default WeekTimeSwich;
