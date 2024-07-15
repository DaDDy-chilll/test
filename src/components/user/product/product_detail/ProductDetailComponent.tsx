import SizeBox from "@/components/SizeBox";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AddCartProp, Cart } from "@/models/dataModel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Helper from "@/helpers";
import { ProductsDataTypes } from "../../top_page/NanoProductComponent";
import aws from "@/aws";
import { MutationType } from "@/networks/mutations";
import { useNavigate } from "react-router-dom";
import routes from "@/navigations/routes";
import NotiComponent from "@/components/NotiComponent";
import { Content, ProductDescription } from "@/types/product/product_explain";

type Product = {
  product: ProductsDataTypes;
};

interface ProductDetailProps {
  product: Product;
  addToCartAction: (addCart: AddCartProp) => void;
  carts: Array<Cart>;
  mutations: MutationType;
  photoIndex: number;
  setPhotoIndex: Dispatch<SetStateAction<number>>;
}
const ProductDetailComponent = ({
  product,
  mutations,
  photoIndex,
  setPhotoIndex,
}: ProductDetailProps) => {
  const [regularOrder, setRegularOrder] = useState<boolean>(
    product.product.subscribe_status === 1 ||
      product.product.subscribe_status === 0
      ? false
      : true
  );
  const [orderCount, setOrderCount] = useState<number>(
    product.product.min_sell_amt
  );
  const [masterId, setMasterId] = useState<number>();
  const [showNoti, setShowNoti] = useState<boolean>(false);
  const [notiText, setNotiText] = useState<string>();

  const navigate = useNavigate();

  type AutoCompleteData = {
    label: string;
    value: number;
  };

  // Data
  const [masterCategoryData, setMasterCategoryData] = useState<
    Array<AutoCompleteData>
  >([]);

  // const backHandler = () => {
  //   if (photoIndex === 0) {
  //     setPhotoIndex(product.product.product_photos.length - 1);
  //   } else {
  //     setPhotoIndex(photoIndex - 1);
  //   }
  // };

  // const nextHandler = () => {
  //   if (photoIndex === product.product.product_photos.length - 1) {
  //     setPhotoIndex(0);
  //   } else {
  //     setPhotoIndex(photoIndex + 1);
  //   }
  // };

  const getMasterDetails = () => {
    const tempArray: Array<AutoCompleteData> = [];
    mutations.pub.master
      .get()
      .then((ans) => {
        if (ans) {
          console.log(ans);

          if (ans.data) {
            for (let index = 0; index < ans.data?.length; index++) {
              if (ans.data[index].master_id > 3) {
                tempArray.push({
                  label: ans.data[index].name,
                  value: ans.data[index].master_detail_id,
                });
              }
            }
            setMasterCategoryData(tempArray);
            setMasterId(ans.data[0].master_id);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = () => {
    const body = {
      product_id: product.product.product_id,
      is_subscribe: regularOrder ? 1 : -1,
      subscribe_kikan: masterId,
      product_qty: orderCount,
      subscribe_qty: orderCount,
    };
    // console.log(body);
    // return;
    mutations.user.cart
      .post({ cartPayload: body })
      .then((ans) => {
        if (ans) {
          console.log(ans);
        }
        Helper.navigate({ navigate, path: routes.USER.CART });
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
    getMasterDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-[20px] mb-[28px] bg-[#fff] rounded-[10px]">
        <div className="p-[25px]">
          <div className="flex flex-row justify-between mb-[40px]">
            <div className="flex-[1] mr-[45px]">
              <div
                className={`h-[400px] w-full flex flex-row  px-[50px] justify-center items-center mix-blend-normal bg-[#2E9648] bg-opacity-10`}
              >
                <img
                  src={aws.s3.getUrl({
                    key: product.product.product_photos[photoIndex]?.img_url,
                  })}
                  className="h-[300px] drop-shadow-lg bg-cover object-cover"
                />
              </div>
              <SizeBox h={30} />
              <div className="grid grid-cols-4 gap-4">
                {/* <div onClick={backHandler}>
                <img src={LeftArrow} className="cursor-pointer" />
              </div> */}
                {product.product.product_photos.map((img, index) => {
                  return (
                    <>
                      <div
                        onClick={() => setPhotoIndex(index)}
                        key={Math.random()}
                        className={`h-[80px] cursor-pointer flex justify-center items-center hover:shadow-md transition-all duration-100 ${
                          index === photoIndex
                            ? "bg-[#2E9648] bg-opacity-10"
                            : "bg-[#F8F7EE]"
                        }`}
                      >
                        <img
                          src={aws.s3.getUrl({ key: img.img_url })}
                          className="object-cover bg-cover h-[50px]"
                        />
                      </div>
                    </>
                  );
                })}
                {/* <div onClick={nextHandler}>
                <img src={RightArrow} className="h-fit cursor-pointer" />
              </div> */}
              </div>
            </div>

            <div className="flex-[1]">
              <div className="border-t-[2px] border-[#D9D9D9] pt-[30px]">
                <div className="text-[20px] font-bold text-black text-opacity-80 flex space-x-4 items-center">
                  <p>{product.product.product_name}</p>

                  <div className="bg-[#E5FCEB] border-[3px] border-[#E5FCEB] text-[11px] text-[#08C856] px-[2px] py-[3px] rounded-[3px]">
                    In Stock
                  </div>
                </div>
                <div className="text-[14px] font-medium text-black text-opacity-80 block">
                  {product.product.title}
                </div>
                <SizeBox h={40} />
              </div>

              <div className="flex flex-row justify-between">
                <div
                  onClick={() => {
                    if (
                      product.product.subscribe_status === 1 ||
                      product.product.subscribe_status === 0
                    ) {
                      return;
                    }
                    setRegularOrder(true);
                  }}
                  className={`flex-1 w-1/2 bg-[#D9D9D9] bg-opacity-[0.29] rounded-[5px] px-10 py-[35px] hover:shadow-lg transition-all duration-100 border-2 ${
                    product.product.subscribe_status === 1 ||
                    product.product.subscribe_status === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    regularOrder ? " border-primaryColor" : "border-opacity-0"
                  }`}
                >
                  <div className=" text-black text-opacity-80 font-semibold">
                    定期購入
                  </div>
                  {/* <p className="inline-block px-[7px] text-[14px] font-medium bg-[#FFDE4E] text-[#FF0303] rounded-[3px]">
                    {100 - product.product.subscribe_status * 100}% off
                  </p> */}
                  <SizeBox h={20} />
                  <div className="flex space-x-1 text-[14px] whitespace-nowrap">
                    <p className=" line-through whitespace-nowrap">
                      {Helper.japaneseNumberFormat({
                        number: product.product.price,
                      })}{" "}
                      税込
                    </p>
                    <p className="whitespace-nowrap">
                      ({100 - product.product.subscribe_status * 100}% off)
                    </p>
                  </div>
                  <SizeBox h={10} />
                  <div
                    className={`text-[30px] text-primaryColor font-bold whitespace-nowrap`}
                  >
                    {Helper.japaneseNumberFormat({
                      number: Math.round(
                        ((product.product.price * (100 + product.product.tax)) /
                          100) *
                          product.product.subscribe_status
                      ),
                    })}{" "}
                    <span className="inline-block text-[14px] font-medium">
                      税込
                    </span>
                  </div>
                  <SizeBox h={10} />
                  <div className="flex items-center rounded-md border-2 border-black border-opacity-10 bg-white overflow-hidden">
                    <div className=" w-5/12 border-r-2 p-2">
                      <p className="text-[13px] whitespace-nowrap">定期購入</p>
                    </div>
                    {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={
                      product.product.subscribe_status === 1 ||
                      product.product.subscribe_status === 0
                    }
                    value={selectedMasterId}
                    options={masterCategoryData}
                    onChange={(_, value) => {
                      value && setMasterId(value.value);
                      if(value){
                        setSelectedMasterId({label: value?.label,value: value?.value});
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    className="flex-1 border-none"
                  /> */}
                    <select
                      onChange={(e) => setMasterId(+e.target.value)}
                      className="w-7/12 p-2 focus:outline-none cursor-pointer"
                      disabled={
                        product.product.subscribe_status === 1 ||
                        product.product.subscribe_status === 0
                      }
                    >
                      {masterCategoryData.map((master) => (
                        <option value={master.value}>{master.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <SizeBox w={10} />
                <div
                  onClick={() => setRegularOrder(false)}
                  className={`flex-1 w-1/2 bg-[#D9D9D9] bg-opacity-[0.29] rounded-[5px] px-10 py-[35px] cursor-pointer border-2 hover:shadow-lg duration-100 transition-all ${
                    !regularOrder ? " border-primaryColor" : " border-opacity-0"
                  }`}
                >
                  {/* <Radio checked={!regularOrder} /> */}
                  <div className="font-semibold text-black text-opacity-80">
                    １回購入
                  </div>
                  <SizeBox h={product.product.discount !== 0 ? 22 : 50} />
                  <div className={`text-[30px] whitespace-nowrap flex items-center space-x-2`}>
                    <p
                      className={`${
                        product.product.discount !== 0 &&
                        "text-[14px] line-through text-black"
                      }`}
                    >
                      {Helper.japaneseNumberFormat({
                        number:
                          (product.product.price *
                            (100 + product.product.tax)) /
                          100,
                      })}
                      税込
                    </p>
                    {product.product.discount !== 0 && (
                      <span className="text-[14px] whitespace-nowrap">
                        ({product.product.discount + "% Off"})
                      </span>
                    )}
                  </div>
                  {product.product.discount !== 0 && (
                    <>
                      <div
                        className={`text-[30px] font-bold pt-3 text-primaryColor whitespace-nowrap`}
                      >
                        {Helper.japaneseNumberFormat({
                          number: calculatePriceWithDiscount(
                            product.product.price,
                            product.product.discount,
                            product.product.tax
                          ),
                        })}{" "}
                        <span className="text-[14px] font-normal">税込</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <SizeBox h={40} />
              <div className="flex items-center space-x-4">
                <div className="flex justify-between rounded-md border-[1px] border-black border-opacity-20 w-[140px]">
                  <button
                    onClick={() => {
                      if (
                        orderCount === 1 ||
                        orderCount < product.product.min_sell_amt
                      ) {
                        setNotiText(
                          "最低注文数量" +
                            " : " +
                            product.product.min_sell_amt +
                            " 個"
                        );
                        setShowNoti(true);
                        return;
                      }
                      setOrderCount(orderCount - 1);
                    }}
                    className={`w-1/3 py-1 text-3xl ${
                      orderCount === 1 && "opacity-30"
                    }`}
                  >
                    -
                  </button>
                  <button className="border-x-[1px] text-xl border-black border-opacity-20 w-1/3">
                    {orderCount}
                  </button>
                  <button
                    onClick={() => {
                      if (orderCount === product.product.max_sell_amt) {
                        setNotiText(
                          "最大注文数量" +
                            " : " +
                            product.product.max_sell_amt +
                            " 個"
                        );
                        setShowNoti(true);
                        return;
                      }
                      setOrderCount(orderCount + 1);
                    }}
                    className="w-1/3 text-2xl"
                  >
                    +
                  </button>
                </div>
                <Button
                  key={Math.random()}
                  onClick={addToCart}
                  variant="contained"
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#2E9648",
                    height: 50,
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  カートに入れる
                </Button>
              </div>
              <SizeBox h={20} />
              <div className="flex space-x-2">
                <p className="text-xs opacity-60">
                  最低注文数量{"  "}
                  <span className="font-bold opacity-100 underline underline-offset-2 text-sm">
                    {product.product.min_sell_amt}個
                  </span>
                  {"  "}
                  になっております。
                </p>
                <p className="text-xs opacity-60">
                  最低注文数量{"  "}
                  <span className="font-bold opacity-100 underline underline-offset-2 text-sm">
                    {product.product.max_sell_amt}個
                  </span>
                  {"  "}
                  になっております。
                </p>
              </div>
              <SizeBox h={30} />
              <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
              <SizeBox h={30} />
              {JSON.parse(product.product.description).map(
                (
                  { mainTitle, contents }: ProductDescription,
                  index: number
                ) => (
                  <>
                    <div>
                      {mainTitle && (
                        <p className="text-lg font-semibold py-3 tracking-widest">
                          {mainTitle}
                        </p>
                      )}
                      {contents.map(({ subTitle, sentences }: Content) => (
                        <div>
                          {subTitle && (
                            <p className="text-sm font-semibold py-3 tracking-widest">
                              {subTitle}
                            </p>
                          )}
                          {sentences.map((sentence) => (
                            <>
                              <p className="text-sm tracking-widest leading-7 pb-2">
                                {sentence}
                              </p>
                            </>
                          ))}
                        </div>
                      ))}
                    </div>
                    {index + 1 !==
                      JSON.parse(product.product.description).length && (
                      <SizeBox h={20} />
                    )}
                    {index + 1 !==
                      JSON.parse(product.product.description).length && (
                      <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
                    )}
                    {index + 1 !==
                      JSON.parse(product.product.description).length && (
                      <SizeBox h={20} />
                    )}
                  </>
                )
              )}
            </div>
          </div>
        </div>

        <NotiComponent
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          notiText={notiText}
          onConfirm={() => setShowNoti(false)}
        />
      </div>

      <style>{`
        select { 
          -moz-appearance: none; 
          -webkit-appearance: none; 
        } 
    
        .dropdown-container select::-ms-expand { 
          display: none; 
        } 
      `}</style>
    </>
  );
};

export default ProductDetailComponent;

{
  /* <div className="space-y-3">
                <p>・¥15,000以上は無料配送料になります。</p>
                <p>・注文後、1週間以内に配送します。</p>
                <p>・配送日と時間は指定可能です。</p>
              </div>
              <SizeBox h={30} />
              <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
              <SizeBox h={20} />
              <div className="space-y-4 text-sm">
                <p className="font-semibold text-lg">キトサンとは？</p>
                <p className=" leading-7">
                  カニやロブスター、エビの皮に含まれるキチンを脱アセチル化して得た物質をいい、1811年にフランスの科学者ブロカーノがキノコに含まれている未知の成分、つまりキチンを発見したのが始まりです。
                  その後、1859年に化学者ルゲがキチンを脱アセチル化して新しい物質を得て、1894年に科学者フペザイラがキトサンと名付けました。
                </p>
              </div>
              <SizeBox h={30} />
              <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
              <SizeBox h={20} />
              <p className="leading-7 text-sm">
                米国世界最大の食品科学博覧会IFT Food EXPOで、100カ国
                1,000社ほどの世界的な企業が参観した中で、エイペクセル・カルシウムが72年伝統、韓国唯一技術革新大賞を受賞しました。
              </p>
              <SizeBox h={30} />
              <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
              <SizeBox h={20} />
              <div>
                <p className="text-lg font-semibold">製品詳細説明</p>
              </div>
              <SizeBox h={30} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">名称</p>
                <p>健康補助食品</p>
              </div>
              <SizeBox h={20} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">原材料名</p>
                <p className=" leading-7">
                  亜鉛酵母、マンガン酵母／貝殻焼成カルシウム、HPMC、酸化Mg、コレカルシフェロール、ヒアルロン酸、ゲル化剤（増粘多糖類）、乳化剤、塩化Mg
                </p>
              </div>
              <SizeBox h={30} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">内容量</p>
                <p>16.2g (270mg × 60カプセル)</p>
              </div>
              <SizeBox h={30} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">お召し上がり方</p>
                <p>
                  1日2回、1回4カプセル (1,110mg)
                  を目安に十分な水などと一緒にお召し上がりください
                </p>
              </div>
              <SizeBox h={30} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">保存方法</p>
                <p>
                  高温多湿を避けて、直射日光の当たらない涼しい場所に保管してくだい。
                </p>
              </div>
              <SizeBox h={30} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">保管時の注意事項</p>
                <p>子供の手の届かないところに保管してください。</p>
              </div>
              <SizeBox h={30} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">原産国名</p>
                <p>韓国</p>
              </div>
              <SizeBox h={30} />
              <div className="text-sm space-y-4">
                <p className="font-semibold">輸入者</p>
                <p>株式会社ユーフォリアプラス</p>
                <p>東京都中央区日本橋横山町 3-1 横山町ダイカンプラザ 501室</p>
                <p>お問い合わせ:03-6661-9531</p>
              </div>
              <SizeBox h={30} />
              <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
              <SizeBox h={20} />
              <div className="space-y-4 text-sm">
                <p className="text-lg font-semibold">摂取時の注意事項</p>
                <p>
                  1)
                  高カルシウム血症がある場合、または医薬品服用の際は専門家にご相談ください。
                </p>
                <p>
                  2)
                  異常事例が発生した場合は、摂取を中止して専門家に相談してください。
                </p>
                <p>3) 付属の防湿剤を摂取しないでください。</p>
                <p>
                  4)
                  特異体質またはアレルギー体質の場合は、原料の成分を確認してから摂取してください。
                </p>
                <p>
                  5)
                  乳児、幼児、妊婦、授乳婦や病気保有者または薬物を服用中の方は、摂取前に医師、薬剤師など専門家と相談してください。
                </p>
                <p>
                  6)
                  摂取量及び摂取方法を遵守し、その他の事項は輸入者にお問い合わせください。
                </p>
                <p>
                  7)
                  製品の開封または摂取時に包装材により傷つくことがありますのでご注意ください。
                </p>
              </div> */
}

{
  /* <div className="flex-[1]">
  <div className="border-b-[1px] border-[#D9D9D9] mb-[30px]">
    <div className="bg-[#E5FCEB] border-[3px] border-[#E5FCEB] text-[11px] text-[#08C856] px-[2px] py-[3px] rounded-[3px] mb-[20px] inline-block">
      In Stock
    </div>
    <div className="text-[20px] font-bold text-black text-opacity-80 block">
      {product.product.product_name}{" "}
    </div>
    <div className="text-[14px] font-medium text-black text-opacity-80 block">
      {product.product.title}
    </div>
    <SizeBox h={40} />
  </div>

  <div className="flex flex-row justify-between">
    <div
      onClick={() => {
        if (
          product.product.subscribe_status === 1 ||
          product.product.subscribe_status === 0
        ) {
          return;
        }
        setRegularOrder(true);
      }}
      className={`flex-1 w-1/2 bg-[#D9D9D9] bg-opacity-[0.29] rounded-[5px] px-[8px] py-[35px] ${
        product.product.subscribe_status === 1 ||
        product.product.subscribe_status === 0
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      } ${regularOrder && "border-2 border-textBlue"}`}
    >
      <div className="flex flex-row items-center nav">
        <Radio
          checked={regularOrder}
          disabled={
            product.product.subscribe_status === 1 ||
            product.product.subscribe_status === 0
          }
        />
        <div className="ml-[7px] text-black text-opacity-80">定期購入</div>
        <SizeBox w={5} />
        <p className="inline-block px-[7px] text-[14px] font-medium bg-[#FFDE4E] text-[#FF0303] rounded-[3px]">
          {100 - product.product.subscribe_status * 100}% off
        </p>
      </div>
      <SizeBox h={10} />
      <div className="pl-12 pr-4">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disabled={
            product.product.subscribe_status === 1 ||
            product.product.subscribe_status === 0
          }
          value={selectedMasterId}
          options={masterCategoryData}
          onChange={(_, value) => {
            value && setMasterId(value.value);
          }}
          renderInput={(params) => <TextField {...params} label="定期配達" />}
          className="flex-1 bg-bgcolor"
        />
      </div>
      <SizeBox h={10} />
      <div className={`text-[30px] pl-12 text-[#285DBD] font-bold`}>
        {Helper.japaneseNumberFormat({
          number: Math.round(
            ((product.product.price * (100 + product.product.tax)) / 100) *
              product.product.subscribe_status
          ),
        })}{" "}
        <span className="inline-block text-[14px] font-medium text-[#000] opacity-[0.5]">
          税込
        </span>
      </div>
    </div>
    <SizeBox w={10} />
    <div
      onClick={() => setRegularOrder(false)}
      className={`flex-1 w-1/2 bg-[#D9D9D9] bg-opacity-[0.29] rounded-[5px] px-[8px] py-[35px] cursor-pointer ${
        !regularOrder && "border-2 border-textBlue"
      }`}
    >
      <div onClick={() => {}} className="flex flex-row items-center nav">
        <Radio checked={!regularOrder} />
        <div className="ml-[7px] text-black text-opacity-80">１回購入</div>
      </div>
      <SizeBox h={product.product.discount !== 0 ? 54 : 80} />
      <div
        className={`text-[30px] pl-12 text-[#285DBD] font-bold ${
          product.product.discount !== 0 && "text-xs line-through text-black"
        }`}
      >
        {Helper.japaneseNumberFormat({
          number: (product.product.price * (100 + product.product.tax)) / 100,
        })}{" "}
        <span
          className={`${
            product.product.discount !== 0 ? "text-xs" : "text-[14px]"
          } font-medium text-[#000] opacity-[0.5]`}
        >
          税込
        </span>
      </div>
      {product.product.discount !== 0 && (
        <>
          <div className={`text-[30px] pl-10 font-bold pt-2 text-red-500`}>
            {Helper.japaneseNumberFormat({
              number: calculatePriceWithDiscount(
                product.product.price,
                product.product.discount,
                product.product.tax
              ),
            })}{" "}
            <span className="text-xs">(税込)</span>
          </div>
          <div className="text-[16px] pl-12 font-bold text-red-500 whitespace-nowrap">
            {product.product.discount + "% Off"}
          </div>
        </>
      )}
    </div>
  </div>
  <SizeBox h={40} />
  <div className="flex justify-between rounded-md border-[1px] border-black border-opacity-20 w-[130px]">
    <button
      onClick={() => {
        if (orderCount === 1 || orderCount < product.product.min_sell_amt) {
          setNotiText(
            "最低注文数量" + " : " + product.product.min_sell_amt + " 個"
          );
          setShowNoti(true);
          return;
        }
        setOrderCount(orderCount - 1);
      }}
      className={`w-1/3 py-2 text-3xl ${orderCount === 1 && "opacity-30"}`}
    >
      -
    </button>
    <button className="border-x-[1px] text-xl border-black border-opacity-20 w-1/3">
      {orderCount}
    </button>
    <button
      onClick={() => {
        if (orderCount === product.product.max_sell_amt) {
          setNotiText(
            "最大注文数量" + " : " + product.product.max_sell_amt + " 個"
          );
          setShowNoti(true);
          return;
        }
        setOrderCount(orderCount + 1);
      }}
      className="w-1/3 text-2xl"
    >
      +
    </button>
  </div>
  <SizeBox h={20} />
  <div className="flex space-x-2">
    <p className="text-xs opacity-60">
      最低注文数量{"  "}
      <span className="font-bold opacity-100 underline underline-offset-2 text-sm">
        {product.product.min_sell_amt}個
      </span>
      {"  "}
      になっております。
    </p>
    <p className="text-xs opacity-60">
      最低注文数量{"  "}
      <span className="font-bold opacity-100 underline underline-offset-2 text-sm">
        {product.product.max_sell_amt}個
      </span>
      {"  "}
      になっております。
    </p>
  </div>
  <SizeBox h={20} />
  <div className="w-full h-[1px] bg-[#000] opacity-20"></div>
  <SizeBox h={40} />
  <Button
    key={Math.random()}
    onClick={addToCart}
    variant="contained"
    size="large"
    style={{ width: "100%", backgroundColor: "#285DBD", height: 50 }}
  >
    <ShoppingCartOutlinedIcon
      style={{ width: 20, height: 20, marginRight: 8 }}
    />
    カートに入れる
  </Button>
</div>; */
}
