import SizeBox from "@/components/SizeBox";
import { Card } from "@mui/material";
import PreviewImageComponent, { ProductPhoto } from "@/components/PreviewImageComponent";
import { Dispatch, SetStateAction } from "react";

type InsertPhotoComponentProps = {
  files: Array<ProductPhoto>;
  setFiles: Dispatch<SetStateAction<Array<ProductPhoto>>>;
};

const InsertPhotoComponent = ({ setFiles,files }: InsertPhotoComponentProps) => {
  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="text-textBlue text-[20px] font-semibold">商品写真</div>
      <SizeBox h={20} />

      <PreviewImageComponent setFiles={setFiles} files={files} />
    </Card>
  );
};

export default InsertPhotoComponent;
