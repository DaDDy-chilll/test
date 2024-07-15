import DialogBox from "@/components/DialogBox"
import InputBoxComponent from "@/components/InputBoxComponent"
import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
interface CategoryCreateProps {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
    closeAction : ()=>void;
    categoryName: string;
    categoryNameErr : string;
    setCategoryName: Dispatch<SetStateAction<string>>;
    createCatAction: ()=>void;
}
const CategoryCreate = ({open,setOpen,closeAction,categoryName,categoryNameErr,setCategoryName,createCatAction}:CategoryCreateProps)=>{
    return <DialogBox open={open} setOpen={setOpen} size="xs">
    {/* Title */}
    <div className="flex flex-row">
        <div className="flex-1 my-[20px] text-[25px] text-center text-blue-800">商品カテゴリー追加</div>
        <Close onClick={closeAction} className="text-black w-[50px] h-[50px] nav mt-[30px] mr-[40px]" />
    </div>
    <hr></hr>
    <div className="flex flex-row pt-10 ml-[30px] mr-[30px]">
        <InputBoxComponent
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            multiline={2}
            error={categoryNameErr}
            label="商品カテゴリー"
        />
    </div>
    {/* Error */}

    {/* footer */}
    <div className="flex flex-row pt-7 pb-7 ml-[30px] mr-[30px]">
        <Button onClick={createCatAction} className="flex-1" variant="contained">OK</Button>
    </div>
</DialogBox>
}
export default CategoryCreate;