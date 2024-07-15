import { productList } from "@/const/admin/product/product_list";
import ProductSetCardComponent from "../../ProductSetCardComponent";
import { Product } from "@/models/dataModel";

const ProductSet = ()=>{
    return  <div className="bg-white pb-[60px]">
    <div className="text-primary font-bold p-10">商品詳細</div>
    <div className="flex flex-row mx-[60px]">
    {
        productList.map(({productId,productPhoto,productName,productBgColor}: Product)=>{
            return productId!==4 && <ProductSetCardComponent key={productId} productId={productId} title={productName} image={productPhoto[0]} productBgColor={productBgColor} />
        })
    }
</div> 
    </div>
}

export default ProductSet;