import React, { useState } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

interface NumberInput {
  gvalue: number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}
const NumberInput: React.FC<NumberInput> = ({
  gvalue,
  onChange,
  placeholder,
  className,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, ""); // Удалить все нецифровые символы
    setValue(formatNumber(inputValue));
    onChange(inputValue);
  };

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Добавить пробелы каждые три цифры
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn("pr-14", className)}
      />
      <div className="absolute h-9 w-9 bg-muted/40 top-0 right-0">
        <DollarSign className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />
      </div>
    </div>
  );
};

export default NumberInput;
