import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/icons/logo.svg";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import defaultImage from "@/assets/icons/default_user.svg";
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
import useHandleError from "@/hooks/useHandleError";
import { ProfileFormErrorType } from "@/types/helperTypes";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { Modal } from "@/components";

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
  formData,
  setFormData,
}: profileFormProps) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const { imgUrl } = useSelector((state: RootState) => state.app);
  const [avatarImage, setAvatarImage] = useState(defaultImage);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const {
    ProfileFormHandleError,
    companyNameError,
    industryTypeError,
    budgetStringError,
    startingError,
    staffError,
    prefectureError,
    companyDesError,
    companyAddressError,
    undertakeError,
    chairmanError,
    phoneNumberError,
    areaError,
    facebookError,
    youtubeError,
    instagramError,
    websiteError,
    emailError,
    resetProfileFormError,
  } = useHandleError();


  /**
   * This post hook is used to post the profile data
   * @author PSK
   */
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
      setImageLoading(true);
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
        `${imgUrl}photo/` + data.data.filename
      );
      setFormData((prevData: any) => ({
        ...prevData,
        photo: data.data.filename,
      }));
      queryClient.invalidateQueries({ queryKey: [QueryKey.PROFILE] });
    },
    onError: (error) => {
      setAlertMessage(error.message);
      setShowAlert(true);
      // console.error("Error uploading image:", error);
      setImageLoading(false);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  /**
   * This function is used to handle the image upload
   * @author PSK
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      uploadImage(file);
    }
  };

  const handleCancel = () => setShowConfirmation(false);

  /**
   * This function is used to format the phone number
   * @author PSK
   */
  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (!cleanedValue) return "";
    return cleanedValue;
  };

  /**
   * This function is used to handle the form submission
   * @author PSK
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetProfileFormError();
    const jobData = {
      photo: (formData.photo as string) || undefined,
      name: (formData.name as string) || undefined,
      industry_type_id: Number(formData.industry_type_id.value) || undefined,
      budget: Number(formData.budget) || undefined,
      starting: formData.starting
        ? moment(formData.starting).format("YYYY-MM-DD")
        : undefined,
      staff: Number(formData.staff) || undefined,
      prefecture: (formData.prefecture as string) || undefined,
      company_des: (formData.company_des as string) || undefined,
      address: (formData.company_address as string) || undefined,
      manager: (formData.manager as string) || undefined,
      phone_number: (formData.phone_number as string) || undefined,
      yt_url: (formData.yt_url as string) || undefined,
      fb_url: (formData.fb_url as string) || undefined,
      web_url: (formData.web_url as string) || undefined,
      ig_url: (formData.ig_url as string) || undefined,
      ceo: (formData.ceo as string) || undefined,
      secondary_email: (formData.secondary_email as string) || undefined,
      area: (formData.area as string) || undefined,
    };

    mutate({
      endpoint: apiRoutes.PROFILE,
      body: jobData,
      method: "PUT",
    });
  };

  
  /**
   * This effect is used to handle the form submission
   * @author PSK
   */
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowConfirmation(false);
        setIsEdit(false);
      }, 500);
    }
    if (profileData) {
      dispatch(setName(profileData.data.name));
    }
    if (error) {
      setShowConfirmation(false);
      ProfileFormHandleError(error?.message as ProfileFormErrorType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, profileData, dispatch, error]);

  /**
   * This effect is used to set the avatar image
   * @author PSK
   */
  useEffect(() => {
    if (formData.photo) {
      setAvatarImage(
        `${imgUrl}photo/` + formData.photo
      );
    }
  }, [formData.photo]);

  return (
    <>
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
              {imageLoading && (
                <div className="w-full h-full flex items-center justify-center">
                  <Skeleton circle height={80} width={80} />
                </div>
              )}
              <img
                className="w-full h-full object-cover rounded-full"
                src={avatarImage}
                crossOrigin="anonymous"
                alt="Profile avatar"
                onLoad={() => setImageLoading(false)}
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
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
              error={companyNameError || ""}
              required={false}
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
                setFormData((prevData: any) => ({
                  ...prevData,
                  industry_type_id: {
                    label: e.target?.labels,
                    value: e.target.value,
                  },
                }));
              }}
              error={industryTypeError || ""}
            />
            <Input
              name="secondary_email"
              type="email"
              placeholder=""
              label={jp.email}
              className="mt-1 block w-full bg-gray-100"
              value={formData.secondary_email}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  secondary_email: e.target.value,
                }))
              }
              error={emailError || ""}
              required={false}
            />

            <Input
              name="phone_number"
              type="text"
              placeholder="08xxxxxxxxx"
              label={jp.phoneNumber}
              className="mt-1 block w-full bg-gray-100"
              value={formData.phone_number || ""}
              onChange={(e) => {
                setFormData((prevData: any) => ({
                  ...prevData,
                  phone_number: formatPhoneNumber(e.target.value),
                }));
              }}
              error={phoneNumberError || ""}
              required={false}
            />
            <Input
              name="budget"
              type="number"
              label={jp.investmentAmount}
              className="mt-1 block w-full bg-gray-100"
              placeholder="¥ 100,000"
              value={formData.budget}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  budget: e.target.value,
                }))
              }
              error={budgetStringError || ""}
              required={false}
            />
            <Input
              name="company_address"
              type="text"
              label={jp.companyAddress}
              className="mt-1 block w-full bg-gray-100"
              value={
                formData.company_address == "null"
                  ? ""
                  : formData.company_address
              }
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  company_address: e.target.value,
                }))
              }
              error={companyAddressError || ""}
              required={false}
            />
            <Input
              name="ceo"
              type="text"
              label={jp.chairman}
              className="mt-1 block w-full bg-gray-100"
              value={formData.ceo == "null" ? "" : formData.ceo}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  ceo: e.target.value,
                }))
              }
              error={chairmanError || ""}
              required={false}
            />
            <Input
              name="manager"
              type="text"
              label={jp.undertake}
              className="mt-1 block w-full bg-gray-100"
              value={formData.manager}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  manager: e.target.value,
                }))
              }
              error={undertakeError || ""}
              required={false}
            />
            <Input
              name="staff"
              type="number"
              label={jp.employeeNumber}
              className="mt-1 block w-full bg-gray-100"
              value={formData.staff}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  staff: e.target.value,
                }))
              }
              error={staffError || ""}
              required={false}
            />
            <Input
              name="area"
              type="text"
              label={jp.area}
              className="mt-1 block w-full bg-gray-100"
              value={formData.area}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  area: e.target.value,
                }))
              }
              error={areaError || ""}
              required={false}
            />
            <DatePicker
              name="starting"
              type="date"
              label={jp.establishment}
              className="mt-1 block w-full"
              value={formData.starting}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  starting: e.target.value,
                }))
              }
              error={startingError || ""}
              required={false}
            />
            <Input
              name="prefecture"
              type="text"
              label={jp.city}
              className="mt-1 block w-full bg-gray-100"
              value={formData.prefecture}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  prefecture: e.target.value,
                }))
              }
              error={prefectureError || ""}
              required={false}
            />
            <Input
              name="fb_url"
              type="text"
              label={jp.facebook}
              className="mt-1 block w-full bg-gray-100"
              placeholder=""
              value={formData.fb_url}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  fb_url: e.target.value,
                }))
              }
              error={facebookError || ""}
              required={false}
            />
            <Input
              name="yt_url"
              type="text"
              label={jp.youtube}
              className="mt-1 block w-full bg-gray-100"
              placeholder=""
              value={formData.yt_url}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  yt_url: e.target.value,
                }))
              }
              error={youtubeError || ""}
              required={false}
            />
            <Input
              name="web_url"
              type="text"
              label={jp.website}
              className="mt-1 block w-full bg-gray-100"
              placeholder=""
              value={formData.web_url}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  web_url: e.target.value,
                }))
              }
              error={websiteError || ""}
              required={false}
            />
            <Input
              name="ig_url"
              type="text"
              label={jp.instagram}
              className="mt-1 block w-full bg-gray-100"
              placeholder=""
              value={formData.ig_url}
              onChange={(e) =>
                setFormData((prevData: any) => ({
                  ...prevData,
                  ig_url: e.target.value,
                }))
              }
              error={instagramError || ""}
              required={false}
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
                  setFormData((prevData: any) => ({
                    ...prevData,
                    company_des: e.target.value,
                  }))
                }
                error={companyDesError || ""}
                required={false}
              />
            </span>
          </div>

          <div className="flex justify-between w-full px-10 mr-10 mt-5">
            <button
              className="text-blue-600 hover:text-blue-800 font-medium flex gap-x-1"
              onClick={() => setIsEdit(false)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              {jp.back}
            </button>
            <Button
              variant="destructive"
              className="font-medium w-44 flex gap-x-2"
              type="button"
              onClick={() => setShowConfirmation(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              {jp.update}
            </Button>
          </div>
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <ConfirmationBox
                  message="送信してもよろしいですか？"
                  onCancel={handleCancel}
                  onConfirm={() => {}}
                  loading={isPending}
                  isSuccess={isSuccess}
                />
              </div>
            </div>
          )}
        </form>
      </motion.div>
      <Modal isOpen={showAlert} onClose={() => setShowAlert(false)}>
        <div className="p-6">
          <p className="mb-4">{alertMessage}</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setShowAlert(false);
                setAlertMessage("");
              }}
            >
              {jp.confirm}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const formVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};

export default ProfileForm;
