import admin from "./admin";
import user from "./user";
import auth from "./auth";
import test from "./test";
import pub from "./pub";
import cart from "./user/cart";

const mutations = {
    auth,
    admin,
    test,
    user,
    pub,
    cart
}

export default mutations;

export type MutationType = typeof mutations;
