import { product_category } from "@/types/product/product_category";
import { PayloadAction,  createSlice } from "@reduxjs/toolkit";

export type InitialState = {
    categories: Array<product_category>
}
const initialState: InitialState = {
    categories: JSON.parse(localStorage.getItem("categories") || "[]")
}

export const masterSlice = createSlice({
    name:'master',
    initialState,
    reducers:{
        setCategoryLists:(state,action : PayloadAction<Array<product_category>>)=>{
            state.categories = action.payload;
        }
    }

});

export const { setCategoryLists } = masterSlice.actions;
export default masterSlice.reducer;

