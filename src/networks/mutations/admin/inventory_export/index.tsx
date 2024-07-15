import create from "./create";
import deleteInventoryExport from "./delete";
import get from "./get";
import update from "./update";
import searchShipping from "./search_shipping";

// resource get, index, create, update, delete



const inventory_export = {
    searchShipping,
    get,
    create,
    update,
    delete: deleteInventoryExport
}

export default inventory_export;