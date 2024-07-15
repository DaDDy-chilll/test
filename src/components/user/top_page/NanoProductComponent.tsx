import SizeBox from "@/components/SizeBox";
import AddToCartButtonComponent from "@/components/user/top_page/AddToCartButtonComponent";
import Helper from "@/helpers";
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";
import { MutationType } from "@/networks/mutations";
import { useEffect, useState } from "react";
import aws from "@/aws";

type NanoProductComponentProps = {
  mutations: MutationType;
};

interface ProductPhoto {
  product_id: number;
  product_photo_id: number;
  img_url: string;
  main_photo: number;
  created_at?: string;
  updated_at?: string;
}

export type ProductsDataTypes = {
  index?: number;
  product_id: number;
  product_name: string;
  product_name_kana: string;
  title: string;
  product_code: string | number;
  product_category_name: string;
  product_subcategory_name: string;
  buy_price: number | string;
  buy_tax: number | string;
  tax: number;
  expense: number;
  price: number;
  status: number;
  subscribe_status: number;
  product_photos: Array<ProductPhoto>;
  bikou: string;
  description: string;
  discount: number;
  max_sell_amt: number;
  min_sell_amt: number;
  safe_stock_amt: number;
};

const NanoProductComponent = ({ mutations }: NanoProductComponentProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<ProductsDataTypes>>([]);

  const detailAction = (product: ProductsDataTypes) => {
    Helper.navigate({
      navigate,
      path: routes.USER.PRODUCT_DETAIL,
      state: { product },
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

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-t-[1px] border-[#808080] border-opacity-50">
      <SizeBox h={70} />
      <div className="flex flex-row text-[30px] justify-center font-body font-semibold">
        <span className="bg-[#fadf69] px-[4px] pl-[20px]">ナノ技術</span>
        を利用した商品
      </div>
      <SizeBox h={70} />
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
              className="flex flex-row container mx-auto mb-[30px]"
            >
              <div className="flex-[543] px-[50px] pt-[30px] pb-[30px] bg-[#7ab8e7] bg-opacity-10 rounded-[20px]">
                <div className="text-[30px] text-primary font-bold">
                  {product_name}
                </div>
                <SizeBox h={8} />
                <div className="text-[14px] opacity-80">{title}</div>
                <SizeBox h={20} />
                <div className="flex flex-row items-end mr-[20px]">
                  <div className="flex-[282]">
                    <img
                      src={aws.s3.getUrl({ key: product_photos[0]?.img_url })}
                      className="w-full"
                    />
                  </div>
                  <SizeBox w={10} />
                  <div className="flex-[142]">
                    <img
                      src={aws.s3.getUrl({ key: product_photos[1]?.img_url })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-[650] flex flex-col justify-between py-[60px] items-center bg-[#7ab8e7] bg-opacity-10 -ml-[20px] rounded-[20px]">
                <div className="text-[30px] opacity-80">{bikou}</div>
                <div className="flex flex-col items-center">
                  <div className="text-[14px] opacity-80 w-[40%] text-center leading-loose">
                    {description}
                  </div>
                </div>
                <div className="text-primary text-[14px] mb-[20px] mt-[10px]">
                  {"<< "}
                  <span
                    className={`${
                      discount !== 0 && "line-through text-black text-xs"
                    }`}
                  >
                    {`${Helper.numberComaFormat({
                      number: price,
                    })} 円`}
                  </span>
                  {discount !== 0 && (
                    <span className="text-red-500 pl-4 font-bold">
                      {`${Helper.numberComaFormat({
                        number: Math.floor(price * (1 - discount / 100)),
                      })} 円 `}
                      {discount + "% Off"}
                    </span>
                  )}
                  {" >>"}
                </div>
                <div
                  className="w-[196px]"
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
                >
                  <AddToCartButtonComponent
                    title="カートに入れる"
                    action={() => {}}
                  />
                </div>
              </div>
            </div>
          );
        }
      )}
      {/* <div className="flex flex-row justify-center mt-[10px]">
            <SeeMoreComponent seeMore={seeMore} setseeMore={setseeMore} />
        </div> */}
      <SizeBox h={120} />
    </div>
  );
};

export default NanoProductComponent;
