import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <div className="flex gap-4 w-full items-center justify-center">
        <Skeleton  height={40} width={150} />
      </div>
    </SkeletonTheme>
  );
};

export default EventSkeleton;
