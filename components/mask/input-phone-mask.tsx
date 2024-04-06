import React from "react";
import { Input } from "../ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
}

const InputPhoneMask: React.FC<InputProps> = ({
  value,
  setValue,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setValue) return;
    // Применение маски к значению
    var input = event.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) return setValue("");

    if (input.value.length !== selectionStart) {
      //@ts-ignore
      const data = event.nativeEvent.data;
      if (!/\D/g.test(data) || data === null) {
        return setValue(input.value);
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSimbol = inputNumbersValue[0] === "8" ? "8" : "+7";
      formattedInputValue = firstSimbol + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }

    return setValue(formattedInputValue);
  };

  return (
    <Input
      maxLength={18}
      type="text"
      value={value}
      inputMode="tel"
      placeholder="+7 (000) 000-00-00"
      onChange={handleChange}
      className={className}
    />
  );
};

export default InputPhoneMask;

var getInputNumbersValue = function (input: any) {
  // Return stripped input value — just numbers
  return input.value.replace(/\D/g, "");
};
