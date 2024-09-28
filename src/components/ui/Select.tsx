import { cn } from "@/lib/utils";
import React from "react";
import { ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  id?: string;
  className?: string;
  defaultOption?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  style?: number;
}

const Select: React.FC<SelectProps> = ({
  label = "Select an option",
  name,
  options,
  id = "custom_select",
  className = "",
  defaultOption = "Choose an option",
  style = 0,
}) => {
  return (
    <div
      className={cn(
        "relative z-0 w-full mb-5 group flex items-center",
        className
      )}
    >
      <label
        htmlFor={id}
        className={cn(
          "peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
          className
        )}
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={`relative block font-normal outline-none  w-full text-sm text-black bg-transparent ${
          style === 0
            ? "border-0 border-b-2 py-2.5 px-0"
            : "border-none bg-gray-300  px-1 py-1.5 rounded-md"
        } appearance-none  peer`}
      >
        <option defaultValue={defaultOption} value={defaultOption}>
          {defaultOption}{" "}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className={`absolute right-2  ${style === 0 ? "top-2" : "top-1"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
