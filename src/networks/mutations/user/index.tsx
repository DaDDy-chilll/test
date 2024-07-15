import address from "./address";
import cart from "./cart";
import order from "./order";
import productReview from "./productReview";
import product from "./product";
import getDeliveryAddressList from "./deliveryAddress";
import productSubscribe from "./productSubscribe";
import customerLoginAndSecurity from "./loginandsecurity/loginandsecurity";
import deliveryAddress from "./deliveryAddress";

const user = {
    order,
    cart,
    product,
    address,
    productReview,
    productSubscribe,
    getDeliveryAddressList,
    customerLoginAndSecurity,
    deliveryAddress
}

export default user;