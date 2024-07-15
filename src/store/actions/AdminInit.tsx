import { setCategoryLists } from "@/store/reducer/masterSlice";
import product_category from "@/networks/mutations/admin/product_category/product_category";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export type AdminInitType = {
    dispatch : Dispatch<AnyAction>
}

const adminInit = ({dispatch}:AdminInitType)=>{

  // get category master data for product create and update
  product_category.getProductCategory("")
  .then((ans)=>{
    localStorage.setItem("categories", JSON.stringify(ans.data));
    dispatch(setCategoryLists(ans.data));
  })
  .catch((err)=>{
    console.log(err)
  });
}
export default adminInit;