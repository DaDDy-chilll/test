import JobDetails from "@/components/ui/JobDetails";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/icons/logo.svg";
import { jp } from "@/lang/jp";
import DatePicker from "@/components/ui/DatePicker";
import Loading from "@/components/ui/Loading";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const countries = [
    { value: "Tokyo", label: "Tokyo" },
    { value: "Osaka", label: "Osaka" },
    { value: "Kyoto", label: "Kyoto" },
    { value: "Fukuoka", label: "Fukuoka" },
  ];

  const jobTypes = [
    { value: "IT", label: "IT" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Finance", label: "Finance" },
  ];

  const employeeNumber = [
    { value: "1-10", label: "1-10" },
    { value: "11-20", label: "11-20" },
    { value: "21-30", label: "21-30" },
    { value: "31-40", label: "31-40" },
  ];

  const editHandler = () => {
    setIsEdit(true);
  };

  return (
    <>
    {false && <Loading isLoading={false} className='h-[calc(100vh-68px)]' />}
      <motion.div
        variants={profileVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-full flex justify-center items-center px-10"
      >
        <AnimatePresence mode="wait">
          {!isEdit && (
            <JobDetails isDetails={false} editHandler={editHandler} />
          )}
          {isEdit && (
            <motion.div
              key="form"
              className="w-full h-full bg-gray-100 px-8 pb-5 pt-29 space-y-2 flex flex-col justify-center items-center relative"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="absolute left-7 top-5 flex items-center gap-3">
                <div className="w-12">
                  <img src={logo} className="w-full" alt="Japan job logo" />
                </div>
                <h1 className="font-medium">JAPAN JOB</h1>
              </div>
              <div className="flex justify-between w-5/6 pt-14 pb-2 pl-10">
                <div className="space-y-1">
                  <h1 className="sub-title text-black">Profile Photo</h1>
                  <p>This will be your public photo for your company</p>
                </div>
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <form className=" w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-y-3 gap-x-20 px-10">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Type name"
                    label={jp.companyName}
                    className="mt-1 block w-full bg-gray-100 "
                  />

                  <Select
                    label={jp.jobArea}
                    id={jp.jobArea}
                    options={jobTypes}
                    className=""
                    defaultOption="Choose Industry"
                  />
                  <Input
                    name="salary"
                    type="text"
                    label={jp.investmentAmount}
                    className="mt-1 block w-full bg-gray-100 "
                    placeholder="100000 $"
                  />
                  <Input
                    name="jobTitle"
                    type="text"
                    label={jp.undertake}
                    className="mt-1 block w-full bg-gray-100 "
                  />
                  <Select
                    label={jp.employeeNumber}
                    id={jp.employeeNumber}
                    options={employeeNumber}
                    className=""
                  />
                  <Select
                    label="Location"
                    id="location"
                    options={countries}
                    className=""
                  />
                  <DatePicker
                    name="jobTitle"
                    type="text"
                    label={jp.establishment}
                    className="mt-1 block w-ful"
                  />
                  <div></div>
                  <span className="col-span-2">
                    <Input
                      name="description"
                      type="text"
                      label={jp.companyDescription}
                      className="mt-1 block w-full bg-gray-100 "
                      placeholder="100000 $"
                    />
                  </span>
                </div>

                <div className="flex justify-between w-full px-10 mr-10">
                  <button
                    className="underline font-medium"
                    onClick={() => setIsEdit(false)}
                  >
                    Back
                  </button>
                  <Button
                    variant="destructive"
                    className="font-medium w-44"
                    onClick={() => {}}
                  >
                    Finish
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>

  );
};

const profileVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const formVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};
export default Profile;
