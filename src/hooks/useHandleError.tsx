import { AuthErrorType, ProfileFormErrorType } from "@/types/helperTypes";
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
  const [industryTypeError, setIndustryTypeError] = useState<string | null>(null);
  const [budgetStringError, setBudgetStringError] = useState<string | null>(null);
  const [startingError, setStartingError] = useState<string | null>(null);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [prefectureError, setPrefectureError] = useState<string | null>(null);
  const [companyDesError, setCompanyDesError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
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
      if(error?.otp){
        setOtpError(error?.otp?.jp ?? null);
      }
    }
  };


  const ProfileFormHandleError = (error: ProfileFormErrorType | null) => {
    console.log('profile form error',error)
    if (error && error?.validation) {
      error.validation.forEach((err: any) => {
        if (err?.photo) {
          setPhotoError(err?.photo?.jp ?? ERROR_MESSAGE.INVALID_PHOTO);
        }
        if (err?.name) {
          setCompanyNameError(err?.name?.jp ?? null);
        }
        if (err?.industry_type_id) {
          setIndustryTypeError(err?.industry_type_id?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION);
        }
        if (err?.budget) {
          setBudgetStringError(err?.budget?.jp ?? null);
        }
        if (err?.starting_year) {
          setStartingError(err?.starting_year?.jp ?? null);
        }
        if (err?.staff) {
          setStaffError(err?.staff?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION);
        }
        if (err?.prefecture_id) {
          setPrefectureError(err?.prefecture_id?.jp ?? ERROR_MESSAGE.PLEASE_SELECT_A_VALID_OPTION);
        }
        if (err?.company_description) {
          setCompanyDesError(err?.company_description?.jp ?? null);
        }
        if (err?.address) {
          setAddressError(err?.address?.jp ?? null);
        }
      });
    } else {
      if(error?.photo){
        setPhotoError(error?.photo?.jp ?? ERROR_MESSAGE.INVALID_PHOTO);
      }
      if (error?.name) {
        setCompanyNameError(error?.name?.jp ?? null);
      }
      if (error?.industry_type_id) {
        setIndustryTypeError(error?.industry_type_id?.jp ?? null);
      }
      if (error?.budget) {
        setBudgetStringError(error?.budget?.jp ?? null);
      }
      if(error?.starting){
        setStartingError(error?.starting?.jp ?? null);
      }
      if(error?.staff){
        setStaffError(error?.staff?.jp ?? null);
      }
      if(error?.prefecture_id){
        setPrefectureError(error?.prefecture_id?.jp ?? null);
      }
      if(error?.company_des){
        setCompanyDesError(error?.company_des?.jp ?? null);
      }
      if(error?.address){
        setAddressError(error?.address?.jp ?? null);
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
  };
};

export default useHandleError;
