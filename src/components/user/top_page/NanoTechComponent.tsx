
import nanotech from "@/assets/user/top_page/ナノ技術.png";
import SizeBox from "@/components/SizeBox";
import SectionVectorComponent from "@/components/user/top_page/SectionVectorComponent";
const NanoTechComponent = ()=> {
    return <div className="relative">
        <div className="absolute w-full"><SectionVectorComponent/></div>
        <SizeBox h={130}/>
        <div className="container mx-auto">
            <div className="flex flex-row text-[30px] justify-center font-body pb-[70px] font-semibold">
                <span className="bg-[#fadf69] px-[4px] pl-[20px]">ナノ技術</span>とは？
            </div>
            <div className="flex flex-row lg:pl-[70px] lg:pr-[70px]">
                <div className="flex-[1] pr-[60px]">
                    <img src={nanotech} alt="ナノ技術とは？" />
                </div>
                <div className="flex-[2]">
                    <div className="text-[16px] font-medium pt-[20px] pb-[20px] leading-[29px] tracking-[0.5px]">ナノ技術とは、極めて小さなサイズの物質を研究し、利用する技術のことです。<SizeBox h={25} />ナノ技術は、物質を取り巻く微小な世界での現象を理解し、それを利用することで、<br/>新しい材料や製品などを開発することができます。<SizeBox h={25} />ナノ技術の応用分野には、医療、エネルギー、環境、情報通信、輸送、食品などがあります。<br/>
ナノ技術の応用には、リスクや安全面についても議論があります。<br/>私たちの暮らしに既に様々な形で応用されています。</div>
                </div>
            </div>
            
        </div>
        <SizeBox h={70}/>
    </div>
}

export default NanoTechComponent;