import HomeNavbar from "@/components/admin/navbar/HomeNavbar";
import MenuComponent from "@/components/admin/home/MenuComponent";
import SizeBox from "@/components/SizeBox";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import { GlobalProps } from "@/App";

const HomeScreen = ({setIsAdmin}:GlobalProps)=>{
    const navigate = useNavigate();

    const memus = [
        {
            title: "商品管理",
            actionList: [
                {
                    text: "商品一覧",
                    action: ()=>navigate(Routes.ADMIN.PRODUCT),
                    disable: false
                },
                {
                    text: "商品カテゴリ",
                    action: ()=>navigate(Routes.ADMIN.PRODUCT_CATEGORY),
                    disable: false
                }
            ]
        },
        {
            title: "在庫管理",
            actionList: [
                {
                    text: "在庫一覧",
                    action: ()=>navigate(Routes.ADMIN.WAREHOUSE),
                    disable: false
                },
            ]
        },
        {
            title: "ECサイト",
            actionList: [
                {
                    text: "注文",
                    action: ()=>navigate(Routes.ADMIN.ORDER),
                    disable: false
                },
                {
                    text: "顧客",
                    action: ()=> navigate(Routes.ADMIN.CUSTOMER),
                    disable: false
                },
                {
                    text: "商品レビュー",
                    action: ()=> navigate(Routes.ADMIN.REVIEW),
                    disable: false
                },
                {
                    text: "ポイント",
                    action: ()=> navigate(Routes.ADMIN.POINT),
                    disable: false
                },
                {
                    text: "定期購入",
                    action: ()=> navigate(Routes.ADMIN.REGULAR_PURCHASES),
                    disable: false
                },
            ]
        },
        {
            title: "出荷管理",
            actionList: [
                {
                    text: "配達",
                    action: ()=> navigate(Routes.ADMIN.DELIVERY),
                    disable: false
                },
            ]
        },
        {
            title: "設定",
            actionList: [
                {
                    text: "システム利用者設定",
                    action: ()=> navigate(Routes.ADMIN.SYSTEM_SETTINGS),
                    disable: false
                },
                // {
                //     text: "ポイント設定",
                //     action: ()=>{},
                //     disable: true
                // },
                // {
                //     text: "配送料金設定",
                //     action: ()=>{},
                //     disable: true
                // },
                // {
                //     text: "返品ルール",
                //     action: ()=>{},
                //     disable: true
                // },
                {
                    text: "マスタデータ設定",
                    action: ()=> navigate(Routes.ADMIN.MASTER_SETTINGS),
                    disable: false
                },
                // {
                //     text: "Chat Room",
                //     action: ()=>navigate(Routes.ADMIN.ChatScreen),
                //     disable: false
                // },
            ]
        },
        // {
        //     title: "API Integrate",
        //     actionList: [
        //         {
        //             text: "Group Chat",
        //             action: ()=>navigate(Routes.ADMIN.CHAT_REGISTER),
        //             disable: false
        //         },
        //         {
        //             text: "AWS S3",
        //             action: ()=>navigate(Routes.ADMIN.S3_TEST),
        //             disable: false
        //         },
        //         {
        //             text: "div_MPN",
        //             action: ()=>navigate(Routes.ADMIN.DIV_MPN),
        //             disable: false
        //         },
        //         {
        //             text: "div_AKM",
        //             action: ()=>navigate(Routes.ADMIN.DIV_AKM),
        //             disable: false
        //         },
        //         {
        //             text: "div_ANH",
        //             action: ()=>navigate(Routes.ADMIN.DIV_ANH),
        //             disable: false
        //         },
        //         {
        //             text: "div_PST",
        //             action: ()=>navigate(Routes.ADMIN.DIV_PST),
        //             disable: false
        //         },
        //         {
        //             text: "div_PPA",
        //             action: ()=>navigate(Routes.ADMIN.DIV_PPA),
        //             disable: false
        //         },

        //         {
        //             text: "div_SYN",
        //             action: ()=>navigate(Routes.ADMIN.DIV_SYN),
        //             disable: false
        //         },
        //         {
        //             text: "div_AMM",
        //             action: ()=>navigate(Routes.ADMIN.DIV_AMM),
        //             disable: false
        //         },
        //         {
        //             text: "div_TDN",
        //             action: ()=>navigate(Routes.ADMIN.DIV_TDN),
        //             disable: false
        //         },
        //         {
        //             text: "div_NYT",
        //             action: ()=>navigate(Routes.ADMIN.DIV_NYT),
        //             disable: false
        //         },
        //         {
        //             text: "div_TTEH",
        //             action: ()=>navigate(Routes.ADMIN.DIV_TTEH),
        //             disable: false
        //         },
        //         {
        //             text: "div_AYZ",
        //             action: ()=>navigate(Routes.ADMIN.DIV_AYZ),
        //             disable: false
        //         },
        //     ]
        // },
        // {
        //     title: "API Integrate Group 2",
        //     actionList: [
        //         {
        //             text: "DIV KMO",
        //             action: ()=>navigate(Routes.ADMIN.DIV_KMO),
        //             disable: false
        //         },
        //         {
        //             text: "DIV KZT",
        //             action: ()=>navigate(Routes.ADMIN.DIV_KZT),
        //             disable: false
        //         },
        //         {
        //             text: "DIV SST",
        //             action: ()=>navigate(Routes.ADMIN.DIV_SST),
        //             disable: false
        //         },
        //         {
        //             text: "DIV NDS",
        //             action: ()=>navigate(Routes.ADMIN.DIV_NWS),
        //             disable: false
        //         },
        //     ]
        // },
    ];

    return <div className="relative">
        <HomeNavbar 
            setIsAdmin={setIsAdmin} 
        />
        
        <SizeBox h={80} />

        <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-y-[70px] gap-x-[80px] mt-[50px]">
                {memus.map(({title,actionList})=>{
                    return <MenuComponent key={Math.random()} title={title} actionList={actionList} />
                })}
            </div>
        </div>

        <SizeBox h={100} />
    </div>
}

export default HomeScreen;