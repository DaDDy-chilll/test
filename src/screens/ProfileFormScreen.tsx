import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { jp } from "@/lang/jp";
import { RootState } from "@/store/store";
import { fetchServer } from "@/utils/helper";
import { apiRoutes } from "@/utils/apiRoutes";
import RouteName from "@/navigations/routes";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import logo from "@/assets/icons/logo.svg";
import defaultImage from "@/assets/images/default.png";
import { useMutation } from "@tanstack/react-query";
import { setVerified,setName } from "@/store";
import { useDispatch } from "react-redux";
import useHandleError from "@/hooks/useHandleError";
import { ProfileFormErrorType, ErrorType } from "@/types/helperTypes";
import { BeatLoader } from "react-spinners";
const employeeNumbers = [
  { value: "100", label: "100" },
  { value: "200", label: "200" },
  { value: "300", label: "300" },
  { value: "400", label: "400" },
];

const ProfileFormScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, verified } = useSelector((state: RootState) => state.auth);
  const [avatarImage, setAvatarImage] = useState(defaultImage);
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [jobTypes, setJobTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    industry_type_id: { label: "", value: "" },
    budget: "",
    starting: "",
    staff: { label: "", value: "" },
    prefecture_id: { label: "", value: "" },
    photo: "",
    company_des: "",
    address: "",
  });
  const {
    ProfileFormHandleError,
    photoError,
    companyNameError,
    industryTypeError,
    budgetStringError,
    startingError,
    staffError,
    prefectureError,
    companyDesError,
    addressError,
    resetProfileFormError
  } = useHandleError();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobTypesResponse = await fetchServer({
          endpoint: apiRoutes.JOB_TYPES,
          method: "GET",
          token,
        });
        setJobTypes(
          jobTypesResponse.data.map((type: any) => ({
            value: type.id.toString(),
            label: type.job_type_jp,
          }))
        );

        const cityResponse = await fetchServer({
          endpoint: apiRoutes.CITY,
          method: "GET",
          token,
        });
        setCountries(
          cityResponse.data.map((item: any) => ({
            label: item.area,
            value: item.id.toString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const { mutate: uploadImage } = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return fetchServer({
        endpoint: apiRoutes.UPLOAD_IMAGE,
        method: "POST",
        body: { file: formData.get("file") },
        file: true,
        token,
      });
    },
    onSuccess: (data) => {
      setAvatarImage(
        "https://api.japanjob.exbrainedu.com/v1/file/photo/" +
          data.data.filename
      );
      setFormData((prevData) => ({ ...prevData, photo: data.data.filename }));
    },
    onError: (error) => {
      console.error("Error uploading image:", error);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      uploadImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetProfileFormError()
    try {
      const jobData = {
        name: formData.name,
        industry_type_id: Number(formData.industry_type_id),
        budget: Number(formData.budget),
        starting: formData.starting,
        staff: Number(formData.staff),
        prefecture_id: Number(formData.prefecture_id),
        company_des: formData.company_des,
        address: formData.address,
        photo: formData.photo,
      };
      setLoading(true)
      const response = await fetchServer({
        endpoint: apiRoutes.PROFILE,
        method: "PUT",
        body: jobData,
        token,
      });

      if (response.success) {
    
        if (verified == false) dispatch(setVerified(true));
        localStorage.setItem("isCompletedProfile", "true");
        setLoading(false)
        dispatch(setName(response.data.name))
        navigate(RouteName.DASHBOARD);
      } else {
        console.error("Failed to update profile:", response.message);
      }
    } catch (error:ErrorType | any) {
      setError(error)
      setLoading(false)
      console.error("Error updating profile:", error);
    }
  };
  // ... existing code ...

useEffect(() => {
  if(error)
  ProfileFormHandleError(error?.message as ProfileFormErrorType)
},[error])

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    const selectedOption = e.target.value;
    setFormData({ ...formData, [field]: selectedOption });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12">
            <img src={logo} className="w-full" alt="Japan job logo" />
          </div>
          <h1 className="font-medium text-2xl">{jp.completeProfile}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between w-full mb-6">
            <div className="space-y-1">
              <h2 className="sub-title text-black">{jp.profilePhoto}</h2>
              <p>{jp.profilePhotoDescription}</p>
            </div>
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className={`w-[70px] h-[70px] rounded-full overflow-hidden ${photoError ? 'border border-red-500 p-1' : ''}`}>
              <div className="w-full h-full object-cover ">
              <img
                  className="w-full h-full object-cover rounded-full"
                  src={avatarImage}
                  crossOrigin="anonymous"
                  alt="Profile avatar"
                />
              </div>
    
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              name="name"
              type="text"
              label={jp.companyName}
              value={formData.name}
              error={companyNameError || ''}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            
            />

            <Select
              name="industry_type_id"
              label={jp.jobArea}
              id={jp.jobArea}
              options={jobTypes}
              defaultOption={jp.chooseIndustry}
              value={formData.industry_type_id}
              onChange={(e) => handleSelectChange(e, "industry_type_id")}
              error={industryTypeError || ''}
            />
            <Input
              name="budget"
              type="number"
              label={jp.investmentAmount}
              placeholder="100000 "
              value={formData.budget}
              error={budgetStringError || ''}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
            />

            <Input
              name="address"
              type="text"
              label={jp.undertake}
              value={formData.address}
              error={addressError || ''}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            <Select
              name="staff"
              label={jp.employeeNumber}
              id={jp.employeeNumber}
              options={employeeNumbers}
              defaultOption={jp.chooseEmployee}
              value={formData.staff}
              error={staffError || ''}
              onChange={(e) => handleSelectChange(e, "staff")}
            />

            <Select
              name="prefecture_id"
              label={jp.area}
              id="city"
              options={countries}
              defaultOption={jp.chooseLocation}
              value={formData.prefecture_id}
              error={prefectureError || ''}
              onChange={(e) => handleSelectChange(e, "prefecture_id")}
            />

            <DatePicker
              name="starting"
              type="date"
              label={jp.establishment}
              value={formData.starting}
              onChange={(e) =>
                setFormData({ ...formData, starting: e.target.value })
              }
              error={startingError || ''}
            />

            <Input
              name="company_des"
              type="text"
              label={jp.companyDescription}
              placeholder="Company description"
              value={formData.company_des}
              onChange={(e) =>
                setFormData({ ...formData, company_des: e.target.value })
              }
              error={companyDesError || ''}
            />
          </div>

          <Button type="submit" className="w-full">
            {loading ? <BeatLoader color="#fff" size={5} /> : jp.finish}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileFormScreen;
