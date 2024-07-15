import get from "./get";
import create from "./create";
import update from "./update";
import deleteAddress from "./delete";

const deliveryAddress = {
  get,
  create,
  update,
  delete: deleteAddress
};

export default deliveryAddress;