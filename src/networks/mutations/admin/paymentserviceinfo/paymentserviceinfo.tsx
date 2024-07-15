import create from "./create";
import deletePaymentServiceInfo from "./delete";
import get from "./get";
import update from "./update";
import search from "./search";

// resource get, index, create, update, delete



const paymentServiceinfo = {
    get,
    create,
    update,
    search,
    delete: deletePaymentServiceInfo
}

export default paymentServiceinfo;