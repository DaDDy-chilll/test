// import importCSV from "@/assets/product/inport_csv.svg";
import TuneIcon from "@mui/icons-material/Tune";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction } from "react";

interface ProductMenuProps {
  title: string;
  openDialog: Dispatch<SetStateAction<boolean>>;
  openAddDialog: Dispatch<SetStateAction<boolean>>;
}
const AddressMenu = ({
  title,
  openDialog,
  openAddDialog,
}: ProductMenuProps) => {
  return (
    <div className="flex flex-row justify-between items-center bg-white h-[73px] mx-[25px] px-[28px]">
      <div>{title}</div>
      <div className="flex flex-row items-center text-[#285dbd]">
        {/* <img src={importCSV} className="w-[35px] h-[35px] nav" /> */}
        <SizeBox w={35} />
        <div onClick={() => openDialog(true)}>
          <TuneIcon fontSize="large" className="opacity-80 nav" />
        </div>
        <SizeBox w={35} />
        <div onClick={() => openAddDialog(true)}>
          <AddCircleIcon fontSize="large" className="opacity-80 nav" />
        </div>
      </div>
    </div>
  );
};

export default AddressMenu;
