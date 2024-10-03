import ProfileDetail from "@/components/ui/ProfileDetail";
import { motion } from "framer-motion";
import { useState, useEffect, FormEvent, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Loading from "@/components/ui/Loading";
import { jp } from "@/lang/jp";
import { useDispatch } from "react-redux";
import { setTitle, setName } from "@/store";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import usePost from "@/hooks/usePost";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import ProfileForm from "@/components/Profile/ProfileForm";


const defaultFormData = {
  name: "",
  industry_type_id: {label: "", value: ""},
  budget: "",
  starting: "",
  staff:  {label: "", value: ""},
  prefecture_id: {label: "", value: ""},
  company_des: "",
  address: "",
}


const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  console.log('formData', formData);
  const { data, isLoading } = useFetch({
    endpoint: apiRoutes.PROFILE,
    key: QueryKey.PROFILE,
    token: token as string,
  });
  const { mutate, isPending, error, isSuccess,data: profileData } = usePost({
    token,
    queryKey: QueryKey.PROFILE,
  });

  const {
    data: jobType,
    isLoading: isJobTypesLoading,
    isError: isJobTypesError,
    isSuccess: isJobTypesSuccess,
    error: jobTypesError,
  } = useFetch({
    endpoint: apiRoutes.JOB_TYPES,
    key: QueryKey.JOB_TYPES,
    token: token as string,
  });

  const {
    data: city,
    isLoading: isCityLoading,
    isError: isCityError,
    isSuccess: isCitySuccess,
    error: cityError,
  } = useFetch({
    endpoint: apiRoutes.CITY,
    key: QueryKey.CITY,
    token: token as string,
  });


  // const countries =
  //   city?.data.map((type: any) => ({
  //     value: type.id.toString(),
  //     label: type.area,
  //   })) || [];

  const jobTypes =
    jobType?.data.map((type: any) => ({
      value: type.id.toString(),
      label: type.job_type_jp,
    })) || [];

  useEffect(() => {
    dispatch(setTitle(jp.profile));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setIsEdit(false);
    }
    if (profileData) {
      console.log('profileData', profileData);
      dispatch(setName(profileData.data.name));
    }
  }, [isSuccess,data]);

  const employeeNumber = [
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
  ];


  const transformAreaData = useCallback(
    (data: any) => {
      if (data) {
        const areaList = data?.map((item: any) => ({
          label: item.area,
          value: item.id.toString(),
        }));
        const relativeArea = data?.reduce((acc: any, item: any) => {
          if (item.m_prefectures.length > 0) {
            acc[item.id.toString()] = item.m_prefectures.map(
              (prefecture: any) => ({
                label: prefecture.name,
                value: prefecture.id.toString(),
              })
            );
          }
          return acc;
        }, {});
        return { areaList, relativeArea };
      }
    },
    [city]
  );
  const { areaList, relativeArea } = useMemo(() => {
    if (city && "data" in city) {
      return (
        transformAreaData(city.data) || {
          areaList: [],
          relativeArea: {},
        }
      );
    } else return { areaList: [], relativeArea: {} };
  }, [city, transformAreaData]);

  // console.log('areaList', areaList);
  // console.log('relativeArea', relativeArea);
  const editHandler = () => setIsEdit(true);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const jobData = {
      name: formData.get("name") as string,
      industry_type_id: Number(formData.get("industry_type_id") as string),
      budget: Number(formData.get("budget") as string),
      starting: moment(formData.get("starting") as string).format("DD/MM/YYYY"),
      staff: Number(formData.get("staff") as string),
      prefecture_id: Number(formData.get("prefecture_id") as string),
      company_des: formData.get("company_des") as string,
      address: formData.get("address") as string,
    };
    // console.log('jobData', jobData,'prefecture_id', formData.get("prefecture_id") as string);
  
    mutate({ endpoint: apiRoutes.PROFILE, body: jobData, method: "PUT" });
  };

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setFormData({
        name: data.data.name,
        industry_type_id: {label: data.data.industry_type.name, value: data.data.industry_type.id},
        budget: data.data.budget,
        starting: data.data.starting,
        staff: {label: data.data.staff, value: data.data.staff},
        prefecture_id: {label: data.data.prefecture.name, value: data.data.prefecture.id},
        company_des: data.data.company_des,
        address: data.data.address,
      });
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{jp.profile} - Japan Job</title>
      </Helmet>
      {(isLoading || isJobTypesLoading || isCityLoading) && <Loading isLoading={isLoading || isJobTypesLoading || isCityLoading} className="h-[calc(100vh-68px)]" />}
      <motion.div
        variants={profileVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-full flex justify-center items-center px-10"
      >
        <AnimatePresence mode="wait">
          {!isEdit && (
            <ProfileDetail editHandler={editHandler} data={data?.data} />
          )}
          {isEdit && (
            <ProfileForm
              setIsEdit={setIsEdit}
              data={data?.data}
              jobTypes={jobTypes}
              employeeNumber={employeeNumber}
              countries={areaList}
              handleSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              city={relativeArea}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const profileVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};


export default Profile;
