import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobRowSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <tr className="h-14 odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        {/* For the name */}
        <td>
          <Skeleton height={10} width={120} />
        </td>
        {/* For the job type */}
        <td>
          <Skeleton height={10} width={200} />
        </td>
        {/* For the address */}
        <td>
          <Skeleton height={10} width={80} />
        </td>
        {/* For the education */}
        <td className="text-start px-6">
          <Skeleton height={10} width={60} />
        </td>
        {/* For the language level */}
        <td className="text-start px-6">
          <Skeleton height={10} width={50} />
        </td>
      </tr>
    </SkeletonTheme>
  );
};

export default JobRowSkeleton;