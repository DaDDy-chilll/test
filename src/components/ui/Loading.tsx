import { colors } from "@/constants/color";
import React, { useEffect } from "react";

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
      className={`absolute w-full h-full flex justify-center items-center bg-gray-200/50 z-50 overflow-hidden ${className}`}
    >
      <BounceLoader color={colors.primary} size={50} />
    </div>
  );
};

export default Loading;
