
enum ADMIN {
    HOME = "/",
    // 商品管理
    PRODUCT = "/admin/product",
    PRODUCT_DETAIL = "/admin/product/detail",
    CREATE_PRODUCT = "/admin/product/create",

    PRODUCT_CATEGORY = "/admin/product/category",    

    // ECサイト 
    ORDER = "/admin/order",
    ORDER_DETAIL = "/admin/order/detail",

    // 在庫管理
    WAREHOUSE = "/admin/warehouse",
    SHIPPING = "/admin/warehouse/shipping",
    RECORD = "/admin/warehouse/record",

    CUSTOMER = "/admin/customer",
    CUSTOMER_DETAIL = "/admin/customer/detail",

    DELIVERY = "/admin/delivery",

    REVIEW = "/admin/review",

    POINT = "/admin/point",
    POINT_HISTORY = "/admin/point/history",

    SYSTEM_SETTINGS = "/admin/system_settings",
    CREATE_USER = "/admin/system_settings/create_user",
    EDIT_USER = "/admin/system_settings/edit_user",

    MASTER_SETTINGS = "/admin/master_settings",

    REGULAR_PURCHASES = "/admin/regular_purchases",

    TESTING = "/test",

    EDIT_ADMIN = "/admin/:id",
    CREATE_ADMIN = "/admin/create",

    PRODUCT_REVIEW = "/admin/product_review",

    // API Testing Team
    S3_TEST = "/admin/s3-test",

    ChatScreen = "/admin/chat-screen",
    ChatRoom = "/admin/chat-room",

    DIV_MPN = "/admin/div-mpn",
    DIV_AKM = "/admin/div-akm",
    DIV_ANH = "/admin/div-anh",
    DIV_PST = "/admin/div-pst",
    DIV_PPA = "/admin/div-ppa",


    DIV_AMM = "/admin/div-amm",
    DIV_TDN = "/admin/div-tdn",
    DIV_NYT = "/admin/div-nyt",
    DIV_TTEH = "/admin/div-tteh",
    DIV_AYZ = "/admin/div-ayz",
    DIV_SYN = "/admin/div-syn",

    DIV_KMO = "/admin/div-kmo",
    DIV_KZT = "/admin/div-kzt",
    DIV_SST = "/admin/div-sst",
    DIV_NWS = "/admin/div-nws",

    // Chatting
    CHAT_REGISTER = "/admin/chat-register",
    CHAT_ROOM = "/admin/chat-room"
}

enum USER {
    TOP_PAGE = "/",

    // Auth
    LOGIN = "/login",
    FORGOT_PASSWORD = "/forgot_password",
    RESET_PASSWORD = "/reset_password",
    REGISTER = "/register",

    PRODUCT = "/product",
    PRODUCT_DETAIL = "/product/detail",

    CART = "/cart",
    DELIVERY_ADDRESS = "/cart/delivery_address",
    CHECKOUT = "/cart/checkout",

    TESTING = "/test",

    ACCOUNT = "/account",

    ORDER = "/order",
    ORDER_DETAIL = "/order/detail",
    DELIVERY_STATUS = "/order/delivery_status",
    RETURN_PRODUCTS = "/order/return_products",
    CANCEL_PRODUCTS = "/order/cancel_products",

    SECURITY = "/security",

    DESTINATION = "/destination",
    ADD_DESTINATION = "/destination/add",
    EDIT_DESTINATION = "/destination/edit",
}
export const UserProductRoutes = [
    USER.PRODUCT,USER.PRODUCT_DETAIL
]

export default {ADMIN,USER};