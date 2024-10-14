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
  const [addressError, setAddressError] = useState<string | null>(null);
  const [jobNameError, setJobNameError] = useState<string | null>(null);
  const [jobTypeError, setJobTypeError] = useState<string | null>(null);
  const [salaryError, setSalary] = useState<string | null>(null);
  const [workTimeError, setWorkTimeError] = useState<string | null>(null);
  const [startTimeError, setStartTimeError] = useState<string | null>(null);
  const [endTimeError, setEndTimeError] = useState<string | null>(null);
  const [holidayError, setHolidayError] = useState<string | null>(null);

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
        if (err?.starting_year) {
          setStartingError(
            err?.starting_year?.jp ?? ERROR_MESSAGE.INVALID_STARTING,
          );
        }
        if (err?.staff) {
          setStaffError(
            err?.staff?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
        }
        if (err?.prefecture_id) {
          setPrefectureError(
            err?.prefecture_id?.jp ?? ERROR_MESSAGE.INVALID_PREFECTURE,
          );
        }
        if (err?.company_description) {
          setCompanyDesError(
            err?.company_description?.jp ??
              ERROR_MESSAGE.INVALID_COMPANY_DESCRIPTION,
          );
        }
        if (err?.address) {
          setAddressError(
            err?.address?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
          );
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
        setAddressError(
          error?.address?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
        );
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
          error?.working_time?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION,
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
    addressError,
    resetProfileFormError: () => {
      setCompanyNameError(null);
      setIndustryTypeError(null);
      setBudgetStringError(null);
      setStartingError(null);
      setStaffError(null);
      setPrefectureError(null);
      setCompanyDesError(null);
      setAddressError(null);
      setPhotoError(null);
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
    },
  };
};

export default useHandleError;
