import DialogBox from "@/components/DialogBox"
import InputBoxComponent from "@/components/InputBoxComponent"
import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
interface SubCategoryCreateProps {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
    closeAction : ()=>void;
    subCategoryName: string;
    subCategoryNameErr : string;
    setSubCategoryName: Dispatch<SetStateAction<string>>;
    createSubCatAction: ()=>void;
}

const SubCategoryCreate = ({open,setOpen,closeAction,subCategoryName,setSubCategoryName,createSubCatAction,subCategoryNameErr}:SubCategoryCreateProps)=>{
    return  <DialogBox open={open} setOpen={setOpen} size="xs">
    {/* Title */}
    <div className="flex flex-row">
        <div className="flex-1 my-[20px] text-[25px] text-center text-blue-800">商品サブカテゴリー追加</div>
        <Close onClick={closeAction} className="text-black w-[50px] h-[50px] nav mt-[30px] mr-[40px]" />
    </div>
    <hr></hr>
    <div className="flex flex-row pt-10 ml-[30px] mr-[30px]">
        <InputBoxComponent
            onChange={(e) => setSubCategoryName(e.target.value)}
            value={subCategoryName}
            multiline={2}
            error={subCategoryNameErr}
            label="商品サブカテゴリー"
        />
    </div>
    {/* Error */}

    {/* footer */}
    <div className="flex flex-row pt-7 pb-7 ml-[30px] mr-[30px]">
        <Button onClick={createSubCatAction} className="flex-1" variant="contained">OK</Button>
    </div>
</DialogBox>
}

export default SubCategoryCreate;