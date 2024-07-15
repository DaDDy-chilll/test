import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import routes from "@/navigations/routes";
import { ProductsDataTypes } from "@/components/user/top_page/NanoProductComponent";
import { useEffect, useState } from "react";
import Helper from "@/helpers";
import { useNavigate } from "react-router-dom";
import aws from "@/aws";
import UserLayout from "../UserLayout";

const ProductScreen = ({ mutations, loginUser, changeLoginUserAction }: GlobalProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<ProductsDataTypes>>([]);

  const detailAction = (product: ProductsDataTypes) => {
    Helper.navigate({
      navigate,
      path: routes.USER.PRODUCT_DETAIL,
      state: { product, products },
    });
  };

  const getProducts = () => {
    mutations.pub.product
      .get()
      .then((ans) => {
        if (ans.data) {
          console.log(ans.data);

          if (ans.data.length > 0) {
            const transformedData: ProductsDataTypes[] = ans.data?.map(
              (product, index) => ({
                index: index,
                product_id: product.product_id,
                product_name: product.product_name,
                product_name_kana: product.product_name_kana,
                title: product.title.toString(),
                product_code: product.product_code,
                product_category_name: product?.product_category_name,
                product_subcategory_name: product?.product_subcategory_name,
                buy_price: product.buy_price,
                buy_tax: product.buy_tax,
                tax: product.tax,
                expense: product.expense,
                price: product.price,
                status: product.status,
                subscribe_status: product.subscribe_status,
                product_photos: product.product_photos,
                bikou: product.bikou,
                description: product.description,
                discount: product.discount,
                max_sell_amt: product.max_sell_amt,
                min_sell_amt: product.min_sell_amt,
                safe_stock_amt: product.safe_stock_amt,
              })
            );
            setProducts(transformedData);
          } else {
            setProducts([]);
          }
        } else {
          console.log(ans.errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculatePriceWithDiscount = (
    amount: number,
    discount: number,
    tax: number
  ) => {
    const priceWithTax = amount + Math.floor(amount * (tax / 100));
    const priceWithDiscount = Math.floor(priceWithTax * (1 - discount / 100));

    return priceWithDiscount;
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout activeNumber={1} loginUser={loginUser} changeLoginUserAction={changeLoginUserAction}>
      <div className="container mx-auto py-20">
        <div className="space-y-4 mb-10">
          <p className="tracking-widest uppercase text-lg font-semibold">
            All Products
          </p>
          <p className="text-xs">商品一覧</p>
        </div>

        <div className="grid grid-cols-3 gap-[20px]">
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
                  className={`mb-[30px] cursor-pointer hover:shadow-xl transition-all duration-100 bg-[#2E9648] bg-opacity-10`}
                >
                  <div
                    className={`p-[25px] h-[260px] bg-[#F8F7EE] flex justify-center items-center`}
                  >
                    <img
                      src={aws.s3.getUrl({ key: product_photos[0]?.img_url })}
                      className="h-[160px] bg-cover object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="text-[14px] pt-[20px] px-[30px] opacity-70">
                      {title}
                    </div>
                    <div className="text-[16px] pt-[10px] px-[30px] font-semibold">
                      {product_name}
                    </div>
                    <SizeBox h={12} />
                    <div className="flex items-center space-x-3">
                      <div
                        className={`text-[14px] opacity-70 pl-[30px] ${
                          discount !== 0 && "line-through"
                        }`}
                      >
                        {Helper.japaneseNumberFormat({
                          number: price + Math.round(price * (tax / 100)),
                        })}{" "}
                        <span className="text-[12px] font-medium -ml-[8px]">
                          （税込）
                        </span>
                      </div>
                      {discount !== 0 && (
                        <div
                          className={`text-[14px] font-bold text-red-500`}
                        >
                          {Helper.japaneseNumberFormat({
                            number: calculatePriceWithDiscount(
                              price,
                              discount,
                              tax
                            ),
                          })}{" "}
                          <span className="text-[12px] font-medium -ml-[8px]">
                            （税込）{discount + "% Off"}
                          </span>
                        </div>
                      )}
                    </div>

                    <SizeBox h={20} />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </UserLayout>
  );
};

{
  /* <div className="container mx-auto">
        <SubNavbarComponent text="製品一覧" subNavItems={subNavItems} />
        <SizeBox h={20} />
        <div className="grid grid-cols-3 gap-[20px]">
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
                <Card
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
                  className={`mb-[30px] nav `}
                >
                  <div className={`p-[25px] h-[300px]`}>
                    <img
                      src={aws.s3.getUrl({ key: product_photos[0]?.img_url })}
                      className="w-full h-full bg-cover object-cover"
                    />
                  </div>

                  <div className="text-[14px] font-bold pt-[15px] px-[30px]">
                    {title}
                  </div>
                  <SizeBox h={20} />
                  <div className="flex flex-row items-center">
                    <div
                      className={`flex-1 text-[20px] font-bold pl-[30px] ${
                        discount !== 0 && "text-xs line-through"
                      }`}
                    >
                      {Helper.japaneseNumberFormat({
                        number: price + Math.round(price * (tax / 100)),
                      })}{" "}
                      <span className="text-[12px] font-medium -ml-[8px]">
                        （税込）
                      </span>
                    </div>
                    <div className="flex flex-row justify-center items-center border-[1px] border-[#000] rounded-full w-[30px] h-[30px] mr-[30px]">
                      <ArrowForwardIosIcon style={{ width: 15, height: 15 }} />
                    </div>
                  </div>
                  {discount !== 0 && (
                    <div
                      className={`flex-1 text-[20px] font-bold pl-[30px] text-red-500`}
                    >
                      {Helper.japaneseNumberFormat({
                        number: calculatePriceWithDiscount(
                          price,
                          discount,
                          tax
                        ),
                      })}{" "}
                      <span className="text-[12px] font-medium -ml-[8px]">
                        （税込）{discount + "% Off"}
                      </span>
                    </div>
                  )}
                  <SizeBox h={40} />
                </Card>
              );
            }
          )}
        </div>
      </div> */
}
export default ProductScreen;
