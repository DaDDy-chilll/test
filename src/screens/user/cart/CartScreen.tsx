import { GlobalProps } from "@/App";
import SizeBox from "@/components/SizeBox";
import Routes from "@/navigations/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CartProductComponent from "@/components/user/cart/CartProductComponent";
import Helper from "@/helpers";
import { Cart } from "@/types/cart/cart";
import ConfirmComponent from "@/components/admin/settings/ConfirmComponent";
import routes from "@/navigations/routes";
import UserLayout from "../UserLayout";

export type CartsToUploadDataTypes = {
  cart_detail_id: number;
  cart_id: number;
  product_id: number;
  is_subscribe: number;
  subscribe_kikan: number;
  product_qty: number;
  subscribe_qty: number;
};

const CartScreen = ({ mutations, loginUser, changeLoginUserAction }: GlobalProps) => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState<Array<Cart>>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [cartIdToRemove, setCartIdToRemove] = useState<number>();
  const [dateToDelivery, setDateToDelivery] = useState<string>();
  const [dateError, setDateError] = useState<boolean>(false);

  const toDeliveryPageRef = useRef(false);

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
  //     route: null,
  //   },
  // ];

  const getCartDetails = () => {
    mutations.user.cart
      .get()
      .then((ans) => {
        if (ans.data) {
          console.log(ans.data);
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

  const removeCart = () => {
    const updatedCarts = carts.filter(
      (item) => item.cart_detail_id !== cartIdToRemove
    );

    if (updatedCarts.length > 0) {
      setCarts(updatedCarts);
      setOpenConfirmDialog(false);

      uploadUpdatedCarts(updatedCarts);
    } else {
      mutations.user.cart
        .update([])
        .then((ans) => {
          if (ans.data) {
            navigate(Routes.USER.PRODUCT);
            setOpenConfirmDialog(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setOpenConfirmDialog(false);
        });
    }
  };

  const uploadUpdatedCarts = (cartsParams: Array<Cart>) => {
    // prepare for update
    const cartsToUpload: Array<CartsToUploadDataTypes> = cartsParams.map(
      ({
        cart_detail_id,
        cart_id,
        product_id,
        is_subscribe,
        subscribe_kikan,
        product_qty,
      }) => {
        return {
          cart_detail_id,
          cart_id,
          product_id,
          is_subscribe,
          subscribe_kikan,
          product_qty,
          subscribe_qty: product_qty,
        };
      }
    );
    console.log(cartsToUpload);
    // navigate(Routes.USER.DELIVERY_ADDRESS)
    mutations.user.cart
      .update(cartsToUpload)
      .then((ans) => {
        if (ans.data) {
          toDeliveryPageRef.current &&
            Helper.navigate({
              navigate,
              path: routes.USER.DELIVERY_ADDRESS,
              state: { dateToDelivery },
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const grandTotal = () => {
    if (carts.length) {
      let total = 0;
      let totalTax = 0;
      let taxRate = 0;
      let detail:any = [];
      carts.map((cart) => {
        const qty = cart.product_qty;
        const { tax, price, subscribe_status, discount } =
          cart.product_details;
        taxRate = tax > taxRate ? tax : taxRate;
        if (cart.is_subscribe === 1) {
          const unitPrice = Math.floor(qty * price * subscribe_status);
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [...detail,{cartDetailId: cart.cart_detail_id,price: unitPrice,tax: unitTax, includeTax: unitPrice + unitTax}]
        } else {
          const unitPrice = Math.floor(qty * price * (1 - discount / 100));
          const unitTax = Math.floor(unitPrice * (1 + tax / 100)) - unitPrice;
          total += unitPrice + unitTax;
          totalTax += unitTax;
          detail = [...detail,{cartDetailId: cart.cart_detail_id,price: unitPrice,tax: unitTax, includeTax: unitPrice + unitTax}]
        }
      });
      return { total, totalTax, taxRate,detail };
    } else {
      return { total: 0, totalTax: 0, taxRate: 0,detail: [] };
    }
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
          <p className="text-sm font-semibold">
            カードにある商品（{carts.length}個）
          </p>

          <div className="flex space-x-8 pt-4">
            <div className="w-9/12">
              <table className="w-full text-sm border-black border-[1px] border-opacity-20">
                <tr className="border-black border-b-[1px] border-opacity-20">
                  <td className="p-4 w-[260px] md:w-[300px] border-black border-r-[1px] border-opacity-20">
                    商品
                  </td>
                  <td className="p-4 w-[80px] md:w-[120px] border-black border-r-[1px] border-opacity-20">
                    価格
                  </td>
                  <td className="p-4 w-[160px] md:w-[200px] border-black border-r-[1px] border-opacity-20">
                    数
                  </td>
                  <td className="p-4 w-[100px]">合計価格</td>
                </tr>
                {carts.map((cart) => (
                  <CartProductComponent
                    cart={cart}
                    carts={carts}
                    setCarts={setCarts}
                    setOpenConfirmDialog={setOpenConfirmDialog}
                    setCartIdToRemove={setCartIdToRemove}
                  />
                ))}
                <tr className="border-black border-b-[1px] border-opacity-20 text-xs">
                  <td
                    colSpan={3}
                    className="p-4 border-black border-r-[1px] border-opacity-20"
                  >
                    税金（{grandTotal().taxRate}%）
                  </td>
                  <td className="p-4 text-right">
                    {Helper.japaneseNumberFormat({
                      number: grandTotal().totalTax,
                    })}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="p-4 border-black border-r-[1px] border-opacity-20"
                  >
                    小計（税込）
                  </td>
                  <td className="p-4 text-right">
                    {Helper.japaneseNumberFormat({
                      number: grandTotal().total,
                    })}
                  </td>
                </tr>
              </table>
            </div>
            <div className="h-[280px] w-3/12 rounded-md bg-bgcolor flex flex-col items-center p-4 space-y-8">
              <div className="w-full space-y-2">
                <p className="text-sm">お届け日（希望の方）</p>
                <input
                  type="date"
                  className={`p-2 rounded-md bg-white focus:outline-none w-full ${
                    dateError &&
                    "border-2 border-red-400 text-red-400"
                  }`}
                  onChange={(e) => {
                    setDateError(false);
                    setDateToDelivery(e.target.value);
                  }}
                />
              </div>

              <div className="w-full space-y-2">
                <p className="text-sm">お届け時間</p>
                <input
                  type="text"
                  className="p-2 rounded-md bg-white focus:outline-none w-full"
                />
              </div>

              <button
                onClick={() => {
                  if (!dateToDelivery) {
                    setDateError(true);
                    return;
                  }
                  toDeliveryPageRef.current = true;
                  uploadUpdatedCarts(carts);
                }}
                className="bg-primaryColor rounded-md py-2 w-full text-sm text-white"
              >
                支払いへ
              </button>
            </div>
          </div>
        </div>
        <SizeBox h={100} />
      </div>
      {/* Temp */}

      <ConfirmComponent
        confirmText={"Are you sure?"}
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        onConfirm={removeCart}
      />
    </UserLayout>
  );
};
export default CartScreen;
