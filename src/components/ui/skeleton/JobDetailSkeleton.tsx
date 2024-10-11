import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobDetailSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <div className="w-full py-3 px-10">
        {/* Profile Header */}
        <div className="flex flex-col items-start gap-2 my-10 ">
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={90} />
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-5 py-9 my-10">
          <Skeleton height={30} width={500} />
          <Skeleton height={30} width={500} />
          <Skeleton height={30} width={500} />
          <Skeleton height={30} width={500} />
          <Skeleton height={30} width={500} />
          <Skeleton height={30} width={500} />
        </div>
        <div className="flex flex-col gap-2 my-10">
          <Skeleton height={20} width={90} />
          <Skeleton height={10} width={200} />

        </div>
      </div>
    </SkeletonTheme>
  );
};

export default JobDetailSkeleton;
