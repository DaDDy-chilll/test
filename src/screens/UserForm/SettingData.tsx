import {  ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/RealTimeInput";
import Select from "@/components/ui/Select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface SettingDataProps {
  formData: UserFormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleNext: () => void;
}

const SettingData = ({ formData, handleChange, handleNext }: SettingDataProps) => {
  const countries = [
    { value: "Tokyo", label: "Tokyo" },
    { value: "Osaka", label: "Osaka" },
    { value: "Kyoto", label: "Kyoto" },
    { value: "Fukuoka", label: "Fukuoka" },
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-foreground">
      <div className="flex w-3/5 h-3/4 shadow-md rounded-2xl overflow-hidden">
        <div className="w-full h-full p-8 pt-29 space-y-8 flex flex-col justify-center items-center bg-white relative">
          <div className="flex justify-between w-5/6">
            <div className="space-y-3">
              <h1 className="main-title sub-title text-black">Profile Photo</h1>
              <p>This will be your public photo for your company</p>
            </div>
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <form className="space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <Input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type name"
                label="Name"
                className="mt-1 block w-full"
              />
              <Input
                name="companyType"
                type="text"
                value={formData.companyType}
                onChange={handleChange}
                label="Company Type"
                className="mt-1 block w-full"
              />
              <Input
                name="salary"
                type="text"
                value={formData.salary}
                onChange={handleChange}
                label="Salary"
                className="mt-1 block w-full"
              />
              <Input
                name="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={handleChange}
                label="Job Title"
                className="mt-1 block w-full"
              />
              <Input
                name="experience"
                type="text"
                value={formData.experience}
                onChange={handleChange}
                label="Experience"
                className="mt-1 block w-full"
              />
              <Select
                label="Location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                options={countries}
              />
            </div>
            <div>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="mt-1 block w-full"
                rows={3}
                placeholder="Additional Information"
              ></textarea>
            </div>
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full"
                rows={3}
                placeholder="Description"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <Button type="button" onClick={handleNext} className="medium font-medium">
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingData;
