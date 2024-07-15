import SizeBox from "@/components/SizeBox";
import Helper from "@/helpers";
import Card from "@mui/material/Card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";

interface ProductCartProps {
  productId: number;
  image: string;
  title: string;
  price: number;
  productBgColor: string;
}

const ProductCartComponent = ({
  productId,
  image,
  title,
  price,
  productBgColor,
}: ProductCartProps) => {
  const navigate = useNavigate();

  const productDetailAction = () => {
    Helper.navigate({
      navigate,
      path: routes.USER.PRODUCT_DETAIL,
      state: { productId },
    });
  };

  return (
    <Card
      key={Math.random()}
      onClick={productDetailAction}
      className={`mb-[30px] nav `}
    >
      {/* Image */}
      <div className={`${productBgColor} p-[25px] h-[200px]`}>
        <img src={image} className="w-full h-full" />
      </div>

      {/* Title */}
      <div className="text-[14px] font-bold pt-[15px] px-[30px]">{title}</div>
      <SizeBox h={20} />
      {/* Price */}
      <div className="flex flex-row items-center pb-[35px]">
        {/* price */}
        <div className="flex-1 text-[20px] font-bold pl-[30px]">
          {Helper.japaneseNumberFormat({ number: price })}{" "}
          <span className="text-[12px] font-medium -ml-[8px]">（税込）</span>
        </div>
        {/* Icon */}
        <div className="flex flex-row justify-center items-center border-[1px] border-[#000] rounded-full w-[30px] h-[30px] mr-[30px]">
          <ArrowForwardIosIcon style={{ width: 15, height: 15 }} />
        </div>
        <SizeBox h={40} />
      </div>
    </Card>
  );
};

export default ProductCartComponent;
