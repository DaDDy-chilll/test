import PurposePng from "@/assets/user/top_page/purpose.png";
import SizeBox from "@/components/SizeBox";

const PurposeComponent = () => {
  return (
    <div className=" bg-secondaryBackgroundColor w-screen h-[65vh] flex flex-col items-center justify-center space-y-4 text-xs">
      <p className="text-xl font-bold text-primaryColor">家族と健康</p>
      <img src={PurposePng} alt="Purpose Icon" className="w-[40px]" />
      <p className="text-primaryColor">それらは何よりも大事</p>
      <SizeBox h={2} />
      <p>人生で今が最高と感動に包まれます。</p>
      <p>年齢を気にせず、元気に生活できることは喜びそのものです。</p>
      <p>
        1日に必要な栄養は、まさに「ナノ技術を駆使した」サプリメントで完璧にカバーされています。
      </p>
      <p>
        それだけでなく、骨の健康を支え、体を様々なウイルスから保護してくれる安心感もあります。
      </p>
      <p>
        そして、楽しい家族と共にこれらの瞬間を楽しむことができる幸せ、それこそが真に宝物です。
      </p>
    </div>
  );
};

export default PurposeComponent;
