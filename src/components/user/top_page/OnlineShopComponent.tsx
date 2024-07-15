import stock from "@/assets/user/top_page/Delivery.png";
import SizeBox from "@/components/SizeBox";
import Helper from "@/helpers";
import { Divider } from "@mui/material";

const OnlineShopComponent = ()=>{
    return <div className="flex flex-row">
        <div className="flex-[15] flex flex-col items-center justify-center w-[50%] box-border bg-gradient-to-b from-[#7AB8E778] to-[#285DBDA8]">
            <div className="text-primary text-[24px] font-semibold  tracking-[10px] ">オンラインショップ</div>
            <div className="uppercase text-white text-[100px] opacity-70">ONLINE</div>
            <div className="uppercase text-white text-[100px] opacity-70">SHOP</div>
            <div className=""><img src={stock} className="w-[200px] h-[200px] "/></div>
            {/* <img src={stock} className="w-full h-full"/> */}
        </div>
        <div className="flex-[20] w-[49%] flex flex-col bg-[#7AB8E7] bg-opacity-30 pl-[65px] box-border py-[30px] pr-[30px]">
            <div className="flex-[6] flex flex-col justify-center">
                <div className="bg-primary text-[14px] rounded-[10px] text-white w-fit font-semibold py-[8px] px-[45px]">単品購入</div>
                <SizeBox h={35} />
                <div className="flex flex-row pb-[20px] items-end">
                    <div className="font-bold text-[40px]">{Helper.japaneseNumberFormat({number: 16000})}</div>
                </div>
            </div>
            <Divider style={{height: 0.5}} className=""/>
            <SizeBox h={35} />
            <div className="flex-[7] flex flex-col justify-center">
                <div className="bg-primary text-[14px] rounded-[10px] text-white w-fit font-semibold py-[8px] px-[45px]">定期購入</div>
                <SizeBox h={35} />            
                <div className="flex flex-row items-center">
                    <div className="font-bold text-[40px]">{Helper.japaneseNumberFormat({number: 15200})}</div>
                    <div className="font-bold ml-5 text-[#FF0303] text-[18px]"> <del>{Helper.japaneseNumberFormat({number: 16000})}</del> <span>(5% Off)</span></div>
                </div>
                <SizeBox h={15} />
            </div>
            <Divider style={{height: 0.5}} className=""/>
            <SizeBox h={35} />
            <div className="flex-[7] flex flex-col justify-center">
                <div className="bg-[#F0C300] text-[14px] rounded-[10px] text-white w-fit font-semibold py-[8px] px-[45px]">3つセット単品購入</div>
                <SizeBox h={35} />            
                <div className="flex flex-row items-center">
                    <div className="font-bold text-[40px]">{Helper.japaneseNumberFormat({number: 44160})}</div>
                    <div className="font-bold ml-5 text-[#FF0303] text-[18px]"> <del>{Helper.japaneseNumberFormat({number: 48000})}</del> <span>(8% Off)</span></div>
                </div>
                <SizeBox h={15} />
            </div>
            <Divider style={{height: 0.5}} className=""/>
            <SizeBox h={35} />
            <div className="flex-[7] flex flex-col justify-center">
                <div className="bg-[#F0C300] text-[14px] rounded-[10px] text-white w-fit font-semibold py-[8px] px-[45px]">3つセット定期購入</div>
                <SizeBox h={35} />            
                <div className="flex flex-row items-center">
                    <div className="font-bold text-[40px]">{Helper.japaneseNumberFormat({number: 43200})}</div>
                    <div className="font-bold ml-5 text-[#FF0303] text-[18px]"> <del>{Helper.japaneseNumberFormat({number: 48000})}</del> <span>(10% Off)</span></div>
                </div>
                <SizeBox h={15} />
            </div>
        </div>
    </div>
}

export default OnlineShopComponent;