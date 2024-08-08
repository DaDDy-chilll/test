import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserFormData } from "./SettingData";

interface CheckingDataProps {
  formData: UserFormData;
  handleEdit: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const CheckingData = ({ formData, handleEdit, handleSubmit, isSubmitting }: CheckingDataProps) => {
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
          <div className="space-y-6 w-full">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="mt-1 text-sm text-gray-900">{formData.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Type
                </label>
                <p className="mt-1 text-sm text-gray-900">{formData.companyType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <p className="mt-1 text-sm text-gray-900">{formData.salary}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <p className="mt-1 text-sm text-gray-900">{formData.jobTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <p className="mt-1 text-sm text-gray-900">{formData.experience}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <p className="mt-1 text-sm text-gray-900">{formData.location}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <p className="mt-1 text-sm text-gray-900">{formData.additionalInfo}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <p className="mt-1 text-sm text-gray-900">{formData.description}</p>
            </div>
            <div className="flex justify-between">
              <Button type="button" onClick={handleEdit} className="medium font-medium">
                Edit
              </Button>
              <Button type="button" onClick={handleSubmit} className="medium font-medium" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckingData;
