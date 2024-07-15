import { Switch } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type SwitchComponentProps = {
  value: boolean;
  setValue: (value: boolean) => void | Dispatch<SetStateAction<boolean>>;
  leftSide: string;
  rightSide: string;
};

const SwitchComponet = ({
  value,
  setValue,
  leftSide,
  rightSide,
}: SwitchComponentProps) => {
  return (
    <div className="flex-1 flex flex-row items-center">
      <div
        onClick={() => {
          setValue(false);
        }}
        className="text-[14] mr-[10px] btn"
      >
        {leftSide}
      </div>
      <Switch
        checked={value}
        onChange={(event) => setValue(event.target.checked)}
        inputProps={{ "aria-label": "controlled" }}
      />
      <div onClick={() => setValue(true)} className="text-[14] ml-[10px] btn">
        {rightSide}
      </div>
    </div>
  );
};

export default SwitchComponet;
