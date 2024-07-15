import AdminRouterView from "@/navigations/AdminRouterView";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserRouterView from "@/navigations/UserRouterView";
import {
  useAppDispatch,
  useAppSelector as selector,
} from "@/store/reducer/hooks";
import {
  addToCart,
  increaseQty,
  decreaseQty,
  createOrder,
  removeCart,
  changeLoginState,
} from "@/store/reducer/serviceSlice";
import { setCategoryLists } from "@/store/reducer/masterSlice";
import { AddCartProp, Cart, Order } from "@/models/dataModel";
import mutations, { MutationType } from "@/networks/mutations";
import adminInit from "./store/actions/AdminInit";
import { product_category } from "./types/product/product_category";
import { LoginUser } from "./types/user/loginUser";
export type GlobalProps = {
  // service
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  carts: Array<Cart>;
  orders: Array<Order>;
  addToCartAction: (AddCart: AddCartProp) => void;
  increaseProductQty: (productId: number) => void;
  decreaseProductQty: (productId: number) => void;
  removeCarts: () => void;
  createOrders: () => void;
  mutations: MutationType;

  // master
  categories: Array<product_category>;
  setCategories: (categories: Array<product_category>) => void;
  // App
  adminInitFromRoot: () => void;
  // login user
  loginUser: LoginUser | undefined;
  changeLoginUserAction: (loginUser: LoginUser | undefined) => void;
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "1"
  );
  const dispatch = useAppDispatch();
  const { carts, orders, loginUser } = selector(({ service }) => service);
  const { categories } = selector(({ master }) => master);

  const changeLoginUserAction = (loginUser: LoginUser | undefined)=>{
    dispatch(changeLoginState(loginUser));
  }
  
  const setCategories = (categories : Array<product_category>)=>{
    dispatch(setCategoryLists(categories));
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  const addToCartAction = (product: AddCartProp) => {
    dispatch(addToCart(product));
  };
  const increaseProductQty = (productId: number) => {
    dispatch(increaseQty(productId));
  };
  const decreaseProductQty = (productId: number) => {
    dispatch(decreaseQty(productId));
  };
  const createOrders = () => {
    dispatch(createOrder());
  };
  const removeCarts = () => {
    dispatch(removeCart());
  };

  //
  const adminInitFromRoot = () => {
    adminInit({ dispatch });
  };

  const globalProps: GlobalProps = {
    // service
    mutations,
    carts,
    orders,
    addToCartAction,
    increaseProductQty,
    decreaseProductQty,
    setIsAdmin,
    createOrders,
    removeCarts,

    // master
    categories,
    setCategories,

    // App
    adminInitFromRoot,

    // Login User
    loginUser: loginUser ? loginUser : undefined,
    changeLoginUserAction,
  };

  useEffect(() => {
    init();
  });

  const init = async () => {};
  return isAdmin ? (
    <AdminRouterView globalProps={globalProps} />
  ) : (
    <UserRouterView globalProps={globalProps} />
  );
};

export default App;
