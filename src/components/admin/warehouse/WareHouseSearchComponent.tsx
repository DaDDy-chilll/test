import DialogBox from "@/components/DialogBox";
import {
  Autocomplete,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import InputBoxComponent from "@/components/InputBoxComponent";

interface WarehouseSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  onSearch: () => void;
  categories : Array<Category>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  categoryToSearch: string;
  setCategoryToSearch: Dispatch<SetStateAction<string>>;
  subCategoryToSearch: string;
  setSubCategoryToSearch: Dispatch<SetStateAction<string>>;
}

interface SubCategory {
  product_sub_category_id: number;
  name: string;
}

interface Category {
  product_category_id: number;
  product_category_name: string;
  product_sub_category: Array<SubCategory>;
}

const WareHouseSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  onSearch,
  searchKeyword,
  setSearchKeyword,
  setCategoryToSearch,
  setSubCategoryToSearch,
  categories
}: WarehouseSearchProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };

  const [categoryData, setCategoryData] = useState<Array<AutoCompleteData>>([]);
  const [subCategoryData, setSubCategoryData] = useState<Array<AutoCompleteData>>([]);

  // const keydownListener = (event: KeyboardEvent)=>{
  //   // do action
  //   if(event.key === "Enter") {
  //     onSearch();
  //   }
  // }

  useEffect(() => {
    const tempArray = [];
    const tempSubArray = [];

    //set lable and value for categories
    for (let index = 0; index < categories.length; index++)
    {
      tempArray.push({
        label: categories[index].product_category_name,
        value: categories[index].product_category_id,
      });
    }
    setCategoryData(tempArray);

    //set lable and value for sub categories
    for (let index = 0; index < categories[0].product_sub_category.length; index++) 
    {
      tempSubArray.push({
        label: categories[0].product_sub_category[index].name,
        value:
          categories[0].product_sub_category[index].product_sub_category_id,
      });
    }
    setSubCategoryData(tempSubArray);
    
    // if(openSearchDialog) {
    //   // add listener
    //   window.addEventListener("keydown",keydownListener)
    // }

    // return ()=>{
    //   // remove listener
    //   window.removeEventListener("keydown",keydownListener);
    // }

  }, []);
  // }, [searchKeyword,categoryToSearch,subCategoryToSearch,openSearchDialog]);

  return (
    <DialogBox size="xs" open={openSearchDialog} setOpen={setOpenSearchDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            検索
          </div>
          <div
            onClick={() => setOpenSearchDialog(false)}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[30px] py-[20px] flex flex-col">
          {/* 商品名 / タイトル / コード */}
          <InputBoxComponent
                value={searchKeyword}
                onChange={(event) => {
                  setSearchKeyword(event.target.value);
                }}
              multiline={1}
              label="商品名 / タイトル / コード"
            />
          <SizeBox h={15} />
          {/* 商品カテゴリ */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(_, value) => {
              value && setCategoryToSearch(value.label);

              const tempSubArray = [];
              const filteredCategory = categories.filter(
                (c) => c.product_category_id === value?.value
              );

              if (filteredCategory.length > 0) {
                for (
                  let index = 0;
                  index < filteredCategory[0].product_sub_category.length;
                  index++
                ) {
                  tempSubArray.push({
                    label: filteredCategory[0].product_sub_category[index].name,
                    value:
                      filteredCategory[0].product_sub_category[index]
                        .product_sub_category_id,
                  });
                }

                setSubCategoryData(tempSubArray);
                setSubCategoryToSearch(tempSubArray[0].label);
              } else {
                setSubCategoryData([]);
                setSubCategoryToSearch("");
              }
            }}
            options={categoryData}
            renderInput={(params) => (
              <TextField {...params} label="商品カテゴリ" />
            )}
          />
          <SizeBox h={15} />
          {/* サブカテゴリ */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(_, value) => {
              value && setSubCategoryToSearch(value.label);
            }}
            options={subCategoryData}
            renderInput={(params) => (
              <TextField {...params} label="サブカテゴリ" />
            )}
          />
          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={onSearch} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(WareHouseSearchComponent);
