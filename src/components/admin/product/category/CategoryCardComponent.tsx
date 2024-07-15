import { Card } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from '@mui/icons-material/Add';

const CategoryCardComponent = ({
    product_category_id,product_category_name,setConfirmDelete,product_sub_category,
    setProductCategoryId,setCategoryName,setOpen,setOpenSubCat,setOpenUpdateSubCategoryDialog,setSubCategoryName,
    setProductSubCategoryId,setOpenDeleteSubCategoryDialog}:any)=>{

    //delete category action
    const deleteCategoryAction = (product_category_id:number)=>{
        setConfirmDelete(true);
        setProductCategoryId(product_category_id);
    }

    //update category action
    const editCategoryAction = (product_category_name:string,product_category_id:number) => {
        setOpen(true);
        setProductCategoryId(product_category_id);
        setCategoryName(product_category_name);
    }

    // create sub category 
    const createSubCatAction = (product_category_id:number)=>{
        setOpenSubCat(true);
        setProductCategoryId(product_category_id);
    }

    // update sub category 
    const editSubCategoryAction = (product_sub_category_id:number,name:string)=>{
        setOpenUpdateSubCategoryDialog(true);
        setSubCategoryName(name);
        setProductCategoryId(product_category_id);
        setProductSubCategoryId(product_sub_category_id);
    }

    //delete SubCategory Action
    const deleteSubCategoryAction = (product_sub_category_id:number)=>{
        setOpenDeleteSubCategoryDialog(true);
        setProductCategoryId(product_category_id);
        setProductSubCategoryId(product_sub_category_id);   
    }

    return <Card key={product_category_id} className=" text-[14px] bg-white h-fit">
    {/* Title */}
    <div className="flex flex-row font-bold p-[15px]">
        <div className="flex-1">{product_category_name}</div>
        <EditIcon onClick={()=>editCategoryAction(product_category_name,product_category_id)} className="opacity-80 cursor-pointer w-[20px] h-[20px] nav text-blue-400" />
        <DeleteOutlineOutlinedIcon onClick={() => deleteCategoryAction(product_category_id)} className="text-red-500 nav w-[20px] h-[20px] nav ml-[10px]" />
    </div>
    <hr></hr>
    {/* Body */}
    {
        product_sub_category.map(({ product_sub_category_id, name }:{product_sub_category_id:number,name:string}) => {
            return <div key={Math.random()} className="flex flex-row p-[15px]">
                <div className="flex-1">{name}</div>
                <EditIcon onClick = {() => editSubCategoryAction(product_sub_category_id,name)} className="opacity-80 cursor-pointer w-[20px] h-[20px] nav text-blue-400" />
                <DeleteOutlineOutlinedIcon onClick={() => deleteSubCategoryAction(product_sub_category_id)} className="text-red-500 nav w-[20px] h-[20px] nav ml-[10px]" />
            </div>
        })
    }
    <hr></hr>
    {/* footer */}
    <div className="flex flex-row p-[15px] justify-end">
        <div onClick={() => {createSubCatAction(product_category_id)}} className="flex flex-row  w-[35px] h-[35px] justify-center items-center rounded-full nav bg-blue-800">
            <AddIcon className="text-white w-[30px] h-[30px] pr-15px" />
        </div>
    </div>
</Card>
}
export default CategoryCardComponent;