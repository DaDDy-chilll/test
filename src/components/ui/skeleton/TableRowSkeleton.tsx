import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableRowSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <tr className="h-14 odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        {/* For the user icon */}
        <td className="text-center">
          <Skeleton circle height={40} width={40} />
        </td>
        {/* For the name */}
        <td>
          <Skeleton height={10} width={120} />
        </td>
        {/* For the job type */}
        <td>
          <Skeleton height={10} width={150} />
        </td>
        {/* For the address */}
        <td>
          <Skeleton height={10} width={80} />
        </td>
        {/* For the education */}
        <td>
          <Skeleton height={10} width={100} />
        </td>
        {/* For the language level */}
        <td>
          <Skeleton height={10} width={80} />
        </td>
        {/* For the JLPT level */}
        <td>
          <Skeleton height={10} width={50} />
        </td>
        {/* For the gender */}
        <td>
          <Skeleton height={10} width={50} />
        </td>
        {/* For the detail button */}
        <td>
          <Skeleton height={30} width={50} />
        </td>
      </tr>
    </SkeletonTheme>
  );
};

export default TableRowSkeleton;