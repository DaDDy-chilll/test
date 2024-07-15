import { Dispatch, SetStateAction } from "react";

interface OrderMenuProps {
  toggle: number;
  setToggle: Dispatch<SetStateAction<number>>;
}
const MasterSettingsToggleComponent = ({
  toggle,
  setToggle,
}: OrderMenuProps) => {
  return (
    <div className="flex flex-row h-[73px] mx-[25px] border-textBlue border-b-[1px] border-opacity-50 relative">
      <button
        className={`w-[200px] transition-all duration-300 ${
          toggle === 1 ? "text-textBlue font-semibold" : ""
        }`}
        onClick={() => setToggle(1)}
      >
        区分マスタ
      </button>
      <button
        className={`w-[200px] transition-all duration-300 ${
          toggle === 2 ? "text-textBlue font-semibold" : ""
        }`}
        onClick={() => setToggle(2)}
      >
        住所マスタ
      </button>
      <button
        className={`w-[200px] transition-all duration-300 ${
          toggle === 3 ? "text-textBlue font-semibold" : ""
        }`}
        onClick={() => setToggle(3)}
      >
        ポイントマスタ
      </button>
      <button
        className={`w-[200px] transition-all duration-300 ${
          toggle === 4 ? "text-textBlue font-semibold" : ""
        }`}
        onClick={() => setToggle(4)}
      >
        配達手数料マスタ
      </button>
      <div
        className={`absolute w-[200px] bottom-0 left-0 h-[6px] rounded-md bg-textBlue transition-all duration-300 ${
          toggle === 1
            ? "left-0"
            : toggle === 2
            ? "left-[200px]"
            : toggle === 3
            ? "left-[400px]"
            : "left-[600px]"
        }`}
      ></div>
    </div>
  );
};

export default MasterSettingsToggleComponent;
