import { AddCartProp, Cart, Customer, Order } from "@/models/dataModel";
import { LoginUser } from "@/types/user/loginUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialType = {
  carts: Array<Cart>;
  orders:Array<Order>;
  loginUser:  LoginUser | undefined;
}

const initialState: InitialType = {
  carts: JSON.parse(localStorage.getItem("carts") || "[]").map(
    (cart: Cart) => cart
  ),
  orders: JSON.parse(localStorage.getItem("orders") || "[]").map(
    (order: Order) => order
  ),
  //loginUser: LoginUser
  loginUser: localStorage.getItem("loginUser")
    ? JSON.parse(localStorage.getItem("loginUser") || "")
    : undefined,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    changeLoginState:(state,action: PayloadAction<LoginUser | undefined>)=>{
      state.loginUser = action.payload;
      localStorage.setItem("loginUser", JSON.stringify(state.loginUser));
    },
    addToCart: (state, action: PayloadAction<AddCartProp>) => {
      const isProductAlreadyIn =
        state.carts.filter(
          ({ productId }) => productId === action.payload.productId
        ).length > 0;
      if (isProductAlreadyIn) {
        const updatedCarts = state.carts.map(
          ({ cartId, productId, qty }: Cart) => {
            if (productId == action.payload.productId) {
              return { cartId, productId, qty: action.payload.qty };
            } else {
              return { cartId, productId, qty };
            }
          }
        );
        state.carts = updatedCarts;
      } else {
        state.carts = [
          ...state.carts,
          {
            cartId: Math.random(),
            productId: action.payload.productId,
            qty: action.payload.qty,
          },
        ];
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const updatedCarts: Array<Cart> = state.carts.map(
        ({ cartId, productId, qty }: Cart) => {
          if (productId === action.payload) {
            return { cartId, productId, qty: qty + 1 };
          } else {
            return { cartId, productId, qty };
          }
        }
      );

      state.carts = updatedCarts;
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
    },

    // decreaseQty #note when qty = 1, remove this item(product)
    decreaseQty: (state, action: PayloadAction<number>) => {
      let updatedCarts: Array<Cart> = [];
      state.carts.map(({ cartId, productId, qty }: Cart) => {
        if (productId === action.payload) {
          if (qty > 1) {
            updatedCarts = [
              ...updatedCarts,
              { cartId, productId, qty: qty - 1 },
            ];
          }
        } else {
          updatedCarts = [...updatedCarts, { cartId, productId, qty }];
        }
      });
      state.carts = updatedCarts;
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
    },
    createOrder: (state) => {
      const customer: Customer = {
        customerId: Math.random(),
        name: "山田",
        orderDate: new Date().toLocaleDateString(),
      };
      state.orders = [
        ...state.orders,
        { orderId: Math.random(), customer, detail: state.carts },
      ];
      localStorage.setItem("orders", JSON.stringify(state.orders));

      state.carts = [];
      localStorage.setItem("carts", "[]");
    },
    removeCart: (state) => {
      state.carts = [];
      localStorage.setItem("carts", "[]");
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeCart,
  createOrder,
  changeLoginState,
} = serviceSlice.actions;
export default serviceSlice.reducer;
