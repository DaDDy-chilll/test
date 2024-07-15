import SizeBox from "@/components/SizeBox";
import { UpdateProductMode4Props, UpdateProductRes } from "@/networks/mutations/admin/product/update";
import { Product } from "@/types/product/product";
import { ProductDescription } from "@/types/product/product_explain";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import InsertDescriptionComponent from "./product_description/InsertDescriptionComponent";

interface ProductDescriptionComponentProps {
  description : Array<ProductDescription>;
  setDescription: Dispatch<SetStateAction<Array<ProductDescription>>>;
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
  updateProductAction: ({ product_id, productPayload, }: UpdateProductMode4Props) => Promise<UpdateProductRes>

} 

const ProductDescriptionEditComponent = ({
  description,
  setDescription,
  updateProductAction,
  product,
  setProduct
}: ProductDescriptionComponentProps) => {

  /* Edit Main Action */
  const [onEdit, setOnEdit] = useState<boolean>(false);

  /* Sector For Edit index */
  const [sector,setSector] = useState<number>(-1);

  /* For Scroll Afer Each Edit Finsh */
  // const [editElementY,setEditElementY] = useState<number>(-1);
  const divRef = useRef<HTMLDivElement>(null);
//product.description
  const [productDescript, setProductDescript] = useState<Array<ProductDescription>>(description);
  // const [cancel,setCancel] = useState<boolean>(false);
  const [productDescriptErr, setProductDescriptErr] = useState<string>("");

  const cancelEditAction = ()=>{
    setOnEdit(false);
    setProductDescript(description);
  }

  const deleteDescription = (index: number)=>{
    const updated = description.filter(({},x)=>x!==index);
    setProductDescript(updated);
  }

  const editDescription = (index: number)=>{
    setSector(index);
    // register current scroll Y
    // setEditElementY(window.scrollY);
  }

  const onSaveDescription = ()=>{
    // window.scrollTo(0,editElementY);
    if(divRef.current){
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // alert(editElementY);
  }

  const moveUp = (index: number)=>{
    // assume index = 3
    // if i = index-1 => set( index )
    // if i = index => set ( index -1 )
    if(index>0){
      let updated: Array<ProductDescription> = [];
      productDescript.map((desc,i)=>{
        // before current
        if(i === index-1){
          updated = [...updated,productDescript[index] ];
        }else if(i===index) {// current
          updated = [...updated,productDescript[index-1] ];
        }else{
          updated = [...updated,desc ];
        }
      })
      setProductDescript(updated);
    }
  }

  const moveDown = (index: number)=>{
    let updated: Array<ProductDescription> = [];
    if(index < productDescript.length-1){
      productDescript.map((desc,i)=>{
        // before current
        if(i === index){
          updated = [...updated,productDescript[index + 1] ];
        }else if(i===index+1) {// current
          updated = [...updated,productDescript[index] ];
        }else{
          updated = [...updated,desc ];
        }
      })
      setProductDescript(updated);
    }
  }

  const updateAction = () => {
    setOnEdit(false);
    console.log(productDescript);
    updateProductAction({product_id: product.product_id,
      productPayload: {
        description: productDescript.length>0? JSON.stringify(productDescript):"[]" ,
        mode: 4,
      }}
      ).then((updatedProduct)=>{
        setProductDescript(JSON.parse(updatedProduct.data.description));
        setDescription(JSON.parse(updatedProduct.data.description));
    })
    .catch((err)=>{
      if(err.errors){
       setProductDescriptErr(err.errors.description)
      }
    })
   
  };

  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      {/* Title */}
      <div ref={divRef} className="w-full flex justify-between">
        <p className="text-textBlue text-[20px] font-semibold">商品説明</p>
        {
          onEdit?
          <div className="flex flex-row justify-between">
            <Button onClick={cancelEditAction} variant="contained" color="error">Cancel</Button>
            <SizeBox w={10}/>
            <Button onClick={updateAction} variant="contained">保存</Button>
          </div>
          :<div onClick={()=>setOnEdit(true)}>
            <EditIcon
              className="opacity-80 cursor-pointer"
            />
          </div>　
        
        }
      </div>
      <SizeBox h={20} />

      <div className="">
        <div className="text-[30px] font-bold">Preview</div>
        {
          productDescript.map((d,i)=>{
            return (
              <div key={Math.random()} className="relative">
                {/* Absolute Edit And Delete Icon */}
                <div className="absolute right-0 top-[5px]">
                  {
                    onEdit && <div className="flex flex-row">
                      <div className="flex flex-col">
                        {
                          //i>0 &&
                          <div onClick={()=>moveUp(i)} className={` ${i>0?"bg-gray-200": "bg-gray-200 opacity-50 cursor-not-allowed" }  flex flex-row items-center justify-center w-[40px] h-[15px] nav`}>
                            <ArrowDropUpIcon fontSize="large"/>
                          </div>
                        }
                        <SizeBox h={10}/>
                        {
                          // &&
                          <div onClick={()=>moveDown(i)} className={`${i == productDescript.length - 1? "bg-gray-200 opacity-50 cursor-not-allowed":"bg-gray-200" } bg-gray-200 flex flex-row items-center justify-center w-[40px] h-[15px] nav`}>
                            <ArrowDropDownIcon fontSize="large"/>
                          </div>
                        }
                      </div>
                      <SizeBox w={5}/>
                      <div onClick={()=>editDescription(i)} className="nav">
                        <EditIcon color="info"/>
                      </div>
                      <SizeBox w={5}/>
                      <div onClick={()=>deleteDescription(i)} className="nav">
                        <DeleteIcon color="error"/>
                      </div>
                    </div>
                  }
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
        {onEdit && <InsertDescriptionComponent
          description={productDescript}
          setDescription={setProductDescript}
          sector={sector}
          setSector={setSector}
          onSaveDescription={onSaveDescription}
        />}        
      </div>
    </Card>
  );
};

export default ProductDescriptionEditComponent;
