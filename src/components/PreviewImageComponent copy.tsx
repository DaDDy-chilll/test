import FileUpload from "@/assets/admin/file_upload.png";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type PreviewImageComponentProps = {
  setFiles: Dispatch<SetStateAction<FileList | null | undefined>>;
};

const PreviewImageComponent = ({ setFiles }: PreviewImageComponentProps) => {
  // for preview purpose
  const [images, setImages] = useState<Array<string>>([]);
  // old state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files.length > 0) {
      const images = [];

      for (let i = 0; i < e.target.files.length; i++) {
        images.push(URL.createObjectURL(e.target.files[i]));
      }
      setImages(images);


      for (let i = 0; i < e.target.files.length; i++) {

      }

      setFiles(e.target.files);
      console.log(e.target.files);
    }
  };
  return (
    <label
      htmlFor="previewImage"
      className={`${
        images.length > 0
          ? "grid grid-cols-4 gap-2"
          : "flex justify-center items-center"
      } p-4  bg-bgcolor border-[1px] border-[#D9D9D9] rounded-[5px] cursor-pointer overflow-x-auto`}
    >
      {images.length > 0 ? (
        images?.map((img, index) => (
          <div className="w-full h-[200px] bg-[#D9D9D9] rounded-md" key={index}>
            <img
              src={img !== "" ? img : FileUpload}
              className="bg-cover object-cover w-full h-full rounded-md"
            />
          </div>
        ))
      ) : (
        <div className="w-full h-[200px] flex justify-center items-center">
          <img src={FileUpload} alt="Fileupload png" width={100} height={100} />
        </div>
      )}
      <input
        type="file"
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
