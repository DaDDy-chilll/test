import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import Routes from "@/navigations/routes";
import Helper from "@/helpers";
import { Divider, Radio } from "@mui/material";
import { useEffect, useState } from "react";
import DeliveryAddressDialogComponent from "@/components/user/cart/DeliveryAddressDialogComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { Cart } from "@/types/cart/cart";
import aws from "@/aws";
import NotiComponent from "@/components/NotiComponent";
import { Prefecture } from "@/types/prefecture/Prefecture";
import { DeliveryAddressList } from "@/types/delivery_address/delivery_address_list";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import UserLayout from "../UserLayout";

const DeliveryAddressScreen = ({ mutations, loginUser, changeLoginUserAction }: GlobalProps) => {
  type ValidationErrors = {
    family_name?: string;
    name?: string;
    post_code?: string;
    prefecture_id?: string;
    city_ward_town_id?: string;
    address_name?: string;
    phone?: string;
  };

  type AutoCompleteData = {
    label: string;
    value: number;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [carts, setCarts] = useState<Array<Cart>>([]);

  const [family_name, setFamilyName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [post_code, setPostCode] = useState<string>("");
  const [address_name, setAddressName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [main_address, setMainAddress] = useState<number>(-1);
  const [prefecture_id, setPrefectureIdValue] = useState<number | undefined>();
  const [city_ward_town_id, setCityWardTownIdValue] = useState<
    number | undefined
  >();
  const [status, setStatus] = useState<number>(1);

  const [createStatus, setCreateStatus] = useState<boolean>(false);

  const [errors, setErrors] = useState<ValidationErrors>({});

  const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);
  const [prefectureData, setPrefectureData] = useState<Array<AutoCompleteData>>(
    []
  );
  const [cityWardTownData, setCityWardTownData] = useState<
    Array<AutoCompleteData>
  >([]);
  const [prefectureId, setPrefectureId] = useState<
    AutoCompleteData | undefined
  >();
  const [cityWardTownId, setCityWardTownId] = useState<
    AutoCompleteData | undefined
  >();

  const [openDeliveryAddressDialog, setOpenDeliveryAddressDialog] =
    useState<boolean>(false);

  /* Address Data */
  const [address, setAddress] = useState<Array<DeliveryAddressList>>([]);

  /* picked Shipping Address */
  const [shipAddressId, setShipAddressId] = useState<number>(-1);
  const [shipAddressIdError, setShipAddressIdError] = useState<boolean>(false);
  const [billAddressId, setBillAddressId] = useState<number>(-1);

  useEffect(() => {
    getPrefectures();
    getAddress();
  }, []);

  const getAddress = () => {
    mutations.user.deliveryAddress.get({}).then((ans) => {
      if (ans.data) {
        setAddress(ans.data);
        /* Ship Address Auto Select */
        const [ship] = ans.data.filter(({ status }) => status === 1);
        ship && setShipAddressId(ship.address_id);

        /* Bill Address Auto Select */
        const [bill] = ans.data.filter(({ status }) => status === 2);
        bill && setBillAddressId(bill.address_id);
      }
    });
  };

  useEffect(() => {
    if (createStatus) {
      createDeliveryAddress();
    }
  }, [createStatus]);

  useEffect(() => {
    if (!openDeliveryAddressDialog) {
      setErrors({});
      setFamilyName("");
      setName("");
      setPostCode("");
      setAddressName("");
      setPhone("");
      setMainAddress(-1);
      setPrefectureId(undefined);
      setPrefectureIdValue(undefined);
      setCityWardTownId(undefined);
      setCityWardTownIdValue(undefined);
    }
  }, [openDeliveryAddressDialog]);

  const getPrefectures = () => {
    mutations.pub.prefecture
      .get()
      .then((ans) => {
        if (ans.data) {
          setPrefectures(ans.data);
          setPrefectureData(
            ans.data.map(({ prefecture_id: id, name: name }) => ({
              value: id,
              label: name,
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createDeliveryAddress = () => {
    mutations.user.deliveryAddress
      .create({
        family_name,
        name,
        post_code,
        prefecture_id,
        city_ward_town_id,
        address_name,
        phone,
        main_address,
        status,
      })
      .then((ans) => {
        if (ans.data) {
          setErrors({});
          getAddress();
          setOpenDeliveryAddressDialog(false);
          setCreateStatus(false);
        }
      })
      .catch((err: any) => {
        setCreateStatus(false);
        setErrors(err.response.data.errors);
        console.log(err);
      });
  };

  const [showNoti, setShowNoti] = useState<boolean>(false);

  // const subNavItems: Array<subNavItemsProp> = [
  //   {
  //     Title: HomeIcon,
  //     route: Routes.USER.TOP_PAGE,
  //   },
  //   {
  //     Title: "マイページ",
  //     route: Routes.USER.ACCOUNT,
  //   },
  //   {
  //     Title: "カート",
  //     route: Routes.USER.CART,
  //   },
  //   {
  //     Title: "先設定",
  //     route: null,
  //   },
  // ];

  const total = (cart: Cart) => {
    let unitPrice = 0;
    let subTotal = 0;
    const qty = cart.product_qty;
    const { price, subscribe_status, discount, tax } = cart.product_details;
    const taxPrice = Math.round(price * (tax / 100));
    if (cart.is_subscribe === 1) {
      unitPrice = Math.floor(price * subscribe_status);
      subTotal = Math.floor(qty * price * subscribe_status + taxPrice);
    } else {
      unitPrice = Math.floor(price * (1 - discount / 100));
      subTotal = Math.floor(qty * price * (1 - discount / 100) + taxPrice);
    }
    return { unitPrice, subTotal };
  };
  type Detail = {
    cartDetailId: number;
    price: number;
    tax: number;
    includeTax: number;
  };
  const grandTotal = () => {
    if (carts.length) {
      let total = 0;
      let totalTax = 0;
      let taxRate = 0;
      let detail: Array<Detail> = [];
      carts.map((cart) => {
        const qty = cart.product_qty;
        const { tax, price, subscribe_status, discount } = cart.product_details;
        taxRate = tax > taxRate ? tax : taxRate;
        if (cart.is_subscribe === 1) {
          const unitPrice = Math.floor(qty * price * subscribe_status);
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [
            ...detail,
            {
              cartDetailId: cart.cart_detail_id,
              price: unitPrice,
              tax: unitTax,
              includeTax: unitPrice + unitTax,
            },
          ];
        } else {
          const unitPrice = Math.floor(qty * price * (1 - discount / 100));
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [
            ...detail,
            {
              cartDetailId: cart.cart_detail_id,
              price: unitPrice,
              tax: unitTax,
              includeTax: unitPrice + unitTax,
            },
          ];
        }
      });
      return { total, totalTax, taxRate, detail };
    } else {
      return { total: 0, totalTax: 0, taxRate: 0, detail: [] };
    }
  };

  const getCartDetails = () => {
    mutations.user.cart
      .get()
      .then((ans) => {
        if (ans.data) {
          if (ans.data.length > 0) {
            const transformedData: Cart[] = ans.data?.map((cart, index) => ({
              index: index,
              cart_detail_id: cart.cart_detail_id,
              cart_id: cart.cart_id,
              product_id: cart.product_id,
              is_subscribe: cart.is_subscribe,
              subscribe_kikan: cart.subscribe_kikan,
              product_qty: cart.product_qty,
              subscribe_qty: cart.subscribe_qty,
              product_details: cart.product_details,
            }));
            setCarts(transformedData);
          } else {
            setCarts([]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadOrder = () => {
    if (shipAddressId === -1) {
      setShipAddressIdError(true);
      return;
    }
    const body = {
      address_id: shipAddressId,
      schedule_delivery_date: location.state.dateToDelivery,
      schedule_delivery_time_id: 1,
    };
    mutations.user.order
      .createOrder(body)
      .then(() => {
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
          navigate(Routes.USER.TOP_PAGE);
        }, 2000);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getCartDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout activeNumber={4} loginUser={loginUser} changeLoginUserAction={changeLoginUserAction}>
      {/* Temp */}
      <div className="container mx-auto py-20">
        {/* <SubNavbarComponent text="カート" subNavItems={subNavItems} /> */}
        <SizeBox h={20} />

        <div className="bg-white rounded-md px-6 py-4">
          <div className="flex space-x-8 pt-4">
            <div className="w-7/12 space-y-4">
              <p className="text-xl font-bold">
                配送先設定{" "}
                {shipAddressIdError && (
                  <span className=" text-red-500 text-sm">
                    注文を配送するには住所を作成する必要があります。
                  </span>
                )}
              </p>

              <div className=" border-black border-[1px] border-opacity-20 rounded-md p-4 space-y-4">
                {address
                  .filter(({ status }) => status === 1)
                  .map(
                    ({
                      address_id,
                      name,
                      post_code,
                      phone,
                      prefecture,
                      city_ward_town,
                      address_name,
                    }) => {
                      return (
                        <>
                          <div
                            onClick={() => setShipAddressId(address_id)}
                            className="flex space-x-4 nav"
                          >
                            <div className="mt-[8px]">
                              {address_id === shipAddressId ? (
                                <RadioButtonCheckedIcon color="primary" />
                              ) : (
                                <RadioButtonUncheckedIcon />
                              )}
                            </div>
                            <div className="text-sm space-y-2 pt-[8px]">
                              <p className="text-base font-semibold">
                                {name.split(",")[0]} {name.split(",")[1]}
                              </p>
                              <p>{post_code}</p>
                              <p>
                                {prefecture.name}, {city_ward_town.name}
                              </p>
                              <p>{address_name}</p>
                              <p>電話：{phone}</p>
                            </div>
                          </div>
                          <Divider />
                        </>
                      );
                    }
                  )}

                <div className="pl-14">
                  <button
                    onClick={() => {
                      setStatus(1);
                      setOpenDeliveryAddressDialog(true);
                    }}
                    className="bg-primaryColor rounded-md py-2 w-1/2 text-sm text-white"
                  >
                    その他の配送先を追加
                  </button>
                </div>
              </div>

              <p className="text-xl font-bold">請求先設定</p>

              <div className=" border-black border-[1px] border-opacity-20 rounded-md p-4 space-y-4">
                <div className="flex space-x-4 items-center">
                  <Radio />
                  <p className="text-sm">配送先と同じ</p>
                </div>
              </div>

              <div className=" border-black border-[1px] border-opacity-20 rounded-md py-4 space-y-4 px-4">
                <div className="flex space-x-4 items-center border-black border-b-[1px] border-opacity-20 px-4 pb-4">
                  <Radio />
                  <p className="text-sm">配送先と同じ</p>
                </div>

                {address
                  .filter(({ status }) => status === 2)
                  .map(
                    ({
                      address_id,
                      name,
                      post_code,
                      phone,
                      prefecture,
                      city_ward_town,
                      address_name,
                    }) => {
                      return (
                        <>
                          <div
                            onClick={() => setBillAddressId(address_id)}
                            className="flex space-x-4 nav"
                          >
                            <div className="mt-[8px]">
                              {address_id === billAddressId ? (
                                <RadioButtonCheckedIcon color="primary" />
                              ) : (
                                <RadioButtonUncheckedIcon />
                              )}
                            </div>
                            <div className="text-sm space-y-2 pt-[8px]">
                              <p className="text-base font-semibold">
                                {name.split(",")[0]} {name.split(",")[1]}
                              </p>
                              <p>{post_code}</p>
                              <p>
                                {prefecture.name}, {city_ward_town.name}
                              </p>
                              <p>{address_name}</p>
                              <p>電話：{phone}</p>
                            </div>
                          </div>
                          <Divider />
                        </>
                      );
                    }
                  )}

                <div className="pl-14 mx-4">
                  <button
                    onClick={() => {
                      setStatus(2);
                      setOpenDeliveryAddressDialog(true);
                    }}
                    className="bg-primaryColor rounded-md py-2 w-1/2 text-sm text-white"
                  >
                    その他の配送先を追加
                  </button>
                </div>
              </div>
            </div>

            <div className="w-5/12">
              <div className="rounded-md bg-bgcolor px-4 py-6 mt-[42px] space-y-4">
                {carts.map((product) => (
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col space-y-2 w-3/5">
                      <img
                        src={aws.s3.getUrl({
                          key: product.product_details.product_photos[0]
                            ?.img_url,
                        })}
                        width={80}
                        height={80}
                      />
                      <div className="text-xs space-y-2">
                        <p className="font-semibold">
                          {product.product_details.product_name}{" "}
                          {Helper.japaneseNumberFormat({
                            number: total(product).unitPrice,
                          })}{" "}
                          (税抜)
                        </p>
                        <p>{product.product_details.title}</p>
                      </div>
                    </div>

                    <div className="text-xs w-1/5 flex whitespace-nowrap">
                      数量: {product.product_qty}
                    </div>

                    <div className="text-xs w-1/5 whitespace-nowrap">
                      {Helper.japaneseNumberFormat({
                        number: grandTotal().detail.filter(
                          ({ cartDetailId }) =>
                            product.cart_detail_id === cartDetailId
                        )[0].includeTax,
                      })}
                      {/* {Helper.japaneseNumberFormat({
                        number: total(product).subTotal,
                      })} */}
                      (税込)
                    </div>
                  </div>
                ))}
                {/* <Divider /> */}

                {/* <div className="flex justify-between">
                  <p>小計（税金{totalPercentage} %）</p>
                  <p>{Helper.japaneseNumberFormat({ number: taxAmount })}</p>
                </div> */}

                <Divider />
                <div className="flex justify-between">
                  <p>配送</p>
                  <p>{Helper.japaneseNumberFormat({ number: 0 })}</p>
                </div>

                <Divider />
                <div className="flex justify-between text-xl">
                  <p>合計</p>
                  <p>
                    {Helper.japaneseNumberFormat({
                      number: grandTotal().total,
                    })}
                  </p>
                </div>
                <SizeBox />
                <button
                  onClick={uploadOrder}
                  className="bg-primaryColor rounded-md py-2 w-full text-sm text-white"
                >
                  支払いへ
                </button>
              </div>
            </div>
          </div>
        </div>
        <SizeBox h={100} />

        <NotiComponent
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          notiText="Successfully ordered!"
          onConfirm={() => {
            navigate(Routes.USER.TOP_PAGE);
            setShowNoti(false);
          }}
        />

        <DeliveryAddressDialogComponent
          prefectures={prefectures}
          prefectureData={prefectureData}
          cityWardTownData={cityWardTownData}
          setCityWardTownData={setCityWardTownData}
          familyName={family_name}
          setFamilyName={setFamilyName}
          name={name}
          setName={setName}
          postCode={post_code}
          setPostCode={setPostCode}
          addressName={address_name}
          setAddressName={setAddressName}
          phone={phone}
          setPhone={setPhone}
          mainAddress={main_address}
          setMainAddress={setMainAddress}
          setCreateStatus={setCreateStatus}
          prefectureId={prefectureId}
          setPrefectureId={setPrefectureId}
          setPrefectureIdValue={setPrefectureIdValue}
          cityWardTownId={cityWardTownId}
          setCityWardTownId={setCityWardTownId}
          setCityWardTownIdValue={setCityWardTownIdValue}
          openDialog={openDeliveryAddressDialog}
          setOpenDialog={setOpenDeliveryAddressDialog}
          errors={errors}
        />
      </div>
      {/* Temp */}
    </UserLayout>
  );
};
export default DeliveryAddressScreen;
