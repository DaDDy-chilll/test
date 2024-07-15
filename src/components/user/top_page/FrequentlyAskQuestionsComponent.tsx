import FaqLogo from "@/assets/user/top_page/FaqLogo.png";
import KeyGreen from "@/assets/user/top_page/KeyGreen.png";
import SizeBox from "@/components/SizeBox";
import { useState } from "react";

type FaqTypes = {
  index?: number;
  question: string;
  answer: string[];
};

type FrequentlyAskQuestionsComponentProps = {
  faqs: FaqTypes[];
};

const FrequentlyAskQuestionsComponent = ({
  faqs,
}: FrequentlyAskQuestionsComponentProps) => {
  return (
    <div className="bg-white w-full px-28 py-20 flex flex-col items-center">
      <div className="w-full flex flex-col items-center text-primaryColor space-y-3">
        <img src={FaqLogo} alt="Thumb Up logo" className="w-[40px]" />
        <p className="uppercase tracking-widest">FAQ</p>
        <p className="text-3xl font-bold">よくある質問</p>
      </div>
      <SizeBox h={60} />
      <div className="w-2/3">
        {faqs.map(({ question, answer }, index) => (
          <FaqComponent index={index + 1} question={question} answer={answer} />
        ))}
        
      </div>
    </div>
  );
};

const FaqComponent = ({ question, answer, index }: FaqTypes) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const numberFormat = (indexNumber: number) => {
    if (indexNumber < 10) {
      return "0" + indexNumber;
    } else {
      return indexNumber;
    }
  };
  return (
    <>
      <div
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-full flex items-center px-8 py-4 rounded-lg bg-[#F8F7EE] cursor-pointer"
      >
        <p className="w-1/12 font-bold tracking-widest text-lg">
          {index && numberFormat(index)}
        </p>
        <p className="text-xs w-10/12 -ml-6">{question}</p>
        <div className="w-1/12 flex justify-end">
          <img
            src={KeyGreen}
            alt="Key Green"
            className={`w-[25px] transition-all duration-300 ${
              showAnswer ? "-rotate-90" : "rotate-90"
            }`}
          />
        </div>
      </div>

      {showAnswer && (
        <>
          <SizeBox h={6} />
          <div
            className={`bg-[#F2F2F2] border-2 rounded-md py-6 pl-[84px]`}
          >
            <ul className="space-y-2 list-disc">
              {answer.map((ans) => (
                <li key={Math.random()} className="text-xs">
                  {ans}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <SizeBox h={16} />
    </>
  );
};

export default FrequentlyAskQuestionsComponent;
