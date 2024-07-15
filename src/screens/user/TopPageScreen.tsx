import { GlobalProps } from "@/App";
import UserLayout from "./UserLayout";
import BannerSliderComponent from "@/components/user/top_page/BannerSliderComponent";
import PurposeComponent from "@/components/user/top_page/PurposeComponent";
import ProductsSliderComponent from "@/components/user/top_page/ProductsSliderComponent";
import { useEffect, useState } from "react";
import { ProductsDataTypes } from "@/components/user/top_page/NanoProductComponent";
import NanoTechnologyComponent from "@/components/user/top_page/NanoTechnologyComponent";
import RecommendProductsComponent from "@/components/user/top_page/RecommendProductsComponent";
import ChoosePlanComponent from "@/components/user/top_page/ChoosePlanComponent";
import BackgroundOne from "@/assets/user/top_page/background.jpg";
import BackgroundTwo from "@/assets/user/top_page/background.jpg";
import BackgroundThree from "@/assets/user/top_page/background.jpg";
import BackgroundFour from "@/assets/user/top_page/background.jpg";
import FrequentlyAskQuestionsComponent from "@/components/user/top_page/FrequentlyAskQuestionsComponent";

const TopPageScreen = ({ mutations, loginUser, changeLoginUserAction }: GlobalProps) => {
  const [products, setProducts] = useState<Array<ProductsDataTypes>>([]);

  const images = [
    BackgroundOne,
    BackgroundTwo,
    BackgroundThree,
    BackgroundFour,
  ];

  const faqs = [
    {
      question: "ナノ技術は何ですか",
      answer: [
        "こびとを意味するギリシャ語ナノスから由来 ",
        "長さの単位で1ナノメートル（1nm）は1メートル長さを10億等分に割った大きさ ",
        "髪の毛の太さ 10万分の1のサイズ",
        "たばこ煙（炭素粒）を約1,000分の1に割った大きさが1ナノメートル",
      ],
    },
    {
      question: "他のサプリメントと何が違いますか",
      answer: [
        "エイペクセル(株)は、ほとんどの物質をいかなる条件でも分散剤なしに様々な粒度分布のナノサイズで製造する能力を備え、",
        "ナノ粉末製造及び融合とナノ新素材のR&Dを行う世界でひとつだけの企業です。",
        "特に1ナノから1,000ナノまでをtop-down方式により、当社が自社開発した装備（世界唯一）Nano 3D Mill（乾式）で生産しています。 ",
      ],
    },
    {
      question: "単品とセットで飲んだ場合、何が違いますか？",
      answer: ["小学生基準で朝1粒、夕方1粒（1日2粒）をお奨めします。"],
    },
    {
      question: "副作用はありますか？",
      answer: [
        "服用前に専門家へご相談ください。 問題ない場合は、各製品の1日の摂取量を服用してください。",
      ],
    },
    {
      question: "妊娠さんは飲めますか？",
      answer: [
        "基準はありません。 カルシウム、酵母は着実な服用を推奨し、キトサンは1年に3ヶ月程度服用すると良いと言われてます。",
      ],
    },
  ];

  const getProducts = () => {
    mutations.pub.product
      .get()
      .then((ans) => {
        if (ans.data) {
          setProducts(ans.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout loginUser={loginUser} changeLoginUserAction={changeLoginUserAction}>
      <BannerSliderComponent intervalTime={5} sliderImages={images} />
      <PurposeComponent />
      <ProductsSliderComponent products={products} />
      <NanoTechnologyComponent />
      <RecommendProductsComponent products={products} />
      <ChoosePlanComponent />
      <FrequentlyAskQuestionsComponent faqs={faqs} />
    </UserLayout>
  );
};

export default TopPageScreen;

// const oldTopPageScreen = () => {
//   return (
//     <div className="bg-white relative">
//       <BannerComponent carts={carts} />
//       <SubScribeComponent />

//       <ConceptComponent />
//       <WhySupplyComponent />
//       {/* <AllSolutionComponent /> */}
//       <NanoTechComponent />
//       <NanoProductComponent mutations={mutations} />
//       <DeliveryComponent />
//       <FAQComponent />
//       {/* <ReviewComponent /> */}
//       <FooterComponent />

//       {/* Absolute Button Action */}
//       <CartLoginComponent carts={carts} />
//     </div>
//   )
// }
