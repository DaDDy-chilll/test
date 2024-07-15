import { ProductsDataTypes } from "./NanoProductComponent";
import ProductBag from "@/assets/user/top_page/productBag.png";
import SizeBox from "@/components/SizeBox";
import aws from "@/aws";
import IndicatorLeftAndRight from "@/assets/user/top_page/IndicatorLeftAndRight.png";
import { MutableRefObject, useRef, useState } from "react";
import Helper from "@/helpers";
import routes from "@/navigations/routes";
import { useNavigate } from "react-router-dom";

interface ProductsSliderComponentProps {
  products: Array<ProductsDataTypes>;
}

const ProductsSliderComponent = ({
  products,
}: ProductsSliderComponentProps) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleToScroll = (scrollAmount: number) => {
    const newScrollPostion = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPostion);

    if (containerRef.current) {
      containerRef.current.scrollLeft = newScrollPostion;
    }
  };

  const detailAction = (product: ProductsDataTypes) => {
    Helper.navigate({
      navigate,
      path: routes.USER.PRODUCT_DETAIL,
      state: { product, products },
    });
  };
  return (
    <div className=" bg-white w-screen h-[90vh] flex flex-col items-center justify-center space-y-4 text-xs relative">
      <p className="text-xl font-bold text-primaryColor uppercase">Products</p>
      <img src={ProductBag} alt="Purpose Icon" className="w-[40px]" />
      <p className="text-primaryColor">それらは何よりも大事</p>
      <SizeBox h={40} />

      <div className="relative w-full px-24 flex">
        <button
          onClick={() => handleToScroll(-200)}
          className="absolute left-20 top-1/2 -translate-y-1/2"
        >
          <img src={IndicatorLeftAndRight} alt="Left Key" className="w-20" />
        </button>

        <div
          ref={containerRef}
          className="flex space-x-8 w-full overflow-x-hidden scroll-smooth px-20"
        >
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
                  className="cursor-pointer rounded-3xl p-12 bg-secondaryBackgroundColor text-center space-y-6 hover:shadow-lg duration-100 transition-all"
                >
                  <div className="w-full h-[200px]">
                    <img
                      src={aws.s3.getUrl({ key: product_photos[0].img_url })}
                      className="w-full h-full bg-cover object-cover"
                    />
                  </div>

                  <p className="font-bold">{product_name}</p>
                </div>
              );
            }
          )}
        </div>

        <button
          onClick={() => handleToScroll(200)}
          className="absolute right-20 top-1/2 -translate-y-1/2"
        >
          <img
            src={IndicatorLeftAndRight}
            alt="Right Key"
            className="w-20 rotate-180"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductsSliderComponent;
