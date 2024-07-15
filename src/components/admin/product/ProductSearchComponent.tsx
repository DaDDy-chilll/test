import DialogBox from "@/components/DialogBox";
import {
  Autocomplete,
  Button,
  Divider,
  Switch,
  TextField,
} from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import InputBoxComponent from "@/components/InputBoxComponent";

interface SubCategory {
  product_sub_category_id: number;
  name: string;
}

interface Category {
  product_category_id: number;
  product_category_name: string;
  product_sub_category: Array<SubCategory>;
}

interface ProductSearchProps {
  categories: Array<Category>;
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setPublicStatusToSearch: Dispatch<SetStateAction<number>>;
  setCategoryToSearch: Dispatch<SetStateAction<string>>;
  setSubCategoryToSearch: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

const ProductSearchComponent = ({
  categories,
  openSearchDialog,
  setOpenSearchDialog,
  searchKeyword,
  setSearchKeyword,
  setPublicStatusToSearch,
  setCategoryToSearch,
  setSubCategoryToSearch,
  onSearch,
}: ProductSearchProps) => {
  const [pub, setPub] = useState(false);

  type AutoCompleteData = {
    label: string;
    value: number;
  };

  // Data
  const [categoryData, setCategoryData] = useState<Array<AutoCompleteData>>([]);
  const [subCategoryData, setSubCategoryData] = useState<
    Array<AutoCompleteData>
  >([]);

  useEffect(() => {
    const tempArray = [];
    const tempSubArray = [];

    for (let index = 0; index < categories.length; index++) {
      tempArray.push({
        label: categories[index].product_category_name,
        value: categories[index].product_category_id,
      });
    }
    setCategoryData(tempArray);

    for (
      let index = 0;
      index < categories[0]?.product_sub_category?.length;
      index++
    ) {
      tempSubArray.push({
        label: categories[0].product_sub_category[index].name,
        value:
          categories[0].product_sub_category[index].product_sub_category_id,
      });
    }

    setSubCategoryData(tempSubArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DialogBox open={openSearchDialog} setOpen={setOpenSearchDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            商品検索
          </div>
          <div
            onClick={() => setOpenSearchDialog(false)}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[50px] py-[20px] flex flex-col">
          <InputBoxComponent
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
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
          <SizeBox h={20} />

          {/* Switch */}
          <div className="flex flex-row items-center">
            <div
              onClick={() => {
                setPub(false);
                setPublicStatusToSearch(0);
              }}
              className="text-[14] mr-[10px] btn"
            >
              非公開
            </div>
            <Switch
              checked={pub}
              onChange={(event) => {
                setPub(event.target.checked);
                if (event.target.checked) {
                  setPublicStatusToSearch(1);
                } else {
                  setPublicStatusToSearch(0);
                }
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <div
              onClick={() => {
                setPub(true);
                setPublicStatusToSearch(1);
              }}
              className="text-[14] ml-[10px] btn"
            >
              公開
            </div>
          </div>
          <SizeBox h={28} />
          {/* Button */}
          <Button
            onClick={() => {
              onSearch();
              setPub(false);
            }}
            variant="contained"
          >
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(ProductSearchComponent);
