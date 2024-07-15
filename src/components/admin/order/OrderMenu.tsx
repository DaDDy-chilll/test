import { Dispatch, SetStateAction } from "react";

interface OrderMenuProps {
  title: string;
  openDialog: Dispatch<SetStateAction<boolean>>;
}
const OrderMenu = ({ title }: OrderMenuProps) => {
  // const navigate = useNavigate();

  // const createOrder = () => {
  //   navigate(Routes.ADMIN.ORDER);
  // };

  return (
    <div className="flex flex-row justify-between items-center bg-white h-[73px] mx-[25px] px-[28px] rounded-md">
      <div>{title}</div>
      {/* <div className="flex flex-row items-center text-[#285dbd]">
        <img src={importCSV} className="w-[35px] h-[35px] nav"/>
        <SizeBox w={35} />
        <img src={exportCSV} className="w-[35px] h-[35px] nav"/>
        <SizeBox w={35} />
        <div onClick={()=>openDialog(true)}><TuneIcon fontSize="large" className="opacity-80 nav"/></div>
        <SizeBox w={35} />
        <div onClick={createOrder}><AddCircleIcon fontSize="large" className="opacity-80 nav"/></div>
    </div> */}
    </div>
  );
};

export default OrderMenu;
