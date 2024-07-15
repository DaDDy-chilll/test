export type Cart = {
  cartId: number;
  productId: number;
  qty: number;
};
export type subNavItemsProp = {
  Title: React.ElementType | string;
  route?: string | null;
  active?: boolean;
  badge?: number;
};
export type Customer = {
  customerId: number;
  name: string;
  orderDate: string;
};

export type Order = {
  orderId: number;
  detail: Array<Cart>;
  customer: Customer;
};

export interface OrderProp {
  customerId: number;
  orderId: number;
}

export type Product = {
  productId: number;
  productName: string;
  productTitle: string;
  productCode: string;
  productPhoto: Array<string>;
  productCategory: string;
  subCategory: string;
  buyPrice: number;
  taxPercent: number;
  sellPrice: number;
  subscribeFactor: number;
  status: number;
  desciptionTitle: string;
  desciption: string;
  productBgColor: string;
};

export type ProductOrder = {
  productId: number;
  productName: string;
  productTitle: string;
  productCode: string;
  productPhoto: Array<string>;
  taxPercent: number;
  status: number;
  customerName: string;
  customerCode: string;
  orderDate: string;
  totalAmount: number;
  deliveryFees: string;
  paymentService: string;
  paymentDate: string;
  destination: string;
  shipping: string;
  expectedShipping: string;
};

export type CustomerOrder = {
  customerId: number;
  customerCode: string;
  customerName: string;
  customerNameKana: string;
  mailAddress: string;
  phoneNumber: string;
  birthDate: string;
  postalCode: string;
  address: string;
  status: number;
};

export type Delivery = {
  deliveryId: number;
  orderCode: string;
  shippingCode: string;
  products: Array<Product>;
  customerCode: string;
  customerName: string;
  orderDate: string;
  deliveryFees: string;
  destination: string;
  shippingDate: string;
  expectedShippingDate: string;
  status?: number;
};

export type Review = {
  reviewId: number;
  reviewDate: string;
  customerCode: string;
  customerName: string;
  products: Array<Product>;
  reviewTitle: string;
  reviewContent: string;
  reviewRank: string;
  status: number;
  approver?: string;
};

export type Point = {
  pointId: number;
  customerCode: string;
  customerName: string;
  pointAmount: number;
};

export type PointDetail = {
  pointId: number;
  customerCode: string;
  customerName: string;
  pointAmount: number;
  pointStatus: number;
  pointAward: number;
  date: string;
};

export type User = {
  userId: number;
  userCode: string;
  userName: string;
  userNameKana: string;
  authority: string;
  mailAddress: string;
  phoneNumber: string;
  status: number;
};

export type Classification = {
  classificationId: number;
  classificationName: string;
  classificationValue: number;
  classificationType: string;
};

export type AddressMaster = {
  addressId: number;
  postalCode: string;
  prefectures: string;
  addressName: string;
  address: string;
};

export type Purchase = {
  purchaseId: number;
  customerCode: string;
  customerName: string;
  customerNameKana: string;
  customerMailAddress: string;
  customerPhoneNumber: string;
  products: Array<Product>;
  finalPurchaseDate: string;
  nextDeliveryDate: string;
  nextDeliveryQuantity: number;
  purchaseType: string;
};

export type WarehouseRecord = {
  recordId: number;
  type: number;
  quantity: number;
  date: string;
  inCharge: string;
  orderCode: string;
  customerCode: string;
  customerName: string;
  deliveryDate: string;
}

export interface AddCartProp {
  productId: number;
  qty: number;
}

export interface Address {
  addressId: number;
  name: string;
  postCode: string;
  address: string;
  phone: string;
}

export interface Warehouse {
  productId: number;
  inventory: number;
}
