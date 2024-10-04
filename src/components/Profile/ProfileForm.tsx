import React from "react";
import { motion } from "framer-motion";
import logo from "@/assets/icons/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import defaultImage from "@/assets/images/default.png";
import { jp } from "@/lang/jp";
import { useForm } from "react-hook-form";

const defaultData = {
  name: "",
  industry_type_id: "",
  budget: "",
  address: "",
  staff: "",
  prefecture_id: "",
  starting: "",
  company_des: "",
};

type profileFormProps = {
  setIsEdit: (value: boolean) => void;
  data: any;
  jobTypes: any;
  employeeNumber: any;
  countries: any;
  handleSubmit: (data: any) => void;
  formData: any;
  setFormData: (data: any) => void;
  city: any;
};

const ProfileForm = ({
  setIsEdit,
  data,
  jobTypes,
  employeeNumber,
  countries,
  handleSubmit,
  formData,
  setFormData,
  city,
}: profileFormProps) => {
  console.log(formData)
  return (
    <motion.div
      key="form"
      className="w-full h-full bg-gray-100 px-8 pb-5 space-y-2 flex flex-col justify-center relative"
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
          <h1 className="sub-title text-black">{jp.profilePhoto}</h1>
          <p>{jp.profilePhotoDescription}</p>
        </div>
        <Avatar className="w-20 h-20">
          <AvatarImage src={defaultImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <form className=" w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-3 gap-x-20 px-10">
          <Input
            name="name"
            type="text"
            placeholder={jp.companyName}
            label={jp.companyName}
            className="mt-1 block w-full bg-gray-100 "
            value={formData.name }
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Select
            name="industry_type_id"
            label={jp.jobArea}
            id={jp.jobArea}
            options={jobTypes}
            className=""
            defaultOption={jp.chooseIndustry}
            value={formData.industry_type_id}
            onChange={(e) => {
              setFormData({ ...formData, industry_type_id: {label:e.target?.labels, value: e.target.value} })
            }}
          />
          <Input
            name="budget"
            type="number"
            label={jp.investmentAmount}
            className="mt-1 block w-full bg-gray-100 "
            placeholder="100000 $"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
          <Input
            name="address"
            type="text"
            label={jp.undertake}
            className="mt-1 block w-full bg-gray-100 "
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <Select
            name="staff"
            label={jp.employeeNumber}
            id={jp.employeeNumber}
            options={employeeNumber}
            className=""
            defaultOption={jp.chooseEmployee}
            value={formData.staff}
            onChange={(e) => setFormData({ ...formData, staff: {label: e.target.labels, value: e.target.value} })}
          />
          <Select
            name="prefecture_id"
            label={jp.area}
            id=""
            options={countries}
            className=""
            defaultOption={jp.chooseLocation}
            value={formData.prefecture_id}
            onChange={(e) => setFormData({ ...formData, prefecture_id: {label: e.target.labels, value: e.target.value} })}
          />
          <DatePicker
            name="starting"
            type="text"
            label={jp.establishment}
            className="mt-1 block w-ful"
            value={formData.starting}
            onChange={(e) => setFormData({ ...formData, starting: e.target.value })}
          />
            <Select
            disabled={formData.prefecture_id.value !== "" ? false : true}
            // name="prefecture_id"
            label={jp.city}
            id="city"
            options={countries}
            className=""
            defaultOption={jp.chooseLocation}
            value={formData.prefecture_id}
            onChange={(e) => setFormData({ ...formData, prefecture_id: e.target.value })}
          />
          <span className="col-span-2">
            <Input
              name="company_des"
              type="text"
              label={jp.companyDescription}
              className="mt-1 block w-full bg-gray-100 "
              placeholder="100000 $"
              value={formData.company_des}
              onChange={(e) => setFormData({ ...formData, company_des: e.target.value })}
            />
          </span>
        </div>

        <div className="flex justify-between w-full px-10 mr-10">
          <button
            className="underline font-medium"
            onClick={() => setIsEdit(false)}
          >
            {jp.back}
          </button>
          <Button
            variant="destructive"
            className="font-medium w-44"
            onClick={() => {}}
          >
            {jp.finish}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

const formVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};
export default ProfileForm;
