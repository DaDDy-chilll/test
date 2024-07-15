import { NavigateFunction } from "react-router-dom";

const Helper = {
  japaneseNumberFormat: ({ number }: { number: number }) => {
    return Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(number);
  },
  japaneseNumberFormatRevert: ({ numericString }: { numericString: string }) => {
    // if(numericString.length===1 && numericString==='￥'){
    //   return 0;
    // }else 
    if(numericString.length>1){
      return parseInt(numericString.replace(/[^\d]/g, ''), 10);
    }
    return 0;
  },
  numberComaFormat: ({ number }: { number: number }) => {
    return Intl.NumberFormat("en").format(number);
  },
  navigate: ({
    navigate,
    path,
    state,
  }: {
    navigate: NavigateFunction;
    path: string;
    state?: {} | any;
  }) => {
    window.scrollTo({ top: 0 });
    navigate(path, { state });
  },
  calculatePercentage: ({
    amount,
    percent,
  }: {
    amount: number;
    percent: number;
  }) => {
    return Math.round(amount + amount * (percent / 100));
  },
};

export default Helper;
