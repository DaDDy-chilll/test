import SizeBox from "@/components/SizeBox";
import { ProductDescription } from "@/types/product/product_explain";
import { Card } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import InsertDescriptionComponent from "./product_description/InsertDescriptionComponent";
interface ProductDescriptionComponentProps {
  description : Array<ProductDescription>;
  setDescription: Dispatch<SetStateAction<Array<ProductDescription>>>;
}

const ProductDescriptionComponent = ({
  description,
  setDescription,
}: ProductDescriptionComponentProps) => {
  
  /* Sector For Edit index */
  const [sector,setSector] = useState<number>(-1);

  const deleteDescription = (index: number)=>{
    const updated = description.filter(({},x)=>x!==index);
    setDescription(updated);
  }

  const editDescription = (index: number)=>{
    // move scroll y edit
    setSector(index);
  }

  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div className="text-textBlue text-[20px] font-semibold">商品説明</div>
      <SizeBox h={20} />

      <div className="">
        <div className="text-[30px] font-bold">Preview</div>
        {
          description.map((d,i)=>{
            return (
              <div key={Math.random()} className="relative">
                <div className="absolute right-0 top-[5px]">
                  <div className="flex flex-row">
                    <div onClick={()=>editDescription(i)} className="nav">
                      {/* <EditIcon color="info"/> */}
                    </div>
                    <SizeBox w={5}/>
                    <div onClick={()=>deleteDescription(i)} className="nav">
                      {/* <DeleteIcon color="error"/> */}
                    </div>
                  </div>
                </div>
                <div className=" border-b-[0.5px] border-gray-400 my-[20px]"></div>
                {d.mainTitle && <div className="text-[30px] font-bold py-[10px]" >{d.mainTitle}</div>}
                
                {d.contents.map((c)=>{
                  return (
                    <div key={Math.random()}  className="py-[20px]">
                        <div className="text-[20px] font-bold py-[8px]">{c.subTitle}</div>
                          <div>
                            {
                              c.sentences.map((s)=>{
                                return <div key={Math.random()} className={` text-[16px] leading-loose`}>                              
                                    {s}
                                </div>
                              })
                            }
                          </div>
                          
                    </div>
                  )
                })}
              </div>
            )
          })        
        }
         {/* <SizeBox h={50} /> */}
        <InsertDescriptionComponent
          description={description}
          setDescription={setDescription}
          sector={sector}
          setSector={setSector}
        />
      </div>
    </Card>
  );
};

export default ProductDescriptionComponent;
