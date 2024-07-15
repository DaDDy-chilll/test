import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

type InputBoxComponentProps = {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  multiline?: number;
  className?: string;
  backgroundColor?: string;
  disabled?: boolean;
  max?: number;
  
  //ref?: 
};

const InputBoxComponent = ({
  value,
  error,
  label,
  multiline,
  className,
  backgroundColor,
  disabled,
  onChange,
  max
}: InputBoxComponentProps) => {
  return (
    <TextField
      className={`flex-1 ${className}`}
      value={value}
      onChange={(e)=> {
        if(max){
          e.currentTarget.value.length <=max && onChange(e)
        }else{
          onChange(e)
        }
       }}
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
  );
};

export default InputBoxComponent;
