import {
  Button,
  Input,
  Select,
  Avatar,
  AvatarImage,
  DiplayFormData,
  DatePicker,
} from "@/components";
import logo from "@/assets/icons/logo.svg";
import { jp } from "@/lang/jp";
import defaultImage from "@/assets/images/default.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface UserFormData {
  name: string;
  salary: string;
  experience: string;
  location: string;
  companyType: string;
  jobTitle: string;
  additionalInfo: string;
  description: string;
}

/**
 * UserFormScreen component renders the user form and handles form submission.
 * @author PSK
 */
const UserFormScreen = () => {
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

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

  /**
   * This function navigates to the dashboard.
   * @author PSK
   */
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 overflow-hidden">
      <div className="flex w-2/3 shadow-md bg-white">
        <AnimatePresence mode="wait">
          {!complete && (
            <motion.div
              key="form"
              className="w-full h-full p-8 pt-29 space-y-2 flex flex-col justify-center items-center relative"
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
              <form
                className="space-y-5 w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="absolute left-7 top-5 flex items-center gap-3">
                  <div className="w-12">
                    <img src={logo} className="w-full" alt="Japan job logo" />
                  </div>
                  <h1 className="font-medium">JAPAN JOB</h1>
                </div>
                <div className="flex justify-between w-5/6 p-5 pl-10">
                  <div className="space-y-1">
                    <h1 className="sub-title text-black">Profile Photo</h1>
                    <p>{jp.profileShow}</p>
                  </div>
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={defaultImage} />
                  </Avatar>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-20 px-10">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Type name"
                    label={jp.companyName}
                    className="mt-1 block w-full"
                  />

                  <Select
                    label={jp.jobArea}
                    id={jp.jobArea}
                    options={jobTypes}
                    className=""
                    defaultOption={jp.chooseIndustry}
                  />
                  <Input
                    name="salary"
                    type="text"
                    label={jp.investmentAmount}
                    className="mt-1 block w-full"
                    placeholder="100000 $"
                  />
                  <Input
                    name="jobTitle"
                    type="text"
                    label={jp.undertake}
                    className="mt-1 block w-full"
                  />
                  <Select
                    label={jp.employeeNumber}
                    id={jp.employeeNumber}
                    options={employeeNumber}
                    className=""
                    defaultOption={jp.chooseEmployee}
                  />
                  <Select
                    label={jp.location}
                    id="location"
                    options={countries}
                    className=""
                    defaultOption={jp.chooseLocation}
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
                      className="mt-1 block w-full "
                    />
                  </span>
                </div>

                <div className="flex justify-end mr-10">
                  <Button
                    variant="destructive"
                    className="font-medium w-44"
                    onClick={() => setComplete(true)}
                  >
                    Finish
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
          {complete && (
            <DiplayFormData
              setComplete={setComplete}
              navigator={handleNavigate}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/**
 * Animation variants for the form.
 * @author PSK
 */
const formVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.3 } },
  exit: { opacity: 0, x: -100, transition: { delay: 0.2, duration: 0.3 } },
};

export default UserFormScreen;
