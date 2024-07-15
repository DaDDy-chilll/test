import create from "./create";
import deleteReceiveAccountInfo from "./delete";
import get from "./get";
import update from "./update";
import search from "./search";

// resource get, index, create, update, delete



const receiveAccountinfo = {
    get,
    create,
    update,
    search,
    delete: deleteReceiveAccountInfo
}

export default receiveAccountinfo;