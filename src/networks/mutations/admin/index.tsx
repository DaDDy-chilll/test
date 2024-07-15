import customer from "./customer/customer";
import paymentServiceinfo from "./paymentserviceinfo/paymentserviceinfo";
import receiveAccountinfo from "./receiveaccountinfo/receiveaccountinfo";
import { awsStroageS3 } from "./aws_stroage_s3";
import inventory from "./inventory_import/inventory";
import master from "./master/master";
import masterDetail from "./master_detail/master_detail";
import productPhoto from "./product_photo";
import getUserPoint from "./userPoint";
import inventoryExport from "./inventory_export";
import productCategory from "./product_category";
import { productSubCategory } from "./product_sub_category";
import productReturnPolicy from "./productReturnPolicy/productReturnPolicy";
// import productCategory from "./product_category/productCategory";
import product_category from "./product_category/product_category";
import order from "./order";
import product from "./product";
import citywardtown from "./city_ward_town";
import prefecture from "./prefecture";
import list from "./list/get";
import deleteAdmin from "./list/delete";
import updateAdmin from "./list/update";
import createAdmin from "./list/create";
import productReviewList from "./product_review/get";
import shoninProductReview from "./product_review/shonin_product_review";
import warehouseDetail from "./warehouse_detail/warehouseDetail";
import warehouseTransaction from "./warehouse_transaction/warehouseTransaction";
import {productReview} from "../admin/product_review";
import regularPurchase from "./regular_purchase/regularPurchase";
import point from "./point/point"

const admin = {
  productPhoto,
  master,
  getUserPoint,
  awsStroageS3,
  inventory,
  productSubCategory,
  customer,
  inventoryExport,
  productReturnPolicy,
  masterDetail,
  paymentServiceinfo,
  receiveAccountinfo,
  productCategory,
  product_category,
  order,
  product,
  citywardtown,
  prefecture,
  regularPurchase,
  list,
  deleteAdmin,
  updateAdmin,
  createAdmin,
  productReviewList,
  shoninProductReview,
  productReview,
  warehouseDetail,
  warehouseTransaction,
  point,
};

export default admin;
