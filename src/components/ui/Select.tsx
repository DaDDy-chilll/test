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
}

const Select: React.FC<SelectProps> = ({
  label = "Select an option",
  name,
  options,
  id = "custom_select",


  className = "",
  defaultOption = "Choose an option",
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-black sr-only">
        {label}
      </label>
      <select
        id={id}
        name={name}
      
        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      >
        <option selected>{defaultOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
