import { Dispatch, SetStateAction } from "react";

interface OrderMenuProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}
const OrderToggle = ({ toggle, setToggle }: OrderMenuProps) => {
  return (
    <div className="flex flex-row h-[73px] mx-[25px] border-textBlue border-b-[1px] border-opacity-50 relative">
      <button className={`w-[200px] transition-all duration-300 ${toggle ? "text-textBlue font-semibold" : ""}`} onClick={() => setToggle(true)}>
        新注文
      </button>
      <button className={`w-[200px] transition-all duration-300 ${!toggle ? "text-textBlue font-semibold" : ""}`} onClick={() => setToggle(false)}>
        注文済
      </button>
      <div
        className={`absolute w-[200px] bottom-0 left-0 h-[6px] rounded-md bg-textBlue transition-all duration-300 ${
          toggle ? "left-0" : "left-[200px]"
        }`}
      ></div>
    </div>
  );
};

export default OrderToggle;
