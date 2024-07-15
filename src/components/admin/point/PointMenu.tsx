import { Dispatch, SetStateAction } from "react";
// import importCSV from "@/assets/product/inport_csv.svg";
import TuneIcon from "@mui/icons-material/Tune";
import SizeBox from "@/components/SizeBox";

interface OrderMenuProps {
  uCode?:string;
  title: string;
  openDialog: Dispatch<SetStateAction<boolean>>;
}
const PointMenu = ({ uCode,title, openDialog }: OrderMenuProps) => {

  return (
    <div className="flex flex-row justify-between items-center bg-white h-[73px] mx-[25px] px-[28px] rounded-md">
      <div>{title} {uCode}</div>
     
      <div className="flex flex-row items-center text-[#285dbd]">
        {/* <img src={importCSV} className="w-[35px] h-[35px] nav"/> */}
        <SizeBox w={35} />
        <div onClick={()=>openDialog(true)}><TuneIcon fontSize="large" className="opacity-80 nav"/></div>
    </div>
    </div>
  );
};

export default PointMenu;
