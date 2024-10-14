import { colors } from "@/constants/color";
import { useEffect } from "react";

import { BounceLoader } from "react-spinners";

type LoadingProps = {
  className?: string;
  isLoading?: boolean;
};

const Loading = ({ className, isLoading }: LoadingProps) => {
  useEffect(() => {
    if (isLoading) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);
  return (
    <div
      className={`w-full h-full bg-gray-200/50 z-50 overflow-hidden absolute left-0 top-0 flex justify-center items-center ${className}`}
    >
      <BounceLoader color={colors.primary} size={50} />
    </div>
  );
};

export default Loading;
