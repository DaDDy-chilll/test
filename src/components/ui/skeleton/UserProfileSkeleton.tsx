import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <div className="w-full p-10">
        {/* Profile Header */}
        <div className="flex items-center gap-x-5 my-3 ">
          {/* Profile Picture */}
          <Skeleton circle height={80} width={80} />
          {/* Name and Details */}
          <div className="flex flex-col">
            <Skeleton height={20} width={150} />
            <div className="contact-details mt-4 flex flex-row gap-5">
              <Skeleton height={20} width={90} />
              <Skeleton height={20} width={120} />
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={110} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div>
            <div className="video-section my-4">
              <Skeleton height={200} width={"100%"} />
            </div>
            <Skeleton height={30} width={100} />
          </div>

          <div className="education-history my-4 px-10 flex flex-col gap-8">
            <div className="education">
              <Skeleton height={20} width={100} />
              <Skeleton height={15} width={250} />
            </div>
            <div className="job-history">
              <Skeleton height={20} width={100} />
              <Skeleton height={15} width={250} />
            </div>
          </div>

          <div>
            <div className="desired-info mt-4 px-10">
              <Skeleton height={20} width={150} />
              <Skeleton height={15} width={100} count={4} />
            </div>

            <div className="desired-jobs mt-4 flex flex-row flex-wrap gap-2">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} height={30} width={100 + index * 5} />
              ))}
            </div>

            <div className="desired-locations mt-8 flex gap-2">
              {[...Array(2)].map((_, index) => (
                <Skeleton key={index} height={30} width={90 + index * 5} />
              ))}
            </div>
          </div>
        </div>

        {/* Desired Job Types */}

        {/* Desired Locations */}
      </div>
    </SkeletonTheme>
  );
};

export default UserProfileSkeleton;
