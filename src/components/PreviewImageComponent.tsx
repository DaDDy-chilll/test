import FileUpload from "@/assets/admin/file_upload.png";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

type PreviewImageComponentProps = {
  files: Array<ProductPhoto>;
  setFiles: Dispatch<SetStateAction<Array<ProductPhoto>>>;
};

export type ProductPhoto = {
  id: string | number;
  file?: File;
  mainPhoto: boolean;
  tempUrl: string;
}

const PreviewImageComponent = ({ setFiles,files }: PreviewImageComponentProps) => {
  // const [productPhotos,setProductPhotos] = useState<Array<ProductPhoto>>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files.length > 0) {
      let temp: Array<ProductPhoto> = [];
      for (let i = 0; i < e.target.files.length; i++) {
        temp = [...temp,{
          id: Math.random().toString(),
          file: e.target.files[i],
          mainPhoto: i===0,
          tempUrl: URL.createObjectURL(e.target.files[i]),
        }]
      }
      setFiles(temp);
    }
  };

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
      setFiles([...files,...temp]);
    }
  }

  const removePhoto = (deleteId: number| string)=>{
    const updated = files.filter(({id})=>id!=deleteId);
    setFiles(updated);
  }

  const setMainPhoto = (updateId: number | string) =>{
    const updated = files.map((photo)=>{
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
    setFiles(updated);
  }

  interface renderPhotoProps {
    id: number | string;
    tempUrl: string;
    mainPhoto: boolean;

  }
  const renderPhoto = ({id,tempUrl,mainPhoto}:renderPhotoProps,index: number)=>{
    return (
      <div className="w-full mb-4 bg-[#D9D9D9] rounded-md relative" key={index}>
        <img
          src={tempUrl !== "" ? tempUrl : FileUpload}
          className="bg-cover object-cover w-full h-full rounded-md"
        />
        <div onClick={()=>removePhoto(id)} className="btn absolute right-0 top-[0px] bg-red-500 text-white text-[25px] rounded-full w-[35px] h-[35px] flex flex-col justify-center items-center">
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

  return (
    <label
      htmlFor="previewImage"
      className={`${
        files.length > 0
          ? "grid grid-cols-5 gap-8"
          : "flex justify-center items-center"
      } p-4 pb-6  bg-bgcolor border-[1px] border-[#D9D9D9] rounded-[5px] cursor-pointer overflow-x-auto`}
    >
      {files.length > 0 ? (
        <>
        {
          files?.map(({tempUrl,id,mainPhoto}, index) => {
            return renderPhoto({id,tempUrl,mainPhoto},index);
          })
        }

        {/* Add New Photo */}
        <label htmlFor="addImage" className="btn w-full my-4 bg-[#D9D9D9] rounded-md flex flex-col justify-center items-center">
            <AddIcon fontSize="large"/>
            <input
              type="file"
              className="hidden"
              id="addImage"
              onChange={addPhotoHandler}
              multiple
              accept=".png, .jpg, .jpeg"
            />
        </label>
        </>
      ) : (
        <div className="w-full h-[200px] flex justify-center items-center">
          <img src={FileUpload} alt="Fileupload png" width={100} height={100} />
        </div>
      )}
      <input
        type="file"
        disabled={files.length>0}
        className="hidden"
        id="previewImage"
        onChange={handleChange}
        multiple
        accept=".png, .jpg, .jpeg"
      />
    </label>
  );
};

export default PreviewImageComponent;
