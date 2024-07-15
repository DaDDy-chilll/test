import DialogBox from "@/components/DialogBox";
import { Button } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import FileUpload from "@/assets/admin/file_upload.png";
import { Product } from "@/types/product/product";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import aws from "@/aws";
import { ProductPhoto } from "@/components/PreviewImageComponent";
import { UpdateProductMode5Props, UpdateProductRes } from "@/networks/mutations/admin/product/update";
import mutations from "@/networks/mutations";
import { ProductPhotoTempProps } from "@/networks/mutations/admin/product/create";

interface ProductInfoProps {
  openInsertPhotoDetailDialog: boolean;
  setOpenInsertPhotoDetailDialog: Dispatch<SetStateAction<boolean>>;
  onProductRecevied: (product: Product) => void;
  product: Product;
  setProductPhotos: Dispatch<SetStateAction<Array<ProductPhoto>>>;
  productPhotos: Array<ProductPhoto>;
  updateProductAction: ({ product_id, productPayload, }: UpdateProductMode5Props) => Promise<UpdateProductRes>
}
const ProductInsertPhotoDetailEditComponent = ({
  openInsertPhotoDetailDialog,
  setOpenInsertPhotoDetailDialog,
  productPhotos,
  updateProductAction,
  product,
  setProductPhotos
}: ProductInfoProps) => {
  
  const [photos,setPhotos] = useState<Array<ProductPhoto>>(productPhotos);

  const [errorMsg,setErrorMsg] = useState<string>("");

  interface renderPhotoProps {
    id:number| string;
    tempUrl: string;
    mainPhoto: boolean;
  }
  const renderPhoto = ({id,tempUrl,mainPhoto}:renderPhotoProps,index: number)=>{
    return (
      <div className={`w-full mb-4 bg-[#D9D9D9] rounded-md relative`} key={index}>
        {
          typeof id === 'number'?
          <img src={aws.s3.getUrl({key:tempUrl})} className=" bg-bgcolor w-[400px] h-full" />
          : 
          <img src={tempUrl} className=" bg-bgcolor w-[400px] h-full" />
        }
        {/* <img
          src={tempUrl !== "" ? aws.s3.getUrl({key:tempUrl}) : FileUpload}
          className="bg-cover object-cover w-full h-full rounded-md"
        /> */}
        <div onClick={()=>removePhoto(id)} className="btn absolute right-0 top-[0px] bg-red-500 text-white text-[25px] rounded-full w-[30px] h-[30px] flex flex-col justify-center items-center">
          <CloseIcon/>
        </div>
        <div className="flex flex-row mt-[5px]">
          <div onClick={()=> !mainPhoto && setMainPhoto(id) } className="" >
            {
              mainPhoto?
              (<><span className="text-green-500">メイン写真:</span><CheckBoxIcon className="text-green-500 ml-[5px]"/></>)
              : (<><span className="text-gray-600">メイン写真:</span><CheckBoxOutlineBlankIcon className="text-gray-600 ml-[5px]"/></>)
            }
          </div>
        </div>
      </div>
    )
  }

  const setMainPhoto = (updateId: number | string) =>{
    const updated = photos.map((photo)=>{
      if(photo.id == updateId){
        return {
          id: photo.id,
          file: photo.file,
          mainPhoto: true,
          tempUrl: photo.tempUrl,
        }
      }else{
        return {
          id: photo.id,
          file: photo.file,
          mainPhoto: false,
          tempUrl: photo.tempUrl,
        }
      }
    })
    setPhotos(updated);
  }

  const removePhoto = (deletedId:number |string)=>{
    const updatedProductPhotos = photos.filter(({id})=>deletedId !==id);
    setPhotos(updatedProductPhotos);
  }

  const addPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files.length > 0) {
      let temp: Array<ProductPhoto> = [];
      for (let i = 0; i < e.target.files.length; i++) {
        temp = [...temp,{
          id: Math.random().toString(),
          file: e.target.files[i],
          mainPhoto: false,
          tempUrl: URL.createObjectURL(e.target.files[i]),
        }]
      }
      // push new file
     setPhotos([...photos,...temp]);
    }
  }
  
  interface prepareForPhotoUpdateProps {
    requestForPrepare : Array<ProductPhoto>
  }

  const prepareForPhotoUpdate = ({requestForPrepare}:prepareForPhotoUpdateProps):Array<ProductPhotoTempProps>=>{
    const updatedPhotos: Array<ProductPhotoTempProps> =  requestForPrepare.map((photo)=>{
      return {
        product_photo_id: typeof photo.id == 'number' ? photo.id : 0,
        main_photo: photo.mainPhoto ? 1: -1,
        img_url: photo.tempUrl
      };
    });
    return updatedPhotos;
  }

  const updateProductPhoto = (photos:Array<ProductPhotoTempProps>)=>{
    updateProductAction(
      {
        product_id: product.product_id,
        productPayload: {
          mode: 5,
          product_photos: photos
        }
      }
    )
    .then((updatedProduct)=>{
      setOpenInsertPhotoDetailDialog(false);
      const prepareProductPhotos: Array<ProductPhoto> = updatedProduct.data.product_photos.map(({product_photo_id,main_photo,img_url})=>{
        return {
          id: product_photo_id,
          file: undefined,
          mainPhoto: main_photo === 1,
          tempUrl: img_url
        }
      });
      setProductPhotos(prepareProductPhotos);
      setPhotos(prepareProductPhotos);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const updateAction = () => {

    // メイン写真：チェック
    if( photos.filter( ({mainPhoto})=>mainPhoto).length === 0  ){
      setErrorMsg("メイン写真をチェックするのが必要です。");
      return;
    }

    setErrorMsg("");

    // 1. filter new photo
    const uploadPhotosForS3 = photos.filter(({file})=> file );

    const existingPhotos = photos.filter(({id})=> typeof id == "number");
    
    if(uploadPhotosForS3.length>0){
      // 2. upload s3 new photo
      mutations.admin.awsStroageS3.putObjects(uploadPhotosForS3)
      .then((uploadedFiles)=>{
        // 3. conbine only old photo + upload s3 photo (ProductPhoto)
        const bothExistingAndUploaded = [...existingPhotos,...uploadedFiles]
        // 4. prepare ProductPhoto[] to ProductPhotoTempProps[]
        const prepare = prepareForPhotoUpdate({requestForPrepare:bothExistingAndUploaded});
        // 5. updateProductAction >>
        updateProductPhoto(prepare);
      })
    }else{
      // 4. prepare ProductPhoto[] to ProductPhotoTempProps[]
      const prepare = prepareForPhotoUpdate({requestForPrepare:existingPhotos});
      // 5. updateProductAction >>
      updateProductPhoto(prepare);
    }   
    
  };

  const oncloseDialog = ()=>{
    setPhotos(productPhotos);
    setOpenInsertPhotoDetailDialog(false);
  }

  return (
    <DialogBox
      size="lg"
      open={openInsertPhotoDetailDialog}
      setOpen={oncloseDialog}
    >
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row items-center relative px-8">
          <div className="text-[#3083FF] text-[20px] font-semibold">
            商品タグ変更
          </div>
          <div
            onClick={oncloseDialog}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <div className="px-[30px] pt-[10px] pb-[40px] flex flex-col space-y-1 ">
          <label htmlFor="add-image" className="btn flex flex-row items-center justify-center bg-bgcolor border-[1px] border-[#D9D9D9] rounded-[5px] h-[150px]">
            <img src={FileUpload} />
          </label>
          <input 
            type="file"
            className="hidden"
            id="add-image"
            onChange={addPhotoHandler}
            multiple
            accept=".png, .jpg, .jpeg"
          />

          <SizeBox h={20} />

          {/* {productPhotos.length > 0 && <div className="flex flex-row justify-center  h-[250px]">
            <div className="overflow-scroll  p-8 grid grid-cols-5 gap-4  border-[1px] border-[#D9D9D9] rounded-[5px] relative">
            {
            productPhotos.map(({id,tempUrl,mainPhoto})=>renderPhoto({id,tempUrl,mainPhoto}))

            }
            </div>
          
          </div>
          } */}
          {
            errorMsg && <div className="text-red-500">{errorMsg}</div>
          }
          <div className=" flex flex-row items-center">
            <div className={`${photos.length>4 && "overflow-y-scroll h-64"} p-8 grid grid-cols-4 gap-8 rounded-[5px] `}> 
              {
                photos?.map(({id,tempUrl,mainPhoto},index)=>{
                  return renderPhoto({id,tempUrl,mainPhoto},index);
                })
              }
            </div>
          </div>

          <SizeBox h={20} />

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

export default ProductInsertPhotoDetailEditComponent;
