import SizeBox from "@/components/SizeBox";
import nano14 from "@/assets/user/product_detail/specification/product_nano/nano_img14.png";
import nano15 from "@/assets/user/product_detail/specification/product_nano/nano_img15.png";
import nano16 from "@/assets/user/product_detail/specification/product_nano/nano_img16.png";
import nano17 from "@/assets/user/product_detail/specification/product_nano/nano_img17.png";
import nano18 from "@/assets/user/product_detail/specification/product_nano/nano_img18.png";
import nano19 from "@/assets/user/product_detail/specification/product_nano/nano_img19.png";
import nano20 from "@/assets/user/product_detail/specification/product_nano/nano_img20.png";
import nano21 from "@/assets/user/product_detail/specification/product_nano/nano_img21.png";
import nano22 from "@/assets/user/product_detail/specification/product_nano/nano_img22.png";
import nano23 from "@/assets/user/product_detail/specification/product_nano/nano_img23.png";
import nano24 from "@/assets/user/product_detail/specification/product_nano/nano_img24.png";
import nano25 from "@/assets/user/product_detail/specification/product_nano/nano_img25.png";
import nano26 from "@/assets/user/product_detail/specification/product_nano/nano_img26.png";
import nano27 from "@/assets/user/product_detail/specification/product_nano/nano_img27.png";
import nano28 from "@/assets/user/product_detail/specification/product_nano/nano_img28.png";

const Certificate = () => {
    const certificateList = [
        {
            id: 1,
            img: nano14,
            img_name: "ISO 14001"
        },
        {
            id: 2,
            img: nano15,
            img_name: "ISO 9001"
        },
        {
            id: 3,
            img: nano16,
            img_name: "特許スター企業指定証"
        },
        {
            id: 4,
            img: nano17,
            img_name: "チャン・ヨンシル科学技術大賞"
        },
        {
            id: 5,
            img: nano18,
            img_name: "世界女性発明（金賞）"
        },
        {
            id: 6,
            img: nano19,
            img_name: "米国特許"
        },
        {
            id: 7,
            img: nano20,
            img_name: "中国特許"
        },
        {
            id: 8,
            img: nano21,
            img_name: "技術革新型イノビズ証明書"
        },
        {
            id: 9,
            img: nano22,
            img_name: "国務総理賞"
        },
        {
            id: 10,
            img: nano23,
            img_name: "機能性営業許可証"
        },
        {
            id: 11,
            img: nano24,
            img_name: "GMP証明書"
        },
        {
            id: 12,
            img: nano25,
            img_name: "輸出有望中小企業"
        },
        {
            id: 13,
            img: nano26,
            img_name: "ハラル"
        },
        {
            id: 14,
            img: nano27,
            img_name: "IP経営証明書"
        },
        {
            id: 15,
            img: nano28,
            img_name: "グローバルIPスター企業"
        }
    ];

    return <div>
        <div className="rounded-[10px] bg-[#F2F5FB] pt-[40px] pr-[80px] pb-[30px] pl-[70px]">
            <div className="text-[20px] text-[#285DBD] text-center font-bold">資格</div>
            <SizeBox h={30} />
            <div className="grid grid-cols-6 gap-4 lg:mx-[50px]">
                {
                    certificateList.map(({id, img, img_name}) => {
                        return <div key={id} className="mx-auto text-center mb-[15px]">
                            <img src={img} alt={img_name} />                         
                            <div className="text-[#000000cc] text-[10px] font-medium leading-[26px]">{img_name}</div>                            
                        </div>
                    })
                }
            </div>
            
        </div>
    </div>
}
export default Certificate;


