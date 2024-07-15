import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";

interface SubCategoryDeleteConfirmProps {
    open : boolean;
    productSubCategoryId: number;
    setOpen : Dispatch<SetStateAction<boolean>>;
    confirmAction : (id:number)=>void;
}

const SubCategoryDeleteConfirm = ({open,setOpen,confirmAction,productSubCategoryId}:SubCategoryDeleteConfirmProps)=>{
    return  <DialogBox open={open} setOpen={setOpen} size="xs">
        {/* Title */}
        <div className="flex flex-row">
            <div className="flex-1 my-[20px] text-[25px] text-center text-blue-800">Do you Want to Delete?</div>
            <Close onClick={() => setOpen(false)} className="text-black w-[50px] h-[50px] nav mt-[30px] mr-[40px]" />
        </div>
        <hr></hr>
        {/* footer */}
        <div className="flex flex-row pt-7 pb-7 ml-[30px] mr-[30px]">
            <Button onClick={() => { confirmAction(productSubCategoryId) }} className="flex-1 pl-10" variant="outlined">削除</Button>
            <Button onClick={() => { setOpen(false) }} className="flex-1 pl-10" variant="outlined">キャンセル</Button>
        </div>
    </DialogBox>
}
export default SubCategoryDeleteConfirm;