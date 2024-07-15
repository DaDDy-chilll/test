import Helper from "@/helpers";
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";

interface ProductSetCardProps {
    productId: number;
    image: string;
    title: string;
    productBgColor:string;
}

const ProductSetCardComponent = ({productId,image,title,productBgColor}:ProductSetCardProps)=>{  
    const navigate = useNavigate();

    const productDetailAction = ()=>{
        Helper.navigate({navigate,path: routes.USER.PRODUCT_DETAIL,state: {productId}})
    }

    return <Card key={Math.random()} onClick={productDetailAction} className={`${productBgColor} mt-[30px] pb-[30px] mx-[20px] nav`}>
        {/* Image */}
        <div className=""><img src={image} className="px-[20px] py-[30px] h-[250px] w-fit"/></div>

        {/* Title */}
        <div className="text-center">{title}</div>    
        </Card>
}

export default ProductSetCardComponent;