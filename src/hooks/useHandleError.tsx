import {
  AuthErrorType,
  ProfileFormErrorType,
  JobFormErrorType,
} from "@/types/helperTypes";
import { useState } from "react";
import { ERROR_MESSAGE } from "@/constants/errorMessage";

const useHandleError = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [companyNameError, setCompanyNameError] = useState<string | null>(null);
  const [industryTypeError, setIndustryTypeError] = useState<string | null>(
    null,
  );
  const [budgetStringError, setBudgetStringError] = useState<string | null>(
    null,
  );
  const [startingError, setStartingError] = useState<string | null>(null);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [prefectureError, setPrefectureError] = useState<string | null>(null);
  const [companyDesError, setCompanyDesError] = useState<string | null>(null);
  const [companyAddressError, setCompanyAddressError] = useState<string | null>(
    null,
  );
  const [undertakeError, setUnderTakeError] = useState<string | null>(null);
  const [jobNameError, setJobNameError] = useState<string | null>(null);
  const [jobTypeError, setJobTypeError] = useState<string | null>(null);
  const [salaryError, setSalary] = useState<string | null>(null);
  const [workTimeError, setWorkTimeError] = useState<string | null>(null);
  const [startTimeError, setStartTimeError] = useState<string | null>(null);
  const [endTimeError, setEndTimeError] = useState<string | null>(null);
  const [holidayError, setHolidayError] = useState<string | null>(null);
  const [chairmanError, setChairmanError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [facebookError, setFacebookError] = useState<string | null>(null);
  const [youtubeError, setYoutubeError] = useState<string | null>(null);
  const [instagramError, setInstagramError] = useState<string | null>(null);
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [areaError, setAreaError] = useState<string | null>(null);

  const authHandleError = (error: AuthErrorType | null) => {
    if (error && error?.validation) {
      error.validation.forEach((err: any) => {
        if (err?.email) {
          setEmailError(err?.email?.jp ?? null);
        }
        if (err?.password) {
          setPasswordError(err?.password?.jp ?? null);
        }
        if (err?.confirm_password) {
          setConfirmPasswordError(err?.confirm_password?.jp ?? null);
        }
      });
    } else {
      if (error?.email) {
        setEmailError(error?.email?.jp ?? null);
      }
      if (error?.password) {
        setPasswordError(error?.password?.jp ?? null);
      }
      if (error?.confirm_password) {
        setConfirmPasswordError(error?.confirm_password?.jp ?? null);
      }
      if (error?.otp) {
        setOtpError(error?.otp?.jp ?? null);
      }
    }
  };

  const ProfileFormHandleError = (error: ProfileFormErrorType | null) => {
    if (error && error?.validation) {
      error.validation.forEach((err: any) => {
        if (err?.photo) {
          setPhotoError(err?.photo?.jp ?? ERROR_MESSAGE.INVALID_PHOTO);
        }
        if (err?.name) {
          setCompanyNameError(
            err?.name?.jp ?? ERROR_MESSAGE.INVALID_COMPANY_NAME,
          );
        }
        if (err?.industry_type_id) {
          setIndustryTypeError(
            err?.industry_type_id?.jp ??
              ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.budget) {
          setBudgetStringError(err?.budget?.jp ?? ERROR_MESSAGE.INVALID_BUDGET);
        }
        if (err?.starting) {
          setStartingError(err?.starting?.jp ?? ERROR_MESSAGE.INVALID_STARTING);
        }
        if (err?.staff) {
          setStaffError(
            err?.staff?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (error?.area) {
          setAreaError(error?.area?.jp ?? ERROR_MESSAGE.INVALID_AREA);
        }
        if (err?.prefecture_id) {
          setPrefectureError(
            err?.prefecture_id?.jp ?? ERROR_MESSAGE.INVALID_PREFECTURE,
          );
        }
        if (err?.company_des) {
          setCompanyDesError(
            err?.company_des?.jp ?? ERROR_MESSAGE.INVALID_COMPANY_DESCRIPTION,
          );
        }
        if (err?.address) {
          setCompanyAddressError(
            err?.address?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.manager) {
          setUnderTakeError(
            err?.manager?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.ceo) {
          setChairmanError(err?.chairman?.jp ?? ERROR_MESSAGE.INVALID_CHAIRMAN);
        }
        if (err?.secondary_email) {
          setEmailError(
            err?.secondary_email?.jp ?? ERROR_MESSAGE.INVALID_EMAIL,
          );
        }
        if (err?.phone_number) {
          setPhoneNumberError(
            err?.phone_number?.jp ?? ERROR_MESSAGE.INVALID_PHONE_NUMBER,
          );
        }
        if (error?.fb_url) {
          setFacebookError(error?.fb_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
        }
        if (error?.yt_url) {
          setYoutubeError(error?.yt_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
        }
        if (error?.ig_url) {
          setInstagramError(error?.ig_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
        }
        if (error?.web_url) {
          setWebsiteError(error?.web_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
        }
      });
    } else {
      if (error?.photo) {
        setPhotoError(error?.photo?.jp ?? ERROR_MESSAGE.INVALID_PHOTO);
      }
      if (error?.name) {
        setCompanyNameError(
          error?.name?.jp ?? ERROR_MESSAGE.INVALID_COMPANY_NAME,
        );
      }
      if (error?.industry_type_id) {
        setIndustryTypeError(
          error?.industry_type_id?.jp ??
            ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.budget) {
        setBudgetStringError(error?.budget?.jp ?? ERROR_MESSAGE.INVALID_BUDGET);
      }
      if (error?.starting) {
        setStartingError(error?.starting?.jp ?? ERROR_MESSAGE.INVALID_STARTING);
      }
      if (error?.staff) {
        setStaffError(
          error?.staff?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.area) {
        setAreaError(error?.area?.jp ?? ERROR_MESSAGE.INVALID_AREA);
      }
      if (error?.prefecture_id) {
        setPrefectureError(
          error?.prefecture_id?.jp ?? ERROR_MESSAGE.INVALID_PREFECTURE,
        );
      }
      if (error?.company_des) {
        setCompanyDesError(
          error?.company_des?.jp ?? ERROR_MESSAGE.INVALID_COMPANY_DESCRIPTION,
        );
      }
      if (error?.address) {
        setCompanyAddressError(
          error?.address?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.manager) {
        setUnderTakeError(
          error?.manager?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.ceo) {
        setChairmanError(error?.ceo?.jp ?? ERROR_MESSAGE.INVALID_CHAIRMAN);
      }
      if (error?.secondary_email) {
        setEmailError(
          error?.secondary_email?.jp ?? ERROR_MESSAGE.INVALID_EMAIL,
        );
      }
      if (error?.phone_number) {
        setPhoneNumberError(
          error?.phone_number?.jp ?? ERROR_MESSAGE.INVALID_PHONE_NUMBER,
        );
      }
      if (error?.fb_url) {
        setFacebookError(error?.fb_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
      }
      if (error?.yt_url) {
        setYoutubeError(error?.yt_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
      }
      if (error?.ig_url) {
        setInstagramError(error?.ig_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
      }
      if (error?.web_url) {
        setWebsiteError(error?.web_url?.jp ?? ERROR_MESSAGE.INVALID_LINK);
      }
    }
  };

  const jobFormHandleError = (error: JobFormErrorType | null) => {
    if (error && error?.validation) {
      error.validation.forEach((err: any) => {
        if (err?.job_title) {
          setJobNameError(err?.job_title?.jp ?? ERROR_MESSAGE.INVALID_JOB_NAME);
        }
        if (err?.job_types) {
          setJobTypeError(
            err?.job_types?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.prefecture_id) {
          setPrefectureError(
            err?.prefecture_id?.jp ??
              ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.annual_salary) {
          setSalary(
            err?.annual_salary?.jp ??
              ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.working_time) {
          setWorkTimeError(
            err?.working_time?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.holiday_in_year) {
          setHolidayError(
            err?.holiday_in_year?.jp ??
              ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.start_time) {
          setStartTimeError(err?.start_time?.jp ?? ERROR_MESSAGE.INVALID_TIME);
        }
        if (err?.end_time) {
          setEndTimeError(err?.end_time?.jp ?? ERROR_MESSAGE.INVALID_TIME);
        }
        if (err?.job_des) {
          setCompanyDesError(
            err?.job_des?.jp ?? ERROR_MESSAGE.INVALID_JOB_DESCRIPTION,
          );
        }
        if (err?.area) {
          setAreaError(
            err?.area?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
      });
    } else {
      if (error?.job_title) {
        setJobNameError(error?.job_title?.jp ?? ERROR_MESSAGE.INVALID_JOB_NAME);
      }
      if (error?.job_types) {
        setJobTypeError(
          error?.job_types?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.prefecture_id) {
        setPrefectureError(
          error?.prefecture_id?.jp ??
            ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.annual_salary) {
        setSalary(
          error?.annual_salary?.jp ??
            ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.working_time) {
        setWorkTimeError(
          error?.working_time?.jp ??
            ERROR_MESSAGE.PLEASE_SELECT_A_VALID_WORKING_TIME,
        );
      }
      if (error?.holiday_in_year) {
        setHolidayError(
          error?.holiday_in_year?.jp ??
            ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
      if (error?.start_time) {
        setStartTimeError(
          error?.prefecture_id?.jp ?? ERROR_MESSAGE.INVALID_TIME,
        );
      }
      if (error?.end_time) {
        setEndTimeError(error?.end_time?.jp ?? ERROR_MESSAGE.INVALID_TIME);
      }
      if (error?.job_des) {
        setCompanyDesError(
          error?.job_des?.jp ?? ERROR_MESSAGE.INVALID_JOB_DESCRIPTION,
        );
      }
      if (error?.area) {
        setAreaError(
          error?.area?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
      }
    }
  };

  return {
    authHandleError,
    emailError,
    passwordError,
    confirmPasswordError,
    otpError,
    resetAuthError: () => {
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
      setOtpError(null);
    },
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
    resetProfileFormError: () => {
      setCompanyNameError(null);
      setIndustryTypeError(null);
      setBudgetStringError(null);
      setStartingError(null);
      setStaffError(null);
      setPrefectureError(null);
      setCompanyDesError(null);
      setCompanyAddressError(null);
      setUnderTakeError(null);
      setPhotoError(null);
      setChairmanError(null);
      setEmailError(null);
      setPhoneNumberError(null);
      setAreaError(null);
      setFacebookError(null);
      setYoutubeError(null);
      setInstagramError(null);
      setWebsiteError(null);
    },
    jobFormHandleError,
    jobNameError,
    jobTypeError,
    salaryError,
    workTimeError,
    holidayError,
    startTimeError,
    endTimeError,
    resetJobFormError: () => {
      setJobNameError(null);
      setJobTypeError(null);
      setSalary(null);
      setWorkTimeError(null);
      setHolidayError(null);
      setCompanyDesError(null);
      setPrefectureError(null);
      setStartTimeError(null);
      setEndTimeError(null);
      setAreaError(null);
    },
  };
};

export default useHandleError;
