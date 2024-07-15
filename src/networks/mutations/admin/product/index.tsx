import create from "./create";
import { deleteProductById } from "./delete";
import { updateProductMode1 } from "./update";
import { updateProductMode2 } from "./update";
import { updateProductMode3 } from "./update";
import { updateProductMode4 } from "./update";
import { updateProductMode5 } from "./update";
import get from "./get";
import { getProductById } from "./getById";
import { getRegularPurchase } from "./get";
import { removeRegularPurchase } from "./removeRegularPurchase";

const product = {
  create,
  deleteProductById,
  updateProductMode1,
  updateProductMode2,
  updateProductMode3,
  updateProductMode4,
  updateProductMode5,
  get,
  getProductById,
  getRegularPurchase,
  removeRegularPurchase,
};

export default product;
