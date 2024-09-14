import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/fix/logo.png";
import { jp } from "@/lang/jp";
import DatePicker from "@/components/ui/DatePicker";
import { motion,AnimatePresence } from "framer-motion";
import { useState } from "react";
import DiplayFormData from "@/components/ui/DiplayFormData";
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
  // const [form, setForm] = useState<UserFormData>({
  //   name: "",
  //   salary: "",
  //   experience: "",
  //   location: "",
  //   companyType: "",
  //   jobTitle: "",
  //   additionalInfo: "",
  //   description: "",
  // });

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
            <div className="flex justify-between w-5/6 p-5 pl-10">
              <div className="space-y-1">
                <h1 className="sub-title text-black">Profile Photo</h1>
                <p>This will be your public photo for your company</p>
              </div>
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <form
              className="space-y-5 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
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
                  defaultOption="Choose Industry"
                />
                {/* <Input
         name="companyType"
         type="text"
       
         label="Company Type"
         className="mt-1 block w-ful"
       /> */}
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
                    className="mt-1 block w-full "
                    placeholder="100000 $"
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
          <DiplayFormData setComplete={setComplete} navigator={handleNavigate} />
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const formVariants = {
  hidden: { opacity: 0 ,x:-100},
  visible: { opacity: 1,x:0, transition: { delay: 0.2, duration: 0.3 } },
  exit: { opacity: 0, x: -100, transition: { delay: 0.2, duration: 0.3 } },
};

export default UserFormScreen;
