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
import { setVerified, setName } from "@/store";
import { useDispatch } from "react-redux";
import useHandleError from "@/hooks/useHandleError";
import { ProfileFormErrorType, ErrorType } from "@/types/helperTypes";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Modal } from "@/components";

const employeeNumber = [
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
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [jobTypes, setJobTypes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    industry_type_id: { label: "", value: "" },
    budget: "",
    starting: "",
    staff: { label: "", value: "" },
    area: "",
    prefecture: "",
    photo: "",
    company_des: "",
    manager: "",
    company_address: "",
    secondary_email: "",
    phone_number: "",
    ceo: "",
    yt_url: "",
    ig_url: "",
    web_url: "",
    fb_url: "",
  });
  const {
    ProfileFormHandleError,
    companyNameError,
    industryTypeError,
    budgetStringError,
    startingError,
    staffError,
    prefectureError,
    companyDesError,
    photoError,
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
   * Fetches job types data from the server
   * @returns {void}
   * @author PSK
   */
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
          })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  /**
   * Mutation for uploading an image
   * @param {File} file - The file to be uploaded
   * @returns {void}
   * @author PSK
   */
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
        token,
      });
    },
    onSuccess: (data) => {
      setAvatarImage(
        "https://api.japanjob.exbrainedu.com/v1/file/photo/" +
          data.data.filename,
      );
      setFormData((prevData) => ({ ...prevData, photo: data.data.filename }));
    },
    onError: (error) => {
      setAlertMessage(error.message);
      setShowAlert(true);
      console.error("Error uploading image:", error);
      setImageLoading(false);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  /**
   * Handles image upload event
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
   * @returns {void}
   * @author PSK
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      uploadImage(file);
    }
  };

  /**
   * Formats phone number
   * @param {string} value - The phone number to be formatted
   * @returns {string} - The formatted phone number
   * @author PSK
   */
  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length <= 3) {
      return cleanedValue;
    } else if (cleanedValue.length <= 7) {
      return `${cleanedValue.slice(0, 3)} ${cleanedValue.slice(3)}`;
    } else if (cleanedValue.length <= 11) {
      return `${cleanedValue.slice(0, 3)} ${cleanedValue.slice(3, 7)} ${cleanedValue.slice(7, 11)}`;
    } else {
      return `${cleanedValue.slice(0, 3)} ${cleanedValue.slice(3, 7)} ${cleanedValue.slice(7, 11)} ${cleanedValue.slice(11, 15)}`;
    }
  };

  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   * @returns {void}
   * @author PSK
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetProfileFormError();
    try {
      const jobData = {
        name: formData.name || undefined,
        industry_type_id: Number(formData.industry_type_id.value) || undefined,
        budget: Number(formData.budget) || undefined,
        starting: formData.starting
          ? moment(formData.starting).format("YYYY-MM-DD")
          : undefined,
        staff: Number(formData.staff.value) || undefined,
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

      setLoading(true);
      const response = await fetchServer({
        endpoint: apiRoutes.PROFILE,
        method: "PUT",
        body: jobData,
        token,
      });

      if (response.success) {
        if (verified == false) dispatch(setVerified(true));
        localStorage.setItem("isCompletedProfile", "true");
        setLoading(false);
        dispatch(setName(response.data.name));
        navigate(RouteName.DASHBOARD);
      } else {
        console.error("Failed to update profile:", response.message);
      }
    } catch (error: ErrorType | any) {
      setError(error);
      setLoading(false);
    }
  };

  /**
   * Handles error if any
   * @returns {void}
   * @author PSK
   */
  useEffect(() => {
    if (error) ProfileFormHandleError(error?.message as ProfileFormErrorType);
  });

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex items-center justify-center py-5">
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
                <div
                  className={`w-[70px] h-[70px] rounded-full overflow-hidden ${
                    photoError ? "border border-red-500 p-1" : ""
                  }`}
                >
                  <div className="w-full h-full object-cover ">
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
                placeholder={jp.companyName}
                label={jp.companyName}
                className="mt-1 block w-full bg-gray-100"
                value={formData.name || ""}
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
                value={formData.industry_type_id || ""}
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
                value={formData.secondary_email || ""}
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
                placeholder="08x xxxx xxxx"
                label={jp.phoneNumber}
                className="mt-1 block w-full bg-gray-100"
                value={formatPhoneNumber(formData.phone_number) || ""}
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
                value={formData.budget || ""}
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
                    : formData.company_address || ""
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
                value={formData.ceo == "null" ? "" : formData.ceo || ""}
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
                value={formData.manager || ""}
                onChange={(e) =>
                  setFormData((prevData: any) => ({
                    ...prevData,
                    manager: e.target.value,
                  }))
                }
                error={undertakeError || ""}
                required={false}
              />
              <Select
                name="staff"
                label={jp.employeeNumber}
                id={jp.employeeNumber}
                options={employeeNumber}
                className=""
                defaultOption={jp.chooseEmployee}
                value={formData.staff || ""}
                onChange={(e) =>
                  setFormData((prevData: any) => ({
                    ...prevData,
                    staff: { label: e.target.labels, value: e.target.value },
                  }))
                }
                error={staffError || ""}
              />
              <Input
                name="area"
                type="text"
                label={jp.area}
                className="mt-1 block w-full bg-gray-100"
                value={formData.area || ""}
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
                value={formData.starting || ""}
                onChange={(e) =>
                  setFormData((prevData: any) => ({
                    ...prevData,
                    starting: e.target.value,
                  }))
                }
                error={startingError || ""}
              />
              <Input
                name="prefecture"
                type="text"
                label={jp.city}
                className="mt-1 block w-full bg-gray-100"
                value={formData.prefecture || ""}
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
                value={formData.fb_url || ""}
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
                value={formData.yt_url || ""}
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
                value={formData.web_url || ""}
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
                value={formData.ig_url || ""}
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
                  value={formData.company_des || ""}
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

            <Button type="submit" className="w-full">
              {loading ? <BeatLoader color="#fff" size={5} /> : jp.finish}
            </Button>
          </form>
        </motion.div>
      </div>

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

export default ProfileFormScreen;
