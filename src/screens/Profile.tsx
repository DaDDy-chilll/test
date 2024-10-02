import ProfileDetail from "@/components/ui/ProfileDetail";
import { motion } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/icons/logo.svg";
import defaultImage from "@/assets/images/default.png";
import { jp } from "@/lang/jp";
import DatePicker from "@/components/ui/DatePicker";
import Loading from "@/components/ui/Loading";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import usePost from "@/hooks/usePost";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const { data, isLoading } = useFetch({
    endpoint: apiRoutes.PROFILE,
    key: QueryKey.PROFILE,
    token: token as string,
  });
  const { mutate, isPending, error, isSuccess } = usePost({
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

  const countries =
    city?.data.map((type: any) => ({
      value: type.id.toString(),
      label: type.area,
    })) || [];

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
  }, [isSuccess]);

  const employeeNumber = [
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
  ];

  const editHandler = () => setIsEdit(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const jobData = {
      name: formData.get("name") as string,
      // industry_type_id: Number(formData.get("industry_type_id") as string),
      industry_type_id: 1,
      budget: Number(formData.get("budget") as string),
      starting: moment(formData.get("starting") as string).format("DD/MM/YYYY"),
      staff: Number(formData.get("staff") as string),
      prefecture_id: Number(formData.get("prefecture_id") as string),
      company_des: formData.get("company_des") as string,
      address: formData.get("address") as string,
    };
    // console.log('jobData', jobData);
    mutate({ endpoint: apiRoutes.PROFILE, body: jobData, method: "PUT" });
  };

  console.log("data", data);
  return (
    <>
      <Helmet>
        <title>{jp.profile} - Japan Job</title>
      </Helmet>
      {false && <Loading isLoading={false} className="h-[calc(100vh-68px)]" />}
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
            <motion.div
              key="form"
              className="w-full h-full bg-gray-100 px-8 pb-5 pt-29 space-y-2 flex flex-col justify-center items-center relative"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="absolute left-7 top-5 flex items-center gap-3">
                <div className="w-12">
                  <img src={logo} className="w-full" alt="Japan job logo" />
                </div>
                <h1 className="font-medium">JAPAN JOB</h1>
              </div>
              <div className="flex justify-between w-5/6 pt-14 pb-2 pl-10">
                <div className="space-y-1">
                  <h1 className="sub-title text-black">Profile Photo</h1>
                  <p>This will be your public photo for your company</p>
                </div>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={defaultImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <form className=" w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-y-3 gap-x-20 px-10">
                  <Input
                    name="name"
                    type="text"
                    placeholder={jp.companyName}
                    label={jp.companyName}
                    className="mt-1 block w-full bg-gray-100 "
                    value={data?.data.name}
                  />

                  <Select
                    name="industry_type_id"
                    label={jp.jobArea}
                    id={jp.jobArea}
                    options={jobTypes}
                    className=""
                    defaultOption={data?.data.industry_type.name || jp.chooseIndustry}
                  />
                  <Input
                    name="budget"
                    type="text"
                    label={jp.investmentAmount}
                    className="mt-1 block w-full bg-gray-100 "
                    placeholder="100000 $"
                    value={data?.data.budget}
                  />
                  <Input
                    name="address"
                    type="text"
                    label={jp.undertake}
                    className="mt-1 block w-full bg-red-100 "
                    value={data?.data.address}
                  />
                  <Select
                    name="staff"
                    label={jp.employeeNumber}
                    id={jp.employeeNumber}
                    options={employeeNumber}
                    className=""
                    defaultOption={data?.data.staff || jp.chooseEmployee}
                  />
                  <Select
                    name="prefecture_id"
                    label="Location"
                    id="location"
                    options={countries}
                    className=""
                    defaultOption={data?.data.prefecture.name || jp.chooseLocation}
                  />
                  <DatePicker
                    name="starting"
                    type="text"
                    label={jp.establishment}
                    className="mt-1 block w-ful"
                    value={data?.data.starting}
                  />
                  <div></div>
                  <span className="col-span-2">
                    <Input
                      name="company_des"
                      type="text"
                      label={jp.companyDescription}
                      className="mt-1 block w-full bg-gray-100 "
                      placeholder="100000 $"
                      value={data?.data.company_des}
                    />
                  </span>
                </div>

                <div className="flex justify-between w-full px-10 mr-10">
                  <button
                    className="underline font-medium"
                    onClick={() => setIsEdit(false)}
                  >
                    Back
                  </button>
                  <Button
                    variant="destructive"
                    className="font-medium w-44"
                    onClick={() => {}}
                  >
                    Finish
                  </Button>
                </div>
              </form>
            </motion.div>
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

const formVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};
export default Profile;
