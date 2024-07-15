import SizeBox from "@/components/SizeBox";
import { Card } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import EditIcon from "@mui/icons-material/Edit";
//import product from "@/networks/mutations/admin/product";
import aws from "@/aws";
import { ProductPhoto } from "@/components/PreviewImageComponent";
interface InsertPhotoDetailDialog {
  setOpenInsertPhotoDetailDialog: Dispatch<SetStateAction<boolean>>;
  productPhotos?: Array<ProductPhoto>;
}

const ProductInsertPhotoDetailComponent = ({
  setOpenInsertPhotoDetailDialog,
  productPhotos
}: InsertPhotoDetailDialog) => {

  interface renderPhotoProps {
    tempUrl: string;
    mainPhoto: boolean;
  }
  const renderPhoto = ({tempUrl,mainPhoto}:renderPhotoProps,index: number)=>{
    return (
      <div key={index} className="relative">
        <img key={Math.random()} src={aws.s3.getUrl({key:tempUrl})} className=" bg-bgcolor w-[400px] h-full rounded-[10px]" />
        {
          mainPhoto  && 
          <div className="absolute top-0 right-0 bg-primary font-bold px-[10px] py-1 text-[12px] text-white rounded-tr-[10px] rounded-bl-[10px] drop-shadow-lg">
            メイン写真
          </div> 
        }
      </div>
    )
  }

  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="w-full flex justify-between">
        <p className="text-textBlue text-[20px] font-semibold">商品写真</p>
        <EditIcon
          className="opacity-80 cursor-pointer"
          onClick={() =>
            setOpenInsertPhotoDetailDialog((prev) => (prev = !prev))
          }
        />
      </div>
      <SizeBox h={30} />

      <div className=" flex flex-row items-center">
         <div className=" grid grid-cols-5 gap-8 rounded-[5px] "> 
          {
            productPhotos?.map(({tempUrl,mainPhoto},index)=>{
              return renderPhoto({tempUrl,mainPhoto},index);
            })
          }
        </div>
      </div>
      <SizeBox h={20} />
    </Card>
  );
};

export default ProductInsertPhotoDetailComponent;
