import SizeBox from "@/components/SizeBox";
import vector from "@/assets/user/top_page/セレン酵母.png";
import AddToCartButtonComponent from "./AddToCartButtonComponent";
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";
import Helper from "@/helpers";

const SubScribeComponent = () => {
  const navigate = useNavigate();

  const productAction = () => {
    Helper.navigate({ navigate, path: routes.USER.PRODUCT });
  };

  return (
    <div className="flex flex-row border-b-[1px] border-[#808080] border-opacity-50">
      <div className="flex-1 flex flex-row justify-center items-center pt-[80px] pb-[70px]">
        <div>
          <div className="text-[16px]">セレン酵母</div>
          <SizeBox h={15} />
          <img src={vector} alt="セレン酵母" className="" />
        </div>
      </div>

      <div className="flex-1 flex flex-row pt-[80px] pb-[70px] justify-center items-center border-x-[1px] border-[#808080] border-opacity-50">
        <div className="text-center">
          <div className="text-[16px]">定期購入なら</div>
          <SizeBox h={15} />
          <div className="text-[30px] font-bold">5% Off + 無料配送</div>
        </div>
      </div>
      <div className="flex-1 flex flex-row pt-[80px] pb-[70px] justify-center items-center">
        <div className="text-center">
          <div className="text-[16px]">1箱あたり 270mg x 30日分</div>
          <SizeBox h={10} />
          <AddToCartButtonComponent title="今すぐ購入" action={productAction} />
        </div>
      </div>
    </div>
  );
};

export default SubScribeComponent;
