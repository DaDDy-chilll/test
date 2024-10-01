import { motion } from "framer-motion";

interface DefaultCardProps {
    hasMore: boolean;
}

const DefaultCard = ({hasMore}: DefaultCardProps) => {
    const cardClick = () => {
        console.log("cardClick");
    };
  return (
    <motion.button
    onClick={cardClick}
    variants={cardVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className={`w-full h-80 max-w-sm flex flex-col justify-center items-center bg-gray-100 border rounded-lg shadow py-2  ${hasMore ? "hover:bg-gray-200 hover:shadow-lg":""} cursor-pointer group`}
    disabled={!hasMore}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-12 h-12 text-gray-400 mb-2 ${hasMore ? "group-hover:text-primaryColor":""}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    <p className={`text-gray-500 text-sm ${hasMore ? "group-hover:text-primaryColor":""}`}>{hasMore ? "See More Matches":"No More Matches"}</p>
  </motion.button>
  );
};

const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

export default DefaultCard;
