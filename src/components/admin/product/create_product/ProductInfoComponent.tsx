import InputBoxComponent from "@/components/InputBoxComponent";
import SizeBox from "@/components/SizeBox";
import SwitchComponet from "@/components/SwitchComponent";
import { ProductInfoDataTypes } from "@/screens/admin/product/CreateProductScreen";
import { Autocomplete } from "@mui/material";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SubCategory {
  product_sub_category_id: number;
  name: string;
}

interface Category {
  product_category_id: number;
  product_category_name: string;
  product_sub_category: Array<SubCategory>;
}

type ProductInfoComponentProps = {
  productInfo: ProductInfoDataTypes;
  setProductInfo: Dispatch<SetStateAction<ProductInfoDataTypes>>;
  categories: Array<Category>;
};

const ProductInfoComponent = ({
  productInfo,
  setProductInfo,
  categories,
}: ProductInfoComponentProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };

  // AutoComplete
  const [categoryId, setCateogryId] = useState<AutoCompleteData | undefined>();
  const [subCategoryId, setSubCateogryId] = useState<
    AutoCompleteData | undefined
  >();

  // Data
  const [subCategoryData, setSubCategoryData] = useState<
    Array<AutoCompleteData>
  >([]);

  useEffect(() => {
    if (categoryId && subCategoryData.length === 0) {
      setSubCategoryData(
        categories
          .filter(({ product_category_id: id }) => id === categoryId.value)[0]
          .product_sub_category.map(
            ({ product_sub_category_id: id, name }) => ({
              value: id,
              label: name,
            })
          )
      );
    }
  });

  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="text-textBlue text-[20px] font-semibold">商品情報</div>
      <SizeBox h={20} />
      {/* Input Field */}
      <div className="flex flex-row">
        <InputBoxComponent
          value={productInfo.productName}
          onChange={(e) =>
            setProductInfo((prevProductInfo) => ({
              ...prevProductInfo,
              productName: e.target.value,
            }))
          }
          label="商品名"
          error={productInfo.productNameError}
        />
        <SizeBox w={50} />
        <InputBoxComponent
          value={productInfo.productNameKana}
          onChange={(e) =>
            setProductInfo((prevProductInfo) => ({
              ...prevProductInfo,
              productNameKana: e.target.value,
            }))
          }
          label="商品名（カナ）"
          error={productInfo.productNameKanaError}
        />
      </div>
      <SizeBox h={15} />
      <div className="flex flex-row">
        <InputBoxComponent
          value={productInfo.productTitle}
          onChange={(e) =>
            setProductInfo((prevProductInfo) => ({
              ...prevProductInfo,
              productTitle: e.target.value,
            }))
          }
          label="商品名タイトル"
          error={productInfo.productTitleError}
        />
        <SizeBox w={50} />
        <InputBoxComponent
          value={productInfo.productCode}
          onChange={(e) =>
            setProductInfo((prevProductInfo) => ({
              ...prevProductInfo,
              productCode: e.target.value,
            }))
          }
          label="商品名コード"
          error={productInfo.productCodeError}
        />
      </div>
      <SizeBox h={15} />
      <div className="flex flex-row">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(_, value) => {
            if (value) {
              setCateogryId(value);
              setSubCateogryId(undefined);
              setProductInfo({ ...productInfo, subCategory: 0 });
              setProductInfo({ ...productInfo, category: value.value });
              setSubCategoryData(
                categories
                  .filter(
                    ({ product_category_id: id }) => id === value.value
                  )[0]
                  .product_sub_category.map(
                    ({ product_sub_category_id: id, name }) => ({
                      value: id,
                      label: name,
                    })
                  )
              );
            } else {
              setCateogryId(undefined);
              setProductInfo({ ...productInfo, category: 0 });
              setProductInfo({ ...productInfo, subCategory: 0 });
            }
          }}
          value={categoryId}
          options={categories.map(
            ({ product_category_id: id, product_category_name: name }) => ({
              value: id,
              label: name,
            })
          )}
          //error={productInfo}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                label="商品カテゴリ"
                className=" bg-bgcolor"
              />
              <div className="text-red-600 text-xs p-2 pl-4">
                {productInfo.categroyError}
              </div>
            </>
          )}
          className="flex-1"
        />
        <SizeBox w={50} />
        {
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(_, value) => {
              if (value) {
                setProductInfo({ ...productInfo, subCategory: value.value });
                setSubCateogryId(value);
              } else {
                setSubCateogryId(undefined);
                setProductInfo({ ...productInfo, subCategory: 0 });
              }
            }}
            value={subCategoryId}
            options={subCategoryData}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  label="サブカテゴリ"
                  className="bg-bgcolor"
                />
                <div className="text-red-600 text-xs p-2 pl-4">
                  {productInfo.subCategoryError}
                </div>
              </>
            )}
            className="flex-1 "
          />
        }
      </div>
      <SizeBox h={15} />
      <div className="flex flex-row items-start">
        <InputBoxComponent
          error={productInfo.remarksError}
          value={productInfo.remarks}
          onChange={(e) =>
            setProductInfo((prevProductInfo) => ({
              ...prevProductInfo,
              remarks: e.target.value,
            }))
          }
          label="備考"
          multiline={5}
        />
        <SizeBox w={50} />
        {/* Switch */}
        <SwitchComponet
          value={productInfo.pub}
          setValue={(newValue: boolean) =>
            setProductInfo((prevProductInfo) => ({
              ...prevProductInfo,
              pub: newValue,
            }))
          }
          leftSide="非公開"
          rightSide="公開"
        />
      </div>
    </Card>
  );
};

export default ProductInfoComponent;
