import { OrderDetailForCustomerRes } from "../order";

export type OrderDeclineReq = {
  //order_decline_id: number;
  order_id:number;
  status: number;
  type: number;
  reason_id:number;
  reason_detail: string;
  reject_reason:string;
  // created_at:string;
  // updated_at: string;
};

export type OrderCancelRes ={
  order ?: CustomerOrder;
  order_decline_id: number;
  order_id:number;
  status: number;
  type: number;
  reason_id: number;
  reason_detail: string;
  reject_reason: string;
  created_at: string;
  updated_at:string;
  order_detail : Array<OrderDetailForCustomerRes>;
}

type CustomerOrder ={
  order_id: number;
  order_code: string;
  name: string;
  address:  string;
  post_code: string;
  phone: string;
  created_at: string;
}

