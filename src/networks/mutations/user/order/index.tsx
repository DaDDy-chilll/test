import get from "./get";
import createOrder from "./create";
import getAddress from "./getAddressForOrder";
import createOrderDeclineReturn from "./createOrderDeclineReturn";
import createOrderDeclineCancel from "./createOrderDeclineCancel";
import getOrderCancel from "./getOrderCancel";

const order ={ 
    get,
    createOrder,
    getAddress,
    createOrderDeclineReturn,
    createOrderDeclineCancel,
    getOrderCancel,
}

export default order;