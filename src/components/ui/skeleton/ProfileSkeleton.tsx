import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <div className="w-full h-full p-5 space-y-3">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-x-5 my-3 ">
          {/* Profile Picture */}
          <Skeleton circle height={80} width={80} />
          {/* Name and Details */}
          <div className="flex flex-col mt-3 items-center gap-y-4">
            <Skeleton height={20} width={250} />
            <Skeleton height={20} width={200} />
          </div>
        </div>

        <div className="grid grid-cols-3 gird-rows-2 gap-7 pt-5">
              <Skeleton height={90} width={"100%"} />
              <Skeleton height={90} width={"100%"} />
              <Skeleton height={90} width={"100%"} />
              <Skeleton height={90} width={"100%"} />
              <Skeleton height={90} width={"100%"} />
              <Skeleton height={90} width={"100%"} />
          
        
        </div>
        <div className="flex flex-col gap-y-4 pt-5">
        <Skeleton height={40} width={100} />
        <Skeleton height={20} width={250} />
        
        </div>

        {/* Desired Job Types */}

        {/* Desired Locations */}
      </div>
    </SkeletonTheme>
  );
};

export default ProfileSkeleton;
