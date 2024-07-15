import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteName from "./routes";
import TopPageScreen from "@/screens/user/TopPageScreen";
import LoginScreen from "@/screens/user/Auth/LoginScreen";
import ProductScreen from "@/screens/user/product/ProductScreen";
import TestingScreen from "@/screens/TestingScreen";

import { GlobalProps } from "@/App";
import CartScreen from "@/screens/user/cart/CartScreen";
import ProductDetailScreen from "@/screens/user/product/ProductDetailScreen";
import AccountScreen from "@/screens/user/account/AccountScreen";
import OrderScreen from "@/screens/user/order/OrderScreen";
import DeliveryStatusScreen from "@/screens/user/order/DeliveryStatusScreen";
import ReturnProductsScreen from "@/screens/user/order/ReturnProductsScreen";
import CancelProductsScreen from "@/screens/user/order/CancelProductsScreen";
import OrderDetailScreen from "@/screens/user/order/OrderDetailScreen";
import SecurityScreen from "@/screens/user/security/SecurityScreen";
import DestinationScreen from "@/screens/user/destination/DestinationScreen";
import AddDestinationScreen from "@/screens/user/destination/AddDestinationScreen";
import EditDestinationScreen from "@/screens/user/destination/EditDestinationScreen";
import DeliveryAddressScreen from "@/screens/user/cart/DeliveryAddressScreen";
import CheckOutScreen from "@/screens/user/cart/CheckOutScreen";
import ForgotPasswordScreen from "@/screens/user/Auth/ForgotPasswordScreen";
import ResetPasswordScreen from "@/screens/user/Auth/ResetPasswordScreen";
import RegisterScreen from "@/screens/user/Auth/RegisterScreen";

//const UserRouterView = ({setIsAdmin}:{setIsAdmin: Dispatch<SetStateAction<boolean>>})=>{

const UserRouterView = ({ globalProps }: { globalProps: GlobalProps }) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route
          path={RouteName.USER.TOP_PAGE}
          Component={() => <TopPageScreen {...globalProps} />}
        />

        {/* Auth */}
        <Route
          path={RouteName.USER.LOGIN}
          Component={() => <LoginScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.FORGOT_PASSWORD}
          Component={() => <ForgotPasswordScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.RESET_PASSWORD}
          Component={() => <ResetPasswordScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.REGISTER}
          Component={() => <RegisterScreen {...globalProps} />}
        />

        {/* Product */}
        <Route
          path={RouteName.USER.PRODUCT}
          Component={() => <ProductScreen {...globalProps} />}
        />

        <Route
          path={RouteName.USER.PRODUCT_DETAIL}
          Component={() => <ProductDetailScreen {...globalProps} />}
        />

        {/* Cart */}
        <Route
          path={RouteName.USER.CART}
          Component={() => <CartScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.DELIVERY_ADDRESS}
          Component={() => <DeliveryAddressScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.CHECKOUT}
          Component={() => <CheckOutScreen {...globalProps} />}
        />

        {/* User Account */}
        <Route
          path={RouteName.USER.ACCOUNT}
          Component={() => <AccountScreen {...globalProps} />}
        />

        {/* Order */}
        <Route
          path={RouteName.USER.ORDER}
          Component={() => <OrderScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.ORDER_DETAIL}
          Component={() => <OrderDetailScreen {...globalProps} />}
        />

        <Route
          path={RouteName.USER.DELIVERY_STATUS}
          Component={() => <DeliveryStatusScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.RETURN_PRODUCTS}
          Component={() => <ReturnProductsScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.CANCEL_PRODUCTS}
          Component={() => <CancelProductsScreen {...globalProps} />}
        />

        {/* Security */}
        <Route 
          path={RouteName.USER.SECURITY}
          Component={() => <SecurityScreen {...globalProps} />}
        />

        {/* Destination */}
        <Route 
          path={RouteName.USER.DESTINATION}
          Component={() => <DestinationScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.ADD_DESTINATION}
          Component={() => <AddDestinationScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.USER.EDIT_DESTINATION}
          Component={() => <EditDestinationScreen {...globalProps} />}
        />

        {/* Testing Purpose */}
        <Route
          path={RouteName.USER.TESTING}
          Component={() => <TestingScreen {...globalProps} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default UserRouterView;
