import create from "./create";
import deleteMaster from "./delete";
import get from "./get";
import update from "./update";

// resource get, index, create, update, delete



const master = {
    get,
    create,
    update,
    delete: deleteMaster
}

export default master;