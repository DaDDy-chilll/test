import get from "./get";
import create from "./create";
import put from "./put";
import deleteMaster from "./delete";

// resource get, index, create, update, delete

const address = {
    get,
    create,
    put,
    delete: deleteMaster
}

export default address;