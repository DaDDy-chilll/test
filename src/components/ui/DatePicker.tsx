import { cn } from "@/lib/utils";
import moment from "moment";
import { useEffect, useState } from "react";

interface DatePickerProps {
  type: string;
  label: string;
  error?: string;
  name: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

/**
 * This component is used to render a date picker with various styles and states.
 * @param value - The initial value of the date picker
 * @param error - Optional error message to display
 * @param name - The name attribute for the input element
 * @param label - The label for the date picker
 * @param className - Additional class names for styling
 * @param placeholder - Optional placeholder text for the input element
 * @param onChange - Optional callback function when the date value changes
 * @param required - Optional boolean to mark the input as required
 * @returns A styled DatePicker component
 */
const DatePicker: React.FC<DatePickerProps> = ({
  value,
  error,
  name,
  label,
  className,
  placeholder = "",
  onChange,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  /**
   * This useEffect hook is used to update the input value when the value prop changes.
   * @param value - The initial value of the date picker
   */
  useEffect(() => {
    if (value) {
      const momentDate = moment(value, [
        "YYYY-MM-DD",
        "DD/MM/YYYY",
        "MM/DD/YYYY",
      ]);
      if (momentDate.isValid()) {
        setInputValue(momentDate.format("YYYY-MM-DD"));
      }
    } else {
      setInputValue("");
    }
  }, [value]);

  /**
   * This function is used to handle the change event of the input element.
   * @param e - The change event of the input element
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formattedDate = moment(newValue).format("YYYY-MM-DD");
    setInputValue(formattedDate);
    if (onChange) {
      const formattedEvent = {
        ...e,
        target: {
          ...e.target,
          value: formattedDate,
        },
      };
      onChange(formattedEvent);
    }
  };

  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="date"
        name={name}
        id={name}
        value={moment(inputValue).format("YYYY-MM-DD")}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className={cn(
          "cursor-pointer z-10 w-full py-1 peer-focus:w-auto peer-focus:py-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
          className,
          error && "border-red-500",
        )}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default DatePicker;
