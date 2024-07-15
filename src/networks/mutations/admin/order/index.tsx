import get from "./get";
import getDetail from "./getDetail";
import put from "./put";
import { declineOrder } from "./decline";
import getDelivery from "./getDelivery";
import orderInfoApproval from "./orderInfoApproval";
import updateMultiple from "./updateMultiple";

// resource get, index, create, update, delete

const order = {
  get,
  getDelivery,
  getDetail,
  put,
  orderInfoApproval,
  declineOrder,
  updateMultiple,
};

export default order;
