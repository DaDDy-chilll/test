import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/icons/logo.svg";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import defaultImage from "@/assets/images/default.png";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { jp } from "@/lang/jp";
import { ConfirmationBox } from "@/components";
import { fetchServer } from "@/utils/helper";
import { apiRoutes } from "@/utils/apiRoutes";
import usePost from "@/hooks/usePost";
import { QueryKey } from "@/utils/queryKey";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setName } from "@/store/features/NavigationSlice";
import  useHandleError  from "@/hooks/useHandleError";
import { ProfileFormErrorType } from "@/types/helperTypes";
import { useQueryClient } from "@tanstack/react-query";

type profileFormProps = {
  setIsEdit: (value: boolean) => void;
  data: any;
  jobTypes: any;
  employeeNumber: any;
  countries: any;
  formData: any;
  setFormData: (data: any) => void;
  city: any;
};

const ProfileForm = ({
  setIsEdit,
  jobTypes,
  employeeNumber,
  city,
  countries,
  formData,
  setFormData,
}: profileFormProps) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [avatarImage, setAvatarImage] = useState(defaultImage);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
  const {
    mutate,
    isSuccess,
    data: profileData,
    isPending,
    error,
  } = usePost({
    token,
    queryKey: QueryKey.PROFILE,
  });
  const { mutate: uploadImage } = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return fetchServer({
        endpoint: apiRoutes.UPLOAD_IMAGE,
        method: "POST",
        body: { file: formData.get("file") },
        file: true,
      });
    },
    onSuccess: (data) => {
      setAvatarImage(
        "https://api.japanjob.exbrainedu.com/v1/file/photo/" +
          data.data.filename
      );
      setFormData((prevData: any) => ({
        ...prevData,
        photo: data.data.filename,
      }));
      queryClient.invalidateQueries({ queryKey: [QueryKey.PROFILE]});

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

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetProfileFormError();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const jobData = {
      name: (formData.get("name") as string) || undefined,
      industry_type_id:
        Number(formData.get("industry_type_id") as string) || undefined,
      budget: Number(formData.get("budget") as string) || undefined,
      starting: formData.get("starting")
        ? moment(formData.get("starting") as string).format("YYYY-MM-DD")
        : undefined,
      staff: Number(formData.get("staff") as string) || undefined,
      prefecture_id:
        Number(formData.get("prefecture_id") as string) || undefined,
      company_des: (formData.get("company_des") as string) || undefined,
      address: (formData.get("address") as string) || undefined,
    };

    // Remove undefined properties
    const cleanedJobData = Object.fromEntries(
      Object.entries(jobData).filter(([_, value]) => value !== undefined)
    );

    mutate({
      endpoint: apiRoutes.PROFILE,
      body: cleanedJobData,
      method: "PUT",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowConfirmation(false);
      setIsEdit(false);
    }
    if (profileData) {
      dispatch(setName(profileData.data.name));
    }
    if (error) {
      setShowConfirmation(false);
      ProfileFormHandleError(error?.message as ProfileFormErrorType);
    }
  }, [isSuccess, profileData, dispatch, error]);

  useEffect(() => {
    if (formData.photo) {
      setAvatarImage(
        "https://api.japanjob.exbrainedu.com/v1/file/photo/" + formData.photo
      );
    }
  }, [formData.photo]);

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
          <img
            src={logo}
            crossOrigin="anonymous"
            className="w-full"
            alt="Japan job logo"
          />
        </div>
        <h1 className="font-medium">JAPAN JOB</h1>
      </div>
      <div className="flex justify-between w-5/6 pt-14 pb-2 pl-10">
        <div className="space-y-1">
          <h1 className="sub-title text-black">{jp.profilePhoto}</h1>
          <p>{jp.profilePhotoDescription}</p>
        </div>
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={avatarImage}
              crossOrigin="anonymous"
              alt="Profile avatar"
            />
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
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-3 gap-x-20 px-10">
          <Input
            name="name"
            type="text"
            placeholder={jp.companyName}
            label={jp.companyName}
            className="mt-1 block w-full bg-gray-100"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={companyNameError || ''}
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
              setFormData({
                ...formData,
                industry_type_id: {
                  label: e.target?.labels,
                  value: e.target.value,
                },
              });
            }}
            error={industryTypeError || ''}
          />
          <Input
            name="budget"
            type="number"
            label={jp.investmentAmount}
            className="mt-1 block w-full bg-gray-100"
            placeholder="100000 $"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            error={budgetStringError || ''}
          />
          <Input
            name="address"
            type="text"
            label={jp.undertake}
            className="mt-1 block w-full bg-gray-100"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            error={addressError || ''}
          />
          <Select
            name="staff"
            label={jp.employeeNumber}
            id={jp.employeeNumber}
            options={employeeNumber}
            className=""
            defaultOption={jp.chooseEmployee}
            value={formData.staff}
            onChange={(e) =>
              setFormData({
                ...formData,
                staff: { label: e.target.labels, value: e.target.value },
              })
            }
            error={staffError || ''}
          />
          <Select
            name="prefecture_id"
            label={jp.area}
            id=""
            options={countries}
            className=""
            defaultOption={jp.chooseLocation}
            value={formData.area}
            onChange={(e) =>
              setFormData({
                ...formData,
                area: { label: e.target.labels, value: e.target.value },
              })
            }
            error={prefectureError || ''}
          />
          <DatePicker
            name="starting"
            type="date"
            label={jp.establishment}
            className="mt-1 block w-full"
            value={formData.starting}
            onChange={(e) =>
              setFormData({ ...formData, starting: e.target.value })
            }
            error={startingError || ''}
          />
          <Select
            disabled={formData.prefecture_id.value !== "" ? false : true}
            label={jp.city}
            id="city"
            options={city[formData.area.value]}
            className=""
            defaultOption={jp.chooseLocation}
            value={formData.prefecture_id}
            onChange={(e) =>
              setFormData({ ...formData, prefecture_id: e.target.value })
            }
            error={prefectureError || ''}
          />
          <span className="col-span-2">
            <Input
              name="company_des"
              type="text"
              label={jp.companyDescription}
              className="mt-1 block w-full bg-gray-100"
              placeholder="Company description"
              value={formData.company_des}
              onChange={(e) =>
                setFormData({ ...formData, company_des: e.target.value })
              }
              error={companyDesError || ''}
            />
          </span>
        </div>

        <div className="flex justify-between w-full px-10 mr-10 mt-5">
          <button
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setIsEdit(false)}
            type="button"
          >
            ← {jp.back}
          </button>
          <Button
            variant="destructive"
            className="font-medium w-44"
            type="button"
            onClick={() => setShowConfirmation(true)}
          >
            {jp.finish}
          </Button>
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ConfirmationBox
                message="送信してもよろしいですか？"
                onCancel={handleCancel}
                loading={isPending}
              />
            </div>
          </div>
        )}
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
