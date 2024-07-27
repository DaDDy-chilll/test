
import user from "./user";
import auth from "./auth";

import pub from "./pub";
import cart from "./user/cart";

const mutations = {
    auth,
    user,
    pub,
    cart
}

export default mutations;

export type MutationType = typeof mutations;
