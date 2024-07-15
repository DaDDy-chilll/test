import { GlobalProps } from "@/App";
// import DivMPN from "@/screens/admin/api_testing/div_mpn_screen";
// import DivAKM from "@/screens/admin/api_testing/div_akm_screen";
// import DivANH from "@/screens/admin/api_testing/div_anh_screen";
// import DivPST from "@/screens/admin/api_testing/div_pst_screen";
// import DivPPA from "@/screens/admin/api_testing/div_ppa_screen";
// import DivAMM from "@/screens/admin/api_testing/div_amm_screen";
// import DivTDN from "@/screens/admin/api_testing/div_tdn_screen";
// import DivNYT from "@/screens/admin/api_testing/div_nyt_screen";
// import DivTTEH from "@/screens/admin/api_testing/div_tteh_screen";
// import DivAYZ from "@/screens/admin/api_testing/div_ayz_screen";
// import DivSYN from "@/screens/admin/api_testing/div_syn_screen";
// import DivKMO from "@/screens/admin/api_testing_g2/div_kmo_screen";
// import DivKZT from "@/screens/admin/api_testing_g2/div_kzt_screen";
// import DivSST from "@/screens/admin/api_testing_g2/div_sst_screen";
// import DivNWS from "@/screens/admin/api_testing_g2/div_nws_screen";
// import DivKMOAdminUpdate from "@/screens/admin/api_testing_g2/div_kmo_admin_update_screen";
// import DivKMOAdminCreate from "@/screens/admin/api_testing_g2/div_kmo_admin_create_screen";
// import DivKMOProductReviewList from "@/screens/admin/api_testing_g2/div_kmo_product_review_list_screen";
import S3TestingScreen from "@/screens/admin/api_testing/Circle";
import { Route, Routes } from "react-router-dom";
import RouteName from "./routes";
import ChatScreen from "@/screens/admin/api_testing/ChatScreen";
import ChatRoom from "@/screens/admin/api_testing/ChatRoom";

const ApiIntegrateGroup = ({}: {globalProps:GlobalProps})=>{
    return <Routes>
         <Route
            path={RouteName.ADMIN.S3_TEST}
            Component={()=><S3TestingScreen />}
        />
        <Route 
            path={RouteName.ADMIN.ChatScreen}
            Component={ChatScreen}
        />

        <Route 
            path={RouteName.ADMIN.ChatRoom}
            Component={ChatRoom}
        />

        {/* <Route
            path={RouteName.ADMIN.DIV_MPN}
            Component={()=><DivMPN {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_AKM}
            Component={()=><DivAKM {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_ANH}
            Component={()=><DivANH {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_PST}
            Component={()=><DivPST {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_PPA}
            Component={()=><DivPPA {...globalProps} />}
        />
          <Route
            path={RouteName.ADMIN.DIV_AMM}
            Component={()=><DivAMM {...globalProps} />}
        />
          <Route
            path={RouteName.ADMIN.DIV_TDN}
            Component={()=><DivTDN {...globalProps} />}
        />
          <Route
            path={RouteName.ADMIN.DIV_NYT}
            Component={()=><DivNYT {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_TTEH}
            Component={()=><DivTTEH {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_AYZ}
            Component={()=><DivAYZ {...globalProps} />}
        />

        <Route
            path={RouteName.ADMIN.DIV_SYN}
            Component={()=><DivSYN {...globalProps} />}
        /> */}

        {/* API Testing Group 2*/}
        {/* <Route
            path={RouteName.ADMIN.DIV_KMO}
            Component={()=><DivKMO {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_KZT}
            Component={()=><DivKZT {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_SST}
            Component={()=><DivSST {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.DIV_NWS}
            Component={()=><DivNWS {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.EDIT_ADMIN}
            Component={()=><DivKMOAdminUpdate {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.CREATE_ADMIN}
            Component={()=><DivKMOAdminCreate {...globalProps} />}
        />
        <Route
            path={RouteName.ADMIN.PRODUCT_REVIEW}
            Component={()=><DivKMOProductReviewList {...globalProps} />}
        /> */}
    </Routes>
}

export default ApiIntegrateGroup;