import ShopLogo from "@/assets/user/top_page/shopLogo.png";

interface PlanCardProps {
  title: string;
  price: number;
  percentage?: number;
  status?: boolean;
}

const ChoosePlanComponent = () => {
  return (
    <div className="bg-secondaryBackgroundColor h-[50vh] px-28 py-16 flex">
      <div className=" text-primaryColor space-y-3 w-1/5">
        <img src={ShopLogo} alt="Shop Logo" className="w-[40px]" />
        <p className="uppercase tracking-widest">
          Select <br /> your plan
        </p>
        <p className="text-3xl font-bold whitespace-nowrap">購入プラン</p>
      </div>

      <div className="flex items-center justify-between w-4/5">
        <PlanCard title="単品購入" price={16000} />
        <PlanCard title="定期購入" price={16000} percentage={5} />
        <PlanCard
          title="３つセット単品購入"
          price={48000}
          percentage={8}
          status={true}
        />
        <PlanCard
          title="３つセット定期購入"
          price={48000}
          percentage={10}
          status={true}
        />
      </div>
    </div>
  );
};

const PlanCard = ({ title, price, percentage, status }: PlanCardProps) => {
  return (
    <div className="rounded-xl border-2 overflow-hidden w-[200px] h-[260px]">
      <div
        className={`text-center py-4 border-b-2 ${
          status ? "bg-additionalBackgroundColor" : "bg-tertiaryBackgroundColor"
        }`}
      >
        <p className={` text-xs ${status ? "text-black" : "text-white"}`}>
          {title}
        </p>
      </div>

      <div className="py-4 space-y-3 flex flex-col items-center">
        <div className="text-2xl tracking-wider relative">
          <p>{price.toLocaleString()} <span className="text-xs">円</span></p>

          {percentage && <div className="w-full h-[2px] bg-red-500 absolute top-4 left-0 -skew-y-12"></div>}
        </div>
        {!percentage && <p className="text-xs">（税込）</p>}
        {percentage && (
          <div className="py-2 bg-secondaryColor w-24 rounded-md flex justify-center">
            <p className=" font-semibold text-red-500">{percentage}% Off</p>
          </div>
        )}
        {percentage && (
          <p className="text-2xl tracking-wider">
            {(price - price * (percentage / 100)).toLocaleString()}{" "}
            <span className="text-xs">円</span>
          </p>
        )}
        {percentage && <p className="text-xs">（税込）</p>}
      </div>
    </div>
  );
};

export default ChoosePlanComponent;
