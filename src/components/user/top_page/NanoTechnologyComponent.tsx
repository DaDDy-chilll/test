import NanoLogo from "@/assets/user/top_page/nanoLogo.png";
import NanoRunning from "@/assets/user/top_page/nanoRunning.png";
import NanoBarChart from "@/assets/user/top_page/nanoBarChart.svg";
import SizeBox from "@/components/SizeBox";

const NanoTechnologyComponent = () => {
  return (
    <div className="bg-white w-full py-8 h-[90vh]">
      <div className="w-2/3 h-full bg-secondaryBackgroundColor pl-28 py-20 relative">
        <img src={NanoLogo} alt="Nano's Logo" className="w-[40px]" />
        <SizeBox h={20} />
        <div className="space-y-4 text-primaryColor">
          <p className="uppercase text-lg tracking-widest">NANO TECHNOLOGY</p>
          <p className=" tracking-widest text-4xl font-bold">
            ナノテクノロジーとは？
          </p>
        </div>
        <SizeBox h={40} />
        <div className="text-xs space-y-4">
          <p>こびとを意味するギリシャ語ナノスから由来</p>
          <p>
            長さの単位で1ナノメートル（1nm）は1メートル長さを10億等分に割った大きさ
          </p>
          <p> 髪の毛の太さ 10万分の1のサイズ </p>
          <p>たばこ煙（炭素粒）を約1,000分の1に割った大きさが1ナノメートル</p>
        </div>
        <SizeBox h={40} />
        <div>
          <img src={NanoBarChart} alt="Nano Bar Chart" />
        </div>

        <img
          src={NanoRunning}
          alt="Nano Running Image"
          className="absolute top-1/2 transform -translate-y-1/2 -right-[120px]"
        />
      </div>
    </div>
  );
};

export default NanoTechnologyComponent;
