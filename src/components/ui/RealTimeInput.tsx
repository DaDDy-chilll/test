import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps {
  type: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name: string;
  className?: string;
  placeholder?: string;
}

const RealTimeInput: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  error,
  name,
  label,
  className,
  placeholder = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (e.target.value) {
            setIsFocused(true);
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (!value) {
            setIsFocused(false);
          }
        }}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder={isFocused && !value ? placeholder : " "}
        required
      />
      <label
        htmlFor={name}
        className={cn(
          "peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
          className,
          error && 'border-red-500'
        )}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default RealTimeInput;
