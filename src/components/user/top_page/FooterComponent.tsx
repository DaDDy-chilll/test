import SizeBox from "@/components/SizeBox";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const FooterComponent = ()=>{
    const footerItems = [
        {
            title: "運用会社情報",
            items: [
                {
                    label: "株式会社ユーフォリプラス",
                    action: ()=>{}
                }
            ]
        },
        {
            title: "ヘルプ & ガイド",
            items: [
                {
                    label: "FAQ",
                    action: ()=>{}
                },
            ]
        },
        {
            title: "商品",
            items: [
                {
                    label: "8030カルシウムプラス",
                    action: ()=>{}
                },
                {
                    label: "エイペクセル キトサン",
                    action: ()=>{}
                },
                {
                    label: "セレン酵母",
                    action: ()=>{}
                },
            ]
        },
        {
            title: "その他",
            items: [
                {
                    label: "問い合わせ",
                    action: ()=>{}
                }
            ]
        },
    ];

    return <><div className="pl-[90px] pt-[60px] pb-[50px] flex flex-row bg-primary">
        {/* Footer Nav Group */}
        { 
            footerItems.map(({title,items})=>{
                return <div key={Math.random()} className="flex-1 text-white">
                    <div className="text-[20px] mb-[20px]">{title}</div>
                    {
                        items.map(({label,action})=>{
                            return <div key={Math.random()} onClick={action} className="ml-[12px] font-thin flex flex-row mb-[20px] text-[15px] nav">
                                <KeyboardDoubleArrowRightIcon />
                                <SizeBox w={5} />
                                {label}
                            </div>
                        })
                    }
                </div>
            })
        }
    </div>

    {/* Copyright */}
    <div className="flex flex-row h-[50px] justify-center items-center text-[15px] text-white bg-black opacity-80">© Copyright 株式会社ユーフォリアプラス. All Rights Reserved</div>
    </>
}

export default FooterComponent;