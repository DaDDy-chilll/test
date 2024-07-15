import SizeBox from "@/components/SizeBox";
import { ProductsDataTypes } from "../top_page/NanoProductComponent";
import aws from "@/aws";
import Helper from "@/helpers";
import routes from "@/navigations/routes";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type OtherProductsComponentProps = {
  products: Array<ProductsDataTypes>;
  nowProduct: ProductsDataTypes;
  setPhotoIndex: Dispatch<SetStateAction<number>>
};

const OtherProductsComponent = ({
  products,
  nowProduct,
  setPhotoIndex
}: OtherProductsComponentProps) => {
  const navigate = useNavigate();

  const detailAction = (product: ProductsDataTypes) => {
    Helper.navigate({
      navigate,
      path: routes.USER.PRODUCT_DETAIL,
      state: { product, products },
    });
  };
  return (
    <div>
      <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
      <SizeBox h={30} />
      <p className="font-semibold text-3xl">Other Products</p>
      <SizeBox h={10} />
      <p className="font-semibold text-lg">その他の商品</p>
      <SizeBox h={30} />

      <div className="grid grid-cols-3 gap-5">
        {products
          .filter((pro) => pro.product_id !== nowProduct.product_id)
          .map(
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
            }: ProductsDataTypes) => (
              <div
                onClick={() => {
                  setPhotoIndex(0)
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
                className="rounded-3xl space-y-6 bg-secondaryBackgroundColor text-center p-12 cursor-pointer transition-all duration-100 hover:shadow-lg"
              >
                <div className="w-full h-[200px] flex justify-center items-center ">
                  <img
                    src={aws.s3.getUrl({
                      key: product_photos[0]?.img_url,
                    })}
                    className="h-[180px] drop-shadow-lg bg-cover object-cover"
                  />
                </div>
                  <p className="font-bold">{product_name}</p>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default OtherProductsComponent;
