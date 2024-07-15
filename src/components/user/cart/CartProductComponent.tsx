import aws from "@/aws";
import Helper from "@/helpers";
import { Cart } from "@/types/cart/cart";
import { Dispatch, SetStateAction } from "react";

type CartProductComponentProps = {
  key?: number;
  cart: Cart;
  carts: Array<Cart>;
  setCarts: Dispatch<SetStateAction<Cart[]>>;
  setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
  setCartIdToRemove: Dispatch<SetStateAction<number | undefined>>;
};

const CartProductComponent = ({
  cart,
  carts,
  setCarts,
  key,
  setOpenConfirmDialog,
  setCartIdToRemove,
}: CartProductComponentProps) => {
  const total = () => {
    let unitPrice = 0;
    let subTotal = 0;
    const qty = cart.product_qty;
    const { price, subscribe_status, discount } = cart.product_details;
    if (cart.is_subscribe === 1) {
      unitPrice = Math.floor(price * subscribe_status);
      subTotal = Math.floor(qty * price * subscribe_status);
    } else {
      unitPrice = Math.floor(price * (1 - discount / 100));
      subTotal = Math.floor(qty * price * (1 - discount / 100));
    }
    return { unitPrice, subTotal };
  };

  const increaseProductCount = () => {
    const updatedQty = cart.product_qty + 1;
    // update for
    const updatedCarts = carts.map((currentCart) => {
      if (currentCart.cart_detail_id === cart.cart_detail_id) {
        currentCart.product_qty = updatedQty;
        currentCart.subscribe_qty = updatedQty;
      }
      return currentCart;
    });
    setCarts(updatedCarts);
  };

  const decreaseProductCount = () => {
    if (cart.product_qty === 1) {
      setOpenConfirmDialog(true);
      return;
    }

    const updatedQty = cart.product_qty - 1;
    // update for
    const updatedCarts = carts.map((currentCart) => {
      if (currentCart.cart_detail_id === cart.cart_detail_id) {
        currentCart.product_qty = updatedQty;
        currentCart.subscribe_qty = updatedQty;
      }
      return currentCart;
    });
    setCarts(updatedCarts);
  };

  return (
    <tr
      key={key}
      className="border-black border-b-[1px] border-opacity-20 text-xs"
    >
      <td className="p-4  border-black border-r-[1px] border-opacity-20 flex space-x-2 items-center">
        <div className={`px-4 py-2`}>
          <img
            src={aws.s3.getUrl({
              key: cart.product_details.product_photos[0]?.img_url,
            })}
            width={60}
            height={60}
          />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <p>{cart.product_details.product_name}</p>
          <p>{cart.product_details.title}</p>
        </div>
      </td>
      <td className="p-4  border-black border-r-[1px] border-opacity-20">
        {Helper.japaneseNumberFormat({
          number: total().unitPrice,
        })}{" "}
        (税抜)
        <p className="text-[10px]">
          {cart.is_subscribe === 1 ? "定期購入" : "１回購入"}
        </p>
      </td>
      <td className="p-4 border-black border-r-[1px] border-opacity-20">
        <div className="flex items-center border-black border-[1px] border-opacity-20 w-[120px]">
          <button
            onClick={() => {
              setCartIdToRemove(cart.cart_detail_id);
              decreaseProductCount();
            }}
            className="px-4 py-2 opacity-40"
          >
            -
          </button>
          <p className="px-4 py-2 border-black border-x-[1px] border-opacity-20">
            {cart.product_qty}
          </p>
          <button onClick={increaseProductCount} className="px-4 py-2">
            +
          </button>
        </div>
      </td>
      <td className="p-4 text-right">
        {Helper.japaneseNumberFormat({
          number: total().subTotal,
        })}
      </td>
    </tr>
  );
};

export default CartProductComponent;
