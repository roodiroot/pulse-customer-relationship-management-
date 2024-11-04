"use client";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/time-select";
import { Clock10Icon } from "lucide-react";

interface TimePickerProps {
  value?: string;
  setValue?: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, setValue }) => {
  const [hour, setHour] = useState(value?.split(":")[0] || "00");
  const [minute, setMinute] = useState(value?.split(":")[1] || "00");

  useEffect(() => {
    if (value && setValue) setValue(`${hour}:${minute}`);
  }, [hour, minute]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i < 10 ? `0${i}` : `${i}`
  );
  const minutes = Array.from({ length: 60 }, (_, i) => {
    // const value = i * 5; // Интервалы по 5 минут
    // return value < 10 ? `0${value}` : `${value}`; // Добавление ведущего нуля для чисел меньше 10
    return i < 10 ? `0${i}` : `${i}`;
  });

  return (
    <div className="flex items-center pl-3 pr-4">
      <div className="flex items-center">
        <Select onValueChange={(e) => setHour(e)} value={hour}>
          <SelectTrigger>
            <SelectValue placeholder="hh" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {hours.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-primary">:</span>
        <Select onValueChange={(e) => setMinute(e)} value={minute}>
          <SelectTrigger>
            <SelectValue placeholder="mm" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {minutes.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Clock10Icon className="ml-2 h-4 w-4 opacity-50 text-primary " />
    </div>
  );
};

export default TimePicker;
