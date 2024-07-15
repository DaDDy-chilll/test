import HomeScreen from "@/screens/admin/home/HomeScreen";
import ProductScreen from "@/screens/admin/product/ProductScreen";
import CreateProductScreen from "@/screens/admin/product/CreateProductScreen";
import OrderScreen from "@/screens/admin/order/OrderScreen";
import WarehouseScreen from "@/screens/admin/warehouse/WarehouseScreen";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteName from "./routes";
import { GlobalProps } from "@/App";
import TestingScreen from "@/screens/TestingScreen";
import ProductDetailScreen from "@/screens/admin/product/ProductDetailScreen";
import ProductCategoryScreen from "@/screens/admin/product/category/ProductCategoryScreen";
import OrderDetailScreen from "@/screens/admin/order/OrderDetailScreen";
import CustomerScreen from "@/screens/admin/customer/CustomerScreen";
import DeliveryScreen from "@/screens/admin/delivery/DeliveryScreen";
import ReviewScreen from "@/screens/admin/review/ReviewScreen";
import PointScreen from "@/screens/admin/point/PointScreen";
import PointHistroyScreen from "@/screens/admin/point/PointHistoryScreen";
import SystemSettingsScreen from "@/screens/admin/settings/SystemSettingsScreen";
import CreateUserScreen from "@/screens/admin/settings/CreateUserScreen";
import EditUserScreen from "@/screens/admin/settings/EditUserScreen";
import MasterSettingsScreen from "@/screens/admin/settings/MasterSettingsScreen";
import RegularPurchaseScreen from "@/screens/admin/purchase/RegularPurchaseScreen";
import ShippingScreen from "@/screens/admin/warehouse/ShippingScreen";
import RecordScreen from "@/screens/admin/warehouse/RecordScreen";
import CustomerDetailScreen from "@/screens/admin/customer/CustomerDetailScreen";
import ApiIntegrateGroup from "./ApiIntegrateGroup";

const AdminRouterView = ({ globalProps }: { globalProps: GlobalProps }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RouteName.ADMIN.HOME}
          Component={() => <HomeScreen {...globalProps} />}
        />

        {/* Product */}
        <Route
          path={RouteName.ADMIN.PRODUCT}
          Component={() => <ProductScreen {...globalProps} />}
        />
        <Route
          path={RouteName.ADMIN.PRODUCT_DETAIL}
          Component={() => <ProductDetailScreen {...globalProps} />}
        />
        <Route
          path={RouteName.ADMIN.CREATE_PRODUCT}
          Component={() => <CreateProductScreen {...globalProps} />}
        />

        <Route
          path={RouteName.ADMIN.PRODUCT_CATEGORY}
          Component={() => <ProductCategoryScreen {...globalProps} />}
        />

        {/* Order */}
        <Route
          path={RouteName.ADMIN.ORDER}
          Component={() => <OrderScreen {...globalProps} />}
        />

        {/* Testing Purpose */}
        <Route
            path={RouteName.ADMIN.TESTING}
            Component={()=><TestingScreen {...globalProps} />}
        />

        <Route
          path={RouteName.ADMIN.ORDER_DETAIL}
          Component={() => <OrderDetailScreen {...globalProps} />}
        />

        {/* Warehouse */}
        <Route
          path={RouteName.ADMIN.WAREHOUSE}
          Component={() => <WarehouseScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.ADMIN.SHIPPING}
          Component={() => <ShippingScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.ADMIN.RECORD}
          Component={() => <RecordScreen {...globalProps} />}
        />

        {/* Delivery */}
        <Route
          path={RouteName.ADMIN.DELIVERY}
          Component={() => <DeliveryScreen {...globalProps} />}
        />

        {/* PURCHASES */}
        <Route 
          path={RouteName.ADMIN.REGULAR_PURCHASES}
          Component={() => <RegularPurchaseScreen {...globalProps} />}
        />

        {/* Revivew */}
        <Route
          path={RouteName.ADMIN.REVIEW}
          Component={() => <ReviewScreen {...globalProps} />}
        />

        {/* Customer */}
        <Route
          path={RouteName.ADMIN.CUSTOMER}
          Component={() => <CustomerScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.ADMIN.CUSTOMER_DETAIL}
          Component={() => <CustomerDetailScreen {...globalProps} />}
        />

        {/* POINT */}
        <Route
          path={RouteName.ADMIN.POINT}
          Component={() => <PointScreen {...globalProps} />}
        />

        <Route 
            path={RouteName.ADMIN.POINT_HISTORY}
            Component={() => <PointHistroyScreen {...globalProps} />}
        />

        {/* SETTINGS */}
        <Route 
          path={RouteName.ADMIN.SYSTEM_SETTINGS}
          Component={() => <SystemSettingsScreen {...globalProps} />}
        />

        <Route 
          path={RouteName.ADMIN.CREATE_USER}
          Component={() => <CreateUserScreen {...globalProps} />}
        />
        
        <Route 
          path={RouteName.ADMIN.EDIT_USER}
          Component={() => <EditUserScreen {...globalProps} />}
        />

        {/* MASTER SETTINGS */}
        <Route 
          path={RouteName.ADMIN.MASTER_SETTINGS}
          Component={() => <MasterSettingsScreen {...globalProps} />}
        />

        {/* API Testing */}
        <Route 
          path="/*"
          Component={()=><ApiIntegrateGroup globalProps={globalProps}  />}
        />
        
      </Routes>
    </BrowserRouter>
  );
};
export default AdminRouterView;
