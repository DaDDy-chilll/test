import SizeBox from "@/components/SizeBox";
import SectionVectorComponent from "@/components/user/top_page/SectionVectorComponent";

const AllSolutionComponent = ()=>{
  const tableBodys = [
    {
      productName: "製品名",
      traditional: "Jet Mill",
      normal: "従来の湿式ボールミル",
      manufacturingIndustry: "ナノ sol 合成法",
      companyNanoProduct: "ナノ 3D Mill"
    },
    {
      productName: "生産粒度",
      traditional: "3~5㎛",
      normal: "3~5㎛",
      manufacturingIndustry: "1~30nm",
      companyNanoProduct: "1000~1nm 自由調節"
    },
    {
      productName: "再粉砕機能",
      traditional: "不可能",
      normal: "不可能",
      manufacturingIndustry: "330nm以上の大きさ 生産不可能",
      companyNanoProduct: "0.5㎛ → 0.02㎛に再粉砕可能"
    },
    {
      productName: "成分変化",
      traditional: "熱による成分破壊",
      normal: "材料が酸化",
      manufacturingIndustry: "大きい、散材必要",
      companyNanoProduct: "分散材必要なし/ 成分変化なし"
    },
    {
        productName: "食品/製薬の 栄養変化",
        traditional: "熱による栄養破壊",
        normal: "損失が大きい",
        manufacturingIndustry: "製造不可能",
        companyNanoProduct: "色、香り、風味、 ビタミンなど、 栄養損失なし"
      },
      {
        productName: "不純物混入",
        traditional: "ある",
        normal: "高い",
        manufacturingIndustry: "高い",
        companyNanoProduct: "なし"
      },
      {
        productName: "生産量(h)",
        traditional: "生産不可能",
        normal: "生産不可能",
        manufacturingIndustry: "20~30g",
        companyNanoProduct: "1000~2000g"
      },
      {
        productName: "粉砕領域",
        traditional: "非金属鉱物で制限的である",
        normal: "制限的である",
        manufacturingIndustry: "ごく制限的であり、 シリカ、銀など約10種類",
        companyNanoProduct: "紅参、緑茶、玄米、 コラーゲン、キトサン等、 高分子素材、 シリカアルミナ、金、銀、 昆布、有機化合物、無機化合物、 各種の医薬品、 各種の漢方材料、その他"
      },
  ];

  return <div className="relative">
    <div className="absolute w-full"><SectionVectorComponent /></div>
    <SizeBox h={145} />
    <div className="container mx-auto">
        <div className="flex flex-col">
            <div className="text-[30px] font-bold text-center pb-[25px]">全ての解決はこちらにある</div>
            <div className="text-[16px] font-medium tracking-[2.56px] leading-[38px] text-center"><span className="bg-yellow-500 px-[4px]">ナノ技術</span>を使用しているとどれぐらい <br />必要なエネルギーが吸収できるか比較しましょう。</div>
        </div>
        <SizeBox h={15} />
        <div className="flex flex-row">
            <table className="w-[100%] table-auto border-collapse">
                <thead>
                    <tr className="">
                    <th className="border-[0]">&nbsp;</th>
                    <th className="text-[14px] font-bold border-[0.5px] border-[#000] border-opacity-50 bg-opacity-30 bg-[#D9D9D9] p-[9px] leading-[26px]">従来の<br />乾式超微粒粉砕機</th>
                    <th className="border-[0.5px] border-[#000] border-opacity-50 bg-opacity-30 bg-[#D9D9D9] p-[9px]">湿式粉砕機</th>
                    <th className="border-[0.5px] border-[#000] border-opacity-50 bg-opacity-30 bg-[#D9D9D9] p-[9px]">合成ナノ製造業</th>
                    <th className="md:w-[200px] lg:w-[300px] border-[0.5px] border-[#000] border-opacity-50 bg-opacity-50 bg-[#7AB8E7] p-[9px]">当社の<span className="bg-yellow-500 px-[4px] text-[#285DBD] inline-block py-[2px]">ナノ技術</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableBodys.map(({productName,traditional,normal,manufacturingIndustry,companyNanoProduct},index)=>{
                        return <tr key={index}>
                            <td className="border-[0.5px] border-[#000] border-opacity-50 p-[20px] text-[14px] font-medium">{productName}</td>
                            <td className="border-[0.5px] border-[#000] border-opacity-50 p-[20px] text-[14px] font-medium">{traditional}</td>
                            <td className="border-[0.5px] border-[#000] border-opacity-50 p-[20px] text-[14px] font-medium">{normal}</td>
                            <td className="border-[0.5px] border-[#000] border-opacity-50 p-[20px] text-[14px] font-medium">{manufacturingIndustry}</td>
                            <td className="border-[0.5px] border-[#000] border-opacity-50 p-[20px] text-[14px] font-medium bg-[#7AB8E7] bg-opacity-50">{companyNanoProduct}</td>
                        </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    </div>
    <SizeBox h={50} />
    </div>
}

export default AllSolutionComponent;