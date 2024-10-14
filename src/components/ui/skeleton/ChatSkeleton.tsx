import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChatSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#edeceb">
      <div className="flex gap-4 items-center justify-start">
        <Skeleton circle height={50} width={50} />
        <div className="flex  items-center justify-start">
          <Skeleton height={10} width={200} count={2} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ChatSkeleton;
