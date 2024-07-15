import whysupply from "@/assets/user/top_page/why_supplyment.png";
import SizeBox from "@/components/SizeBox";

const WhySupplyComponent = () => {
  return (
    <div className="container mx-auto pt-[70px] mb-[70px]">
      <div className="text-[30px] font-bold text-center pb-[80px]">
        なぜサプリメント必要？
      </div>
      <div className="flex flex-row">
        <div className="flex-[2] px-[70px]">
          <div className="mb-[70px]">
            <div className="flex flex-row">
              <div className="flex text-[25px] font-bold text-[#285DBD] tracking-[3px]">
                POINT
                <div className="w-[35px] h-[35px] rounded-full bg-[#285DBD] text-white text-center ml-[10px] tracking-[0px]">
                  1
                </div>
              </div>
            </div>
            <SizeBox h={15} />
            <div className="text-[16px] font-medium text-black">
              お年寄りや子供に必要なエネルギーは、食事から摂取することが不可
            </div>
          </div>
          <div className="mb-[70px]">
            <div className="flex flex-row">
              <div className="flex text-[25px] font-bold text-[#285DBD] tracking-[3px]">
                POINT
                <div className="w-[35px] h-[35px] rounded-full bg-[#285DBD] text-white text-center ml-[10px] tracking-[0px]">
                  2
                </div>
              </div>
            </div>
            <SizeBox h={15} />
            <div className="text-[16px] font-medium text-black">
              年齢や性別によって、1日に必要なカルシウム量は異なり
            </div>
          </div>
          <div className="mb-[0px]">
            <div className="flex flex-row">
              <div className="flex text-[25px] font-bold text-[#285DBD] tracking-[3px]">
                POINT
                <div className="w-[35px] h-[35px] rounded-full bg-[#285DBD] text-white text-center ml-[10px] tracking-[0px]">
                  3
                </div>
              </div>
            </div>
            <SizeBox h={15} />
            <div className="text-[16px] font-medium text-black">
              市場にはさまざまなサプリメントがあるが、その中で自分に最適なものを見つけることが肝要
            </div>
          </div>
        </div>
        <div className="flex-[1]">
          <img src={whysupply} alt="なぜサプリメント必要？" />
        </div>
      </div>
    </div>
  );
};

export default WhySupplyComponent;
