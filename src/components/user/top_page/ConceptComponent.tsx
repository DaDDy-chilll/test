import concept from "@/assets/user/top_page/concept.png";
import quote01 from "@/assets/user/top_page/quote01.png";
import quote02 from "@/assets/user/top_page/quote02.png";
import SizeBox from "@/components/SizeBox";

const ConceptComponent = () => {
  return (
    <div className="border-b-[1px] border-[#808080] border-opacity-50">
      <div className="container mx-auto mt-[100px]">
        <div className="flex pb-[70px] ">
          <div className="flex-[1] mr-[70px]">
            <img src={concept} alt="Concept" />
          </div>
          <div className="flex-[2]">
            <div className="text-[30px] font-bold">CONCEPT</div>
            <SizeBox h={60} />
            <div>
              <div className="w-[80%] relative text-[16px] font-medium leading-[38px] pl-[30px]">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人生で今が最高と感動に包まれます。年齢を気にせず、元気に生活できることは喜びそのものです。
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1日に必要な栄養は、まさに「ナノ技術を駆使した」サプリメントで完璧にカバーされています。{" "}
                <br />
                それだけでなく、骨の健康を支え、体を様々なウイルスから保護してくれる安心感もあります。そして、楽しい家族と共にこれらの瞬間を楽しむことができる幸せ、それこそが真に宝物です。
                <div className="absolute -right-[15px] -bottom-[35px]">
                  <img src={quote02} alt="quote02" />
                </div>
                <div className="absolute -top-[65px] left-[0px]">
                  <img src={quote01} alt="quote01" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptComponent;
