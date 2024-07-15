import create from "./create";
import get from "./get";
import update from "./update";
import deleteMaster from "./delete";
export const productSubCategory = {
  create,
  get,
  update,
  delete: deleteMaster
};
