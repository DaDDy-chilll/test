import { Dispatch, SetStateAction } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import SizeBox from "@/components/SizeBox";

interface OrderMenuProps {
  title: string;
  openDialog: Dispatch<SetStateAction<boolean>>;
}
const CustomerMenu = ({ title, openDialog }: OrderMenuProps) => {

  return (
    <div className="flex flex-row justify-between items-center bg-white h-[73px] mx-[25px] px-[28px] rounded-md">
      <div>{title}</div>
      <div className="flex flex-row items-center text-[#285dbd]">
        {/* <img src={importCSV} className="w-[35px] h-[35px] nav"/> */}
        <SizeBox w={35} />
        <div onClick={()=>openDialog(true)}><TuneIcon fontSize="large" className="opacity-80 nav"/></div>
    </div>
    </div>
  );
};

export default CustomerMenu;
