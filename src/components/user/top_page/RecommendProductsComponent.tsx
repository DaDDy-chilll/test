import aws from "@/aws";
import { ProductsDataTypes } from "./NanoProductComponent";
import ThumbUp from "@/assets/user/top_page/thumbUp.png";
import SizeBox from "@/components/SizeBox";
import Helper from "@/helpers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";

interface RecommendProductsComponentProps {
  products: Array<ProductsDataTypes>;
}

const RecommendProductsComponent = ({
  products,
}: RecommendProductsComponentProps) => {
  const navigate = useNavigate();
  const detailAction = (product: ProductsDataTypes) => {
    Helper.navigate({
      navigate,
      path: routes.USER.PRODUCT_DETAIL,
      state: { product, products },
    });
  };
  return (
    <div className="bg-white w-full px-28 py-20">
      <div className="w-full flex flex-col items-center text-primaryColor space-y-3">
        <img src={ThumbUp} alt="Thumb Up logo" className="w-[40px]" />
        <p className="uppercase tracking-widest">Recommend</p>
        <p className="text-3xl font-bold">こんな方にはおすすめ</p>
      </div>
      <SizeBox h={100} />
      <div className="grid grid-cols-3 gap-5">
        {products.map(
          ({
            product_id,
            product_name,
            product_name_kana,
            title,
            product_code,
            product_category_name,
            product_subcategory_name,
            buy_price,
            buy_tax,
            tax,
            expense,
            price,
            status,
            subscribe_status,
            product_photos,
            bikou,
            description,
            discount,
            max_sell_amt,
            min_sell_amt,
            safe_stock_amt,
          }: ProductsDataTypes) => {
            return (
              <div
                key={product_id}
                className="w-[400px] bg-secondaryBackgroundColor space-y-4 relative px-8 py-6 mt-4 mb-20"
              >
                <div className="w-[200px] absolute -top-14 left-8">
                  <img
                    src={aws.s3.getUrl({ key: product_photos[0].img_url })}
                    className="w-full bg-cover object-cover"
                  />
                </div>
                <SizeBox h={70} />
                <p className="font-bold text-primaryColor">{product_name}</p>
                <div className="space-y-6 py-4">
                  <div className="flex space-x-2 items-center">
                    <div className="w-[16px] h-[16px] border-2 border-primaryColor"></div>
                    <p className="w-11/12 text-xs">健康的な生活をご希望の方</p>
                  </div>

                  <div className="flex space-x-2 items-center">
                    <div className="w-[16px] h-[16px] border-2 border-primaryColor"></div>
                    <p className="w-11/12 text-xs">過度の仕事で大変な方</p>
                  </div>

                  <div className="flex space-x-2 items-center">
                    <div className="w-[16px] h-[16px] border-2 border-primaryColor"></div>
                    <p className="w-11/12 text-xs">
                      抗酸化作用により栄養素が必要な方
                    </p>
                  </div>

                  <div className="flex space-x-2 items-center">
                    <div className="w-[16px] h-[16px] border-2 border-primaryColor"></div>
                    <p className="w-11/12 text-xs">
                      多い外部活動量により活性酸素から人体を保護したい方
                    </p>
                  </div>

                  <div className="flex space-x-2 items-center">
                    <div className="w-[16px] h-[16px] border-2 border-primaryColor"></div>
                    <p className="w-11/12 text-xs">過激な運動をよくする方</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const body = {
                      product_id,
                      product_name,
                      product_name_kana,
                      title,
                      product_code,
                      product_category_name,
                      product_subcategory_name,
                      buy_price,
                      buy_tax,
                      tax,
                      expense,
                      price,
                      status,
                      subscribe_status,
                      product_photos,
                      bikou,
                      description,
                      discount,
                      max_sell_amt,
                      min_sell_amt,
                      safe_stock_amt,
                    };
                    detailAction(body);
                  }}
                  className="w-full flex justify-between items-center bg-primaryColor rounded-xl p-2"
                >
                  <p className="font-bold text-white">
                    {Helper.japaneseNumberFormat({ number: +price })}
                  </p>
                  <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white">
                    <ShoppingCartIcon
                      className="text-primaryColor"
                      fontSize="small"
                    />
                  </div>
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default RecommendProductsComponent;
