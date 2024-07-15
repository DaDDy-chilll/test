
import TuneIcon from '@mui/icons-material/Tune';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SizeBox from "@/components/SizeBox";
import Routes from "@/navigations/routes";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface ProductMenuProps {
    title: string;
    openDialog: Dispatch<SetStateAction<boolean>>;
}
const ProductMenu = ({title,openDialog}: ProductMenuProps)=>{
    const navigate = useNavigate();

    const createProduct = ()=>{
        navigate(Routes.ADMIN.CREATE_PRODUCT);
    }

    return <div className="flex flex-row justify-between font-bold items-center bg-white h-[73px] mx-[25px] px-[28px]">
    <div>{title}</div>
    <div className="flex flex-row items-center text-[#285dbd]">
        {/* <img src={importCSV} className="w-[35px] h-[35px] nav"/>
        <SizeBox w={35} />
        <img src={exportCSV} className="w-[35px] h-[35px] nav"/>
        <SizeBox w={35} /> */}
        <div onClick={()=>openDialog(true)}><TuneIcon fontSize="large" className="opacity-80 nav"/></div>
        <SizeBox w={35} />
        <div onClick={createProduct}><AddCircleIcon fontSize="large" className="opacity-80 nav"/></div>
    </div>
</div>
}

export default ProductMenu;