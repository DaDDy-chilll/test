import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { jp } from "@/lang/jp";
import defaultImage from "@/assets/images/default.png";

type formData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  address: string;
};

type Props = {
  formData?: formData;
  setComplete?: (value: boolean) => void;
  navigator?: () => void;
};

/**
 * This component is used to display form data
 * @param {Props} props - The properties passed to the component
 * @returns {JSX.Element} The rendered component
 * @autor PSK
 */
const DiplayFormData = ({ setComplete, navigator }: Props) => {
  return (
    <motion.div
      key="complete"
      className="w-full p-8 pt-29 space-y-2 flex flex-col justify-center items-center relative"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div>
        <Avatar className="w-20 h-20">
          <AvatarImage src={defaultImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-xl my-3">Company Name</h1>
        <p className="text-gray-400">abc@gmail.com</p>
      </div>
      <div className="flex justify-center gap-4 space-x-20 pt-6 pb-10">
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <p>Tokyo</p>
        </span>
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          <p>10 Persons</p>
        </span>
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
          <p>Caregiving</p>
        </span>
      </div>
      <div className="h-60 space-y-3">
        <h1 className="font-bold text-bg">{jp.companyDescription}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>

      <div className="flex justify-between w-full px-10 mr-10">
        <button
          className="underline font-medium"
          onClick={() => setComplete && setComplete(false)}
        >
          Back
        </button>

        <Button
          variant="destructive"
          className="font-medium w-44"
          onClick={navigator}
        >
          Finish
        </Button>
      </div>
    </motion.div>
  );
};

/**
 * Animation variants for the form
 * @author PSK
 */
const formVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.3 } },
  exit: { opacity: 0, x: 100, transition: { delay: 0.2, duration: 0.3 } },
};

export default DiplayFormData;
