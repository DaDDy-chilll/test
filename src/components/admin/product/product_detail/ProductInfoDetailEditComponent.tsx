import DialogBox from "@/components/DialogBox";
import InputBoxComponent from "@/components/InputBoxComponent";
import SizeBox from "@/components/SizeBox";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import SwitchComponet from "@/components/SwitchComponent";
import { UpdateProductMode1Props, UpdateProductRes } from "@/networks/mutations/admin/product/update";
import { Product } from "@/types/product/product";

interface SubCategory {
  product_sub_category_id: number;
  name: string;
}

interface Category {
  product_category_id: number;
  product_category_name: string;
  product_sub_category: Array<SubCategory>;
}

interface ProductInfoProps {
  openInfoDetailDialog: boolean;
  setOpenInfoDetailDialog: Dispatch<SetStateAction<boolean>>;
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>
  categories: Array<Category>;
  updateProductAction: ({ product_id, productPayload, }: UpdateProductMode1Props) => Promise<UpdateProductRes>
}
 
const ProductInfoDetailEditComponent = ({
  openInfoDetailDialog,
  setOpenInfoDetailDialog,
  product,
  setProduct,
  categories,
  updateProductAction
}: ProductInfoProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };

  const [productName, setProductName] = useState<string>(product?.product_name);
  const [productNameKana, setProductNameKana] = useState<string>(product?.product_name_kana);
  const [productTitle, setProductTitle] = useState<string>(product?.title);
  const [productCode, setProductCode] = useState<string>(product?.product_code);
  const [productBikou, setProductBikou] = useState<string>(product?.bikou);
  /* status */
  const [pub, setPub] = useState<number>(product?.status); // AKMA

  const [productNameErr, setProductNameErr] = useState<string>("");
  const [productNameKanaErr, setProductNameKanaErr] = useState<string>("");
  const [productTitleErr, setProductTitleErr] = useState<string>("");
  const [productCodeErr, setProductCodeErr] = useState<string>("");
  const [remarksError, setremarksError] = useState<string>("");


  const [category, setCategory] = useState<AutoCompleteData>();
  const [subCategory, setSubCategory] = useState<AutoCompleteData>();

  const [categoryData] = useState<Array<AutoCompleteData>>(categories.map(({product_category_id,product_category_name})=>({label: product_category_name,value: product_category_id})));
  const [subCategoryData, setSubCategoryData] = useState<Array<AutoCompleteData>>([]);

  
  // const keydownListener = (event: KeyboardEvent)=>{
  //   // do action
  //   if(event.key === "Enter") {
  //     if(openInfoDetailDialog){
  //       updateAction();
  //     }
      
  //   }
  // }

  useEffect(() => {
    if(categoryData && !category){
      const [category] = categoryData.filter(({label})=>label===product.product_category_name);
      if(category){
        setCategory(category);
        //console.log(categories);
        const [masterCategory] = categories.filter(({product_category_id})=>product_category_id === category.value);
        if(masterCategory.product_sub_category.length){
          const subCategoryData = masterCategory.product_sub_category.map(({product_sub_category_id,name})=>({label: name,value: product_sub_category_id}));
          setSubCategoryData(subCategoryData);
          const [subCategory] = subCategoryData.filter(({value})=>product.product_subcategory_id===value);
          subCategory && setSubCategory(subCategory);
        }
      }
    }

    // if(openInfoDetailDialog) {
    //   // add listener
    //   window.addEventListener("keydown",keydownListener)
    // }

    // return ()=>{
    //   // remove listener
    //   window.removeEventListener("keydown",keydownListener);
    // }
  },[openInfoDetailDialog]);

  
  const clearAction = () => {
    setProductName(product.product_name);;
    setProductNameKana(product.product_name_kana);
    setProductTitle(product.title);
    setProductCode(product.product_code);
    setPub(product.status);
    setProductBikou(product.bikou);
    setProductNameErr("");
    setProductNameKanaErr("");
    setProductCodeErr("");
    setProductTitleErr("");
    setremarksError("");
  };

  const updateAction = () => {
    updateProductAction({product_id: product.product_id,
      productPayload: {
        product_subcategory_id:subCategory?.value?subCategory.value:0,
        product_name: productName,
        bikou: productBikou,
        product_code: productCode,
        title: productTitle,
        status: pub,
        product_name_kana: productNameKana,
        mode: 1,
      }}
    ).then((updateProduct)=>{
      // setProductNameErr("");
      // setProductNameKanaErr("");
      // setProductCodeErr("");
      // setProductTitleErr("");
      // setremarksError("");
      setOpenInfoDetailDialog(false);
      setProduct({...product,
        product_name: updateProduct.data.product_name,
        bikou: updateProduct.data.bikou,
        product_code: updateProduct.data.product_code,
        title: updateProduct.data.title,
        status: updateProduct.data.status,
        product_name_kana: updateProduct.data.product_name_kana,
        product_subcategory_id: updateProduct.data.product_subcategory_id,
        product_category_name: updateProduct.data.product_category_name,
        product_subcategory_name: updateProduct.data.product_subcategory_name
      });
      
    })
    .catch((err)=>{
      if(err.errors){
        setProductNameErr(err.errors?.product_name);
        setProductNameKanaErr(err.errors?.product_name_kana);
        setProductCodeErr(err.errors?.product_code);
        setProductTitleErr(err.errors?.title);
        setremarksError(err.errors?.bikou);
      }
      //setProductNameErr(err);
    })
  };

  return (
    <DialogBox
      size="lg"
      open={openInfoDetailDialog}
      setOpen={setOpenInfoDetailDialog}
      clearAction={clearAction}
    >
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            商品情報変更
          </div>
          <div
            onClick={() => {
              clearAction();
              setOpenInfoDetailDialog(false);
            }}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[30px] py-[40px] flex flex-col space-y-1">
          <div className="flex flex-row">
            <InputBoxComponent
              error={productNameErr}
              className="flex-1 bg-bgcolor"
              value={productName}  // TODO: set name
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              label="商品名"
            />

            <SizeBox w={50} />

            <InputBoxComponent
              error={productNameKanaErr}
              value={productNameKana}
              label="商品名(カナ)"
              onChange={(e) => {
                setProductNameKana(e.target.value);
              }}
            />
          </div>
          <SizeBox h={15} />

          <div className="flex flex-row">
            <InputBoxComponent
              error={productTitleErr}
              value={productTitle}
              label="商品名タイトル"
              onChange={(e) => {
                setProductTitle(e.target.value);
              }}
            />
            <SizeBox w={50} />
            <InputBoxComponent
              error={productCodeErr}
              value={productCode}
              label="商品コード"
              onChange={(e) => {
                setProductCode(e.target.value);
              }}
            />
          </div>

          <SizeBox h={15} />

          <div className="flex flex-row">
            {/* 商品カテゴリ */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              // value={categoryData.filter(({label})=>label===product?.product_category_name)[0]}   // AKMA: Pre Asign
              value={category}
              onChange={(_,value)=>{
                if(value){
                  setCategory(value);
                  const [masterCategory] = categories.filter(({product_category_id})=>product_category_id === value.value);
                  if(masterCategory.product_sub_category.length){
                    const subCategoryData = masterCategory.product_sub_category.map(({product_sub_category_id,name})=>({label: name,value: product_sub_category_id}));
                    setSubCategoryData(subCategoryData);
                    const [newSubCategory] = subCategoryData.filter(({value})=>subCategory?.value===value);
                    if(newSubCategory){
                      setSubCategory(newSubCategory);
                    }else{
                      setSubCategory({value: 0,label: ''});
                    }
                  }
                }
              }}
              options={categoryData}
              renderInput={(params) => (
                <TextField {...params} label="商品カテゴリ" />
              )}
              className="flex-1 bg-bgcolor"
            />

            <SizeBox w={50} />
            {/* サブカテゴリ */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(_, value) => {
                value && setSubCategory(value);
              }}
              options={subCategoryData}
              // value={subCategoryData.filter(({value})=>value===product?.product_subcategory_id)[0]}   // AKMA: Pre Asign
              value={subCategory}
              renderInput={(params) => (
                <TextField {...params} label="サブカテゴリ" />
              )}
              className="flex-1 bg-bgcolor"
            />
          </div>
          <SizeBox h={20} />

          {/* Switch */}
          <SwitchComponet
            value={pub===1}
            setValue={(newValue: boolean) => {
              setPub(newValue?1:-1);
              console.log(newValue?1:-1);
              console.log(newValue);
            }}
            leftSide="非公開"
            rightSide="公開"
          />

          <SizeBox h={20} />
          <div className="flex flex-row">
            <InputBoxComponent
              error={remarksError}
              value={productBikou}
              label="商品名"
              multiline={5}
              onChange={(e) => {
                setProductBikou(e.target.value);
              }}
            />
          </div>

          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={updateAction} variant="contained">
            OK
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default ProductInfoDetailEditComponent;
