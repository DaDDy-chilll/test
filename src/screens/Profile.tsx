import {
  ProfileDetail,
  Loading,
  ProfileForm,
  ProfileSkeleton,
} from "@/components";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { jp } from "@/lang/jp";
import { setTitle } from "@/store";
import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

import { Helmet } from "react-helmet-async";

const defaultFormData = {
  name: "",
  industry_type_id: { label: "", value: "" },
  budget: "",
  starting: "",
  staff: { label: "", value: "" },
  area: { label: "", value: "" },
  prefecture_id: { label: "", value: "" },
  photo: "",
  company_des: "",
  address: "",
};

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const { data, isLoading } = useFetch({
    endpoint: apiRoutes.PROFILE,
    key: QueryKey.PROFILE,
    token: token as string,
  });

  const { data: jobType, isLoading: isJobTypesLoading } = useFetch({
    endpoint: apiRoutes.JOB_TYPES,
    key: QueryKey.JOB_TYPES,
    token: token as string,
  });

  const { data: city, isLoading: isCityLoading } = useFetch({
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

  const employeeNumber = [
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
  ];

  const transformAreaData = useCallback((data: any) => {
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
  }, []);
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

  const editHandler = () => setIsEdit(true);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.data.name,
        industry_type_id: {
          label: data.data.industry_type.name,
          value: data.data.industry_type.id,
        },
        budget: data.data.budget,
        starting: data.data.starting,
        staff: { label: data.data.staff, value: data.data.staff },
        area: {
          label: data.data.prefecture.area_id,
          value: data.data.prefecture.area_id,
        },
        prefecture_id: {
          label: data.data.prefecture.name,
          value: data.data.prefecture.id,
        },
        photo: data.data.photo,
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
      {(isJobTypesLoading || isCityLoading) && (
        <Loading
          isLoading={isJobTypesLoading || isCityLoading}
          className="h-[calc(100vh-68px)]"
        />
      )}
      <div className="w-full flex justify-center px-10 pt-5">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            !isEdit &&
            data?.data && (
              <ProfileDetail editHandler={editHandler} data={data?.data} />
            )
          )}
          {isEdit && (
            <ProfileForm
              setIsEdit={setIsEdit}
              data={data?.data}
              jobTypes={jobTypes}
              employeeNumber={employeeNumber}
              countries={areaList}
              formData={formData}
              setFormData={setFormData}
              city={relativeArea}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Profile;
