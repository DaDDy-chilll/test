import InputBoxComponent from "@/components/InputBoxComponent";
import SizeBox from "@/components/SizeBox";
import { TagsDataTypes } from "@/screens/admin/product/CreateProductScreen";
import { Card } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type ProductTagComponentProps = {
  tags: TagsDataTypes;
  setTags: Dispatch<SetStateAction<TagsDataTypes>>;
};

const ProductTagComponent = ({ tags, setTags }: ProductTagComponentProps) => {
  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="text-textBlue text-[20px] font-semibold">商品タグ</div>
      <SizeBox h={20} />
      <div className="flex flex-row items-start">
        <InputBoxComponent
          error={tags.customerSearchTagError}
          value={tags.customerSearchTag}
          onChange={(e) => setTags((prevTags) => ({
            ...prevTags,
            customerSearchTag: e.target.value,
          }))}
          label="顧客検索用タグ"
          multiline={5}
        />
        <SizeBox w={50} />
        <InputBoxComponent
          error={tags.productSearchTagError}
          value={tags.productSearchTag}
          onChange={(e) => setTags((prevTags) => ({
            ...prevTags,
            productSearchTag: e.target.value,
          }))}
          label="商品検索タグ"
          multiline={5}
        />
      </div>
    </Card>
  );
};

export default ProductTagComponent;
