import get from "./get";
import index from "./index";
import create from "./create";
import update from"./update";
import deleteMaster from "./delete";
import changepassword from "./changepassword";

const customer ={
    
    get,
    index,
    create,
    update,
    delete: deleteMaster,
    changepassword
}

export default customer;