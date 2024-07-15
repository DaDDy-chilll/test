import { TextField } from "@mui/material";
import { ChangeEvent, useRef } from "react";

type InputBoxPercentComponentProps = {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  multiline?: number;
  className?: string;
  backgroundColor?: string;
  disabled?: boolean;
  max?: number;
  id: string;
};

const InputBoxPercentComponent = ({
  value,
  id,
  error,
  label,
  multiline,
  className,
  backgroundColor,
  disabled,
  onChange,
  max
}: InputBoxPercentComponentProps) => {
  const inputRef = useRef<HTMLLabelElement>(null);
   return (
    <label htmlFor={id} ref={inputRef} className="relative  flex-1 flex flex-row">
       <TextField
        onFocus={(e)=>console.log(e.currentTarget.focus)}
        id={id}
        className={`flex-1 ${className} `}
        value={value}
        onChange={(e)=> max?(e.currentTarget.value.length <=max && onChange(e)):onChange(e)}
        label={label}
        error={!!error}
        multiline={!!multiline}
        rows={multiline && multiline}
        helperText={error && error}
        InputProps={{
          style: { backgroundColor: backgroundColor ?? "#F2F5FB" },
        }}
        disabled={!!disabled}
    />
    <div className="absolute h-[55px] flex flex-row items-center">
      {/* <div onClick={()=> inputRef.current?.click()}> */}
      <label htmlFor={id}>
        {
          value
          && <>
          <span className="opacity-0 pl-[13px] text-[14px]">{value}</span> 
          <span className="pl-[5px] text-[14px] text-black font-bold">%</span>
          </>
        }
      </label>
      {/* </div> */}
    </div>
   </label>
  );
};

export default InputBoxPercentComponent;
