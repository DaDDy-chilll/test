import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <div className="w-full h-full">
        <Skeleton height="100%" width="100%" />
      </div>
    </SkeletonTheme>
  );
};

export default CardSkeleton;
