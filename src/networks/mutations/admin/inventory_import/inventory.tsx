import createInventoryImportInfo from "./create";
import deleteInventoryImport from "./delete";
import getProductImportInfo from "./get";
import updateInventoryImportInfo from "./update";

const inventory = {
  get: getProductImportInfo,
  delete: deleteInventoryImport,
  create: createInventoryImportInfo,
  update: updateInventoryImportInfo,
};

export default inventory;
