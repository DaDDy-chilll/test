import create from "./create";
import deleteMaster from "./delete";
import get from "./get";
import update from "./update";

const productCategory = {
  create,
  delete: deleteMaster,
  get,
  update,
};

export default productCategory;
