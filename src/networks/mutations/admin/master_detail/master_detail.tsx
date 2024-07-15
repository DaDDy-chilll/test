import create from "./create";
import deleteMasterDetail from "./delete";
import get from "./get";
import update from "./update";

// resource get, index, create, update, delete



const MasterDetail = {
    get,
    create,
    update,
    delete: deleteMasterDetail
}

export default MasterDetail;