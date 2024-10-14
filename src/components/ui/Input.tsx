import { cn } from "@/lib/utils";

interface InputProps {
  type: string;
  label: string;
  error?: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  error,
  name,
  label,
  value,
  onChange,
  className,
  placeholder = "",
  required = true,
  min,
  max,
}) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
      />
      <label
        htmlFor={name}
        className={cn(
          "cursor-pointer bg-white z-10 w-full py-1 peer-focus:w-auto peer-focus:py-0 peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
          className,
          error && "border-red-500",
        )}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default Input;
