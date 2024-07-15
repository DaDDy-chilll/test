import index from "./index";
import create from "./create";
import update from "./update";
import deleteProductReturnPolicy from "./delete";

const productReturnPolicy = {
    index,
    create,
    update,
    delete : deleteProductReturnPolicy
}
export default productReturnPolicy;