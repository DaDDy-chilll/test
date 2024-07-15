import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useState } from "react";
import { GlobalProps } from "@/App";
import MasterSettingsToggleComponent from "@/components/admin/settings/MasterSettingsToggleComponent";
import ClassificationMenu from "@/components/admin/settings/ClassificationMenu";
import ClassificationSearchComponent from "@/components/admin/settings/ClassificationSearchComponent";
import AddClassificationComponent from "@/components/admin/settings/AddClassificationComponent";
import EditClassificationComponent from "@/components/admin/settings/EditClassificationComponent";
import AddressMenu from "@/components/admin/settings/AddressMenu";
import AddressSearchComponent from "@/components/admin/settings/AddressSearchComponent";
import AddAddressComponent from "@/components/admin/settings/AddAddressComponent";
import EditAddressComponent from "@/components/admin/settings/EditAddressComponent";
import AddressTableComponent from "@/components/admin/settings/AddressTableComponent";
import ConfirmComponent from "@/components/admin/settings/ConfirmComponent";
import { CityWardTown } from "@/types/citywardtown/CityWardTown";
import { MasterDetail } from "@/types/master_detail/master_detail";
import ClassificationTableComponent from "@/components/admin/settings/ClassificationTableComponent";
import PointTableComponent from "@/components/admin/settings/PointTableComponent";
import DeliveryTableComponent from "@/components/admin/settings/DeliveryTableComponent";
import { MasterDetailCreateErrRes } from "@/networks/mutations/admin/master_detail/create";
import { MasterDetailUpdateErrRes } from "@/networks/mutations/admin/master_detail/update";
import { cwdCreateErrRes } from "@/networks/mutations/admin/city_ward_town/create";
import { UpdateCwdErrRes } from "@/networks/mutations/admin/city_ward_town/update";

export type ClassificationDataTypes = {
  masterId: number;
  name: string;
  value: string;
};

export type ToFilterClassificationDataTypes = {
  masterIdToFilter: string;
  classificationNameToFilter: string;
};

export type CityWardTownDataTypes = {
  prefectureId: number;
  code: string;
  name: string;
  address: string;
};

export type ToFilterCityWardTownDataTypes = {
  codeToFilter: string;
  cityNameToFilter: string;
  prefectureIdToFilter: string;
};

const MasterSettingsScreen = ({ mutations, setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "マスタデータ設定",
      action: () => { },
    },
  ];

  const [openSearchClassificationDialog, setOpenSearchClassificationDialog] =
    useState(false);
  const [openAddClassificationDialog, setOpenAddClassificationDialog] =
    useState(false);
  const [openEditClassificationDialog, setOpenEditClassificationDialog] =
    useState(false);

  const [openSearchAddressDialog, setOpenSearchAddressDialog] = useState(false);
  const [openAddAddressDialog, setOpenAddAddressDialog] = useState(false);
  const [openEditAddressDialog, setOpenEditAddressDialog] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const [switchToggle, setSwitchToggle] = useState<number>(1);

  // Variables for Classifications
  const [classifications, setClassifications] = useState<Array<MasterDetail>>(
    []
  );
  const [classificationId, setClassificationId] = useState<number>();
  const [updateClassificationId, setUpdateClassificationId] =
    useState<number>();

  const [classificationData, setClassificationData] =
    useState<ClassificationDataTypes>({
      masterId: 0,
      name: "",
      value: "",
    });

  const [toFilteredClassificationData, setToFilteredClassificationData] =
    useState<ToFilterClassificationDataTypes>({
      masterIdToFilter: "",
      classificationNameToFilter: "",
    });

  const [toEditClassificationData, setToEditClassificationData] =
    useState<ClassificationDataTypes>({
      masterId: 0,
      name: "",
      value: "",
    });

  // Variables for City Ward Town
  const [cityWardTown, setCityWardTown] = useState<Array<CityWardTown>>([]);
  const [cityWardTownId, setCityWardTownId] = useState<number>();
  const [updateCityWardTownId, setUpdateCityWardTownId] = useState<number>();

  const [cityWardTownData, setCityWardTownData] =
    useState<CityWardTownDataTypes>({
      prefectureId: 0,
      code: "",
      name: "",
      address: "",
    });

  const [toFilteredCityWardTownData, setToFilteredCityWardTownData] =
    useState<ToFilterCityWardTownDataTypes>({
      codeToFilter: "",
      cityNameToFilter: "",
      prefectureIdToFilter: "",
    });

  const [toEditCityWardTownData, setToEditCityWardTownData] =
    useState<CityWardTownDataTypes>({
      prefectureId: 0,
      code: "",
      name: "",
      address: "",
    });

  // Variables for Point Values
  const [pointValueToYen, setPointValueToYen] =
    useState<ClassificationDataTypes>({
      masterId: 1,
      name: "",
      value: "",
    });

  const [pointValueFromYen, setPointValueFromYen] =
    useState<ClassificationDataTypes>({
      masterId: 2,
      name: "",
      value: "",
    });

  const [deliveryValue, setDeliveryValue] = useState<ClassificationDataTypes>({
    masterId: 3,
    name: "",
    value: "",
  });

  //error message for 区分マスタ追加
  const [classificationsNameErr, setClassificationsNameErr] = useState<string | undefined>("");
  const [classificationDataErr, setClassificationDataErr] = useState<string | undefined>("");

  //error message for 区分マスタ変更
  const [classificationsNameEditErr, setClassificationsNameEditErr] = useState<string | undefined>("");
  const [classificationDataEditErr, setClassificationDataEditErr] = useState<string | undefined>("");

  //error message for 住所マスタ
  const [addressErr, setAddressErr] = useState<string>("");
  const [postCodeErr, setPostCodeErr] = useState<string>("");
  const [townshipErr, setTownshipErr] = useState<string>("");
  const [prefectureErr, setPrefectureErr] = useState<string>("");

  //error message for 住所マスタ変更
  const [addressEditErr, setAddressEditErr] = useState<string>("");
  const [postCodeEditErr, setPostCodeEditErr] = useState<string>("");
  const [townshipEditErr, setTownshipEditErr] = useState<string>("");
  const [prefectureEditErr, setPrefectureEditErr] = useState<string>("");

  const cleanUpAllStates = () => {
    setClassificationData((prevClassificationData) => ({
      ...prevClassificationData,
      masterId: 0,
      name: "",
      value: "",
    }));

    setToFilteredClassificationData((prevToFilteredClassificationData) => ({
      ...prevToFilteredClassificationData,
      masterIdToFilter: "",
      classificationNameToFilter: "",
    }));

    setToEditClassificationData((prevToEditClassificationData) => ({
      ...prevToEditClassificationData,
      masterId: 0,
      name: "",
      value: "",
    }));

    setCityWardTownData((prevCityWardTownData) => ({
      ...prevCityWardTownData,
      prefectureId: 0,
      code: "",
      name: "",
      address: "",
    }));

    setToFilteredCityWardTownData((prevToFilteredCityWardTownData) => ({
      ...prevToFilteredCityWardTownData,
      codeToFilter: "",
      cityNameToFilter: "",
      prefectureIdToFilter: "",
    }));

    setToEditCityWardTownData((prevToEditCityWardTownData) => ({
      ...prevToEditCityWardTownData,
      prefectureId: 0,
      code: "",
      name: "",
      address: "",
    }));
  };

  //set null value when close dialog
  const closeAction = () => {
    setOpenAddClassificationDialog(false);
    setOpenEditClassificationDialog(false);
    setClassificationsNameErr("");
    setClassificationDataErr("");
    cleanUpAllStates();
    setClassificationsNameEditErr("");
    setClassificationDataEditErr("");
  }

  //close Address Master Create dialog
  const closeAddressMasterCreateAction = () => {
    setOpenAddAddressDialog(false);
    cleanUpAllStates();
    setAddressErr("");
    setPostCodeErr("");
    setTownshipErr("");
    setPrefectureErr("");
  }

  //close Address Master Edit dialog
  const closeAddressMasterEditAction = () => {
    setOpenEditAddressDialog(false);
    cleanUpAllStates();
    setAddressEditErr("");
    setPostCodeEditErr("");
    setTownshipEditErr("");
    setPrefectureEditErr("");
  }

  // Classification Actions
  const createClassifications = () => {
    const body = {
      master_id: classificationData.masterId,
      name: classificationData.name,
      value: +classificationData.value,
    };
    mutations.admin.masterDetail
      .create(body)
      .then((ans) => {
        if (ans) {
          getClassifications();
          setOpenAddClassificationDialog(false);
          setClassificationsNameErr("");
          setClassificationDataErr("");
          cleanUpAllStates();
        }
      })
      .catch((err: MasterDetailCreateErrRes) => {
        if (body.name == null || body.name == "") {
          setClassificationsNameErr("区分名を入力してください。");
        } 
        else if(err.status == "CONFLICT") {
          setClassificationsNameErr("区分名がすでに存在しています。");
        }
         else {
          setClassificationsNameErr("");
        }
        if (body.master_id == 0) {
          setClassificationDataErr("種類を入力してください。");
        } else {
          setClassificationDataErr("");
        }
      });
  };

  const getClassifications = () => {
    mutations.admin.masterDetail
      .get({
        master_id: +toFilteredClassificationData.masterIdToFilter,
        name: toFilteredClassificationData.classificationNameToFilter,
      })
      .then((ans) => {
        if (ans.data) {
          console.log(ans.data);

          if (ans.data.length > 0) {
            const transformedData: MasterDetail[] = ans.data
              ?.filter((d) => d.master_detail_id > 3)
              ?.map((classification, index) => ({
                index: index + 1,
                master_detail_id: classification.master_detail_id,
                master_id: classification.master_id,
                name: classification.name,
                value: classification.value,
                master_name: classification.master_name,
              }));
            setClassifications(transformedData);

            const pointValueToYenData = ans.data?.filter(
              (t) => t.master_id === 1
            )[0];
            const pointValueFromYenData = ans.data?.filter(
              (t) => t.master_id === 2
            )[0];
            const deliveryValueData = ans.data?.filter(
              (t) => t.master_id === 3
            )[0];

            pointValueToYenData &&
              setPointValueToYen((prevPointValueToYen) => ({
                ...prevPointValueToYen,
                name: pointValueToYenData.name,
                value: pointValueToYenData.value.toString(),
              }));

            pointValueFromYenData &&
              setPointValueFromYen((prevPointValueFromYen) => ({
                ...prevPointValueFromYen,
                name: pointValueFromYenData.name,
                value: pointValueFromYenData.value.toString(),
              }));

            deliveryValueData &&
              setDeliveryValue((prevDeliveryValue) => ({
                ...prevDeliveryValue,
                name: deliveryValueData.name,
                value: deliveryValueData.value.toString(),
              }));
          } else {
            setClassifications([]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateClassifications = () => {
    const body = {
      master_id: +toEditClassificationData.masterId,
      name: toEditClassificationData.name,
      value: +toEditClassificationData.value,
    };

    if (updateClassificationId) {
      mutations.admin.masterDetail
        .update({ master_detail_id: updateClassificationId }, body)
        .then((ans) => {
          if (ans) {
            console.log(ans);
            setOpenEditClassificationDialog(false);
            cleanUpAllStates();
            setClassificationsNameEditErr("");
            setClassificationDataEditErr("");
            getClassifications();
          }
        })
        .catch((err:MasterDetailUpdateErrRes) => {
          console.log(err);
          if (body.name == null || body.name == "") {
            setClassificationsNameEditErr("区分名を入力してください。");
          } 
          else if(err.status == "CONFLICT") {
            setClassificationsNameEditErr("区分名がすでに存在しています。");
          }
           else {
            setClassificationsNameEditErr("");
          }
          if (body.master_id == 0) {
            setClassificationDataEditErr("種類を入力してください。");
          } else {
            setClassificationDataEditErr("");
          }
        });
    }
  };

  const deleteClassificationsById = () => {
    if (classificationId) {
      mutations.admin.masterDetail
        .delete({ master_detail_id: classificationId })
        .then((ans) => {
          if (ans) {
            console.log(ans);
            getClassifications();
            setClassificationId(undefined);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editingClassification = (id: number) => {
    const filteredClassifications = classifications.filter(
      (c) => c.master_detail_id === id
    );
    setUpdateClassificationId(id);

    setToEditClassificationData((prevToEditClassificationData) => ({
      ...prevToEditClassificationData,
      masterId: filteredClassifications[0].master_id,
      name: filteredClassifications[0].name,
      value: filteredClassifications[0].value.toString(),
    }));
  };

  // City Ward Town Actions
  const createCityWardTown = () => {
    const body = {
      prefecture_id: cityWardTownData.prefectureId,
      code: cityWardTownData.code,
      name: cityWardTownData.name,
      address: cityWardTownData.address,
    };
    mutations.admin.citywardtown
      .create({ cwdPayload: body })
      .then((ans) => {
        if (ans) {
          console.log(ans);
          getCityWardTown();
          setOpenAddAddressDialog(false);
          cleanUpAllStates();
          setAddressErr("");
          setPostCodeErr("");
          setTownshipErr("");
          setPrefectureErr("");
        }
      })
      .catch((err : cwdCreateErrRes) => {
        console.log(err);
        if (body.code == null || body.code == "") {
          setPostCodeErr("郵便番号を入力してください。");
        }else if(body.code.length !== 8){
          setPostCodeErr("郵便番号は1 ～ 8 文字以下の値を入力してください。");
        } else {
          setPostCodeErr("");
        }
        if (body.name == null || body.name == ""){
          setTownshipErr("区・市・町・村名を入力してください。");
        } else {
          setTownshipErr("");
        }
        console.log(cityWardTownData.prefectureId)
        if (body.prefecture_id == 0) {
          setPrefectureErr("都道県を入力してください。");
        } else {
          setPrefectureErr("");
        }
        if (body.address == null || body.address == "") {
          setAddressErr("住所を入力してください。");
        } else {
          setAddressErr("");
        }
      });
  };

  const getCityWardTown = () => {
    mutations.admin.citywardtown
      .get(
        toFilteredCityWardTownData.codeToFilter,
        toFilteredCityWardTownData.prefectureIdToFilter,
        toFilteredCityWardTownData.cityNameToFilter
      )
      .then((ans) => {
        if (ans.data) {
          console.log(ans.data)
          if (ans.data.length > 0) {
            const transformedData: CityWardTown[] = ans.data?.map(
              (cityWardTown, index) => ({
                index: index + 1,
                city_ward_town_id: cityWardTown.city_ward_town_id,
                name: cityWardTown.name,
                prefecture_id: cityWardTown.prefecture_id,
                code: cityWardTown.code,
                prefecture_name: cityWardTown.prefecture_name,
                address: cityWardTown.address,
              })
            );
            setCityWardTown(transformedData);
          } else {
            setCityWardTown([]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCityWardTown = () => {
    const body = {
      prefecture_id: toEditCityWardTownData.prefectureId,
      code: toEditCityWardTownData.code,
      name: toEditCityWardTownData.name,
      address: toEditCityWardTownData.address,
    };

    if (updateCityWardTownId) {
      mutations.admin.citywardtown
        .update({ city_ward_town_id: updateCityWardTownId, cwdPayload: body })
        .then((ans) => {
          if (ans) {
            console.log(ans);
            getCityWardTown();
            setOpenEditAddressDialog(false);
            setAddressEditErr("");
            setPostCodeEditErr("");
            setTownshipEditErr("");
            setPrefectureEditErr("");
          }
        })
        .catch((err : UpdateCwdErrRes) => {
          console.log(err);
          if (body.code == null || body.code == "") {
            setPostCodeEditErr("郵便番号を入力してください。");
          }else if(body.code.length !== 8){
            setPostCodeEditErr("郵便番号は1 ～ 8 文字以下の値を入力してください。");
          } else {
            setPostCodeEditErr("");
          }
          if (body.name == null || body.name == ""){
            setTownshipEditErr("区・市・町・村名を入力してください。");
          } else {
            setTownshipEditErr("");
          }
          console.log(cityWardTownData.prefectureId)
          if (body.prefecture_id == 0) {
            setPrefectureEditErr("都道県を入力してください。");
          } else {
            setPrefectureEditErr("");
          }
          if (body.address == null || body.address == "") {
            setAddressEditErr("住所を入力してください。");
          } else {
            setAddressEditErr("");
          }
        });
    }
  };

  const deleteCityWardTownById = () => {
    if (cityWardTownId) {
      mutations.admin.citywardtown
        .deleteCwdById({ city_ward_town_id: cityWardTownId })
        .then(() => {
          getCityWardTown();
          setCityWardTownId(undefined);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editingCityWardTown = (id: number) => {

    const filteredCityWardTown = cityWardTown.filter(
      (c) => c.city_ward_town_id === id
    );
    setUpdateCityWardTownId(id);

    setToEditCityWardTownData((prevToEditCityWardTownData) => ({
      ...prevToEditCityWardTownData,
      prefectureId: filteredCityWardTown[0].prefecture_id,
      code: filteredCityWardTown[0].code,
      name: filteredCityWardTown[0].name || "",
      address: filteredCityWardTown[0].address,
    }));

  };

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={80} />

      <MasterSettingsToggleComponent
        toggle={switchToggle}
        setToggle={setSwitchToggle}
      />

      <SizeBox h={20} />

      {switchToggle === 1 && (
        <ClassificationMenu
          title="区分マスタ設定"
          openDialog={setOpenSearchClassificationDialog}
          openAddDialog={setOpenAddClassificationDialog}
        />
      )}

      {switchToggle === 2 && (
        <AddressMenu
          title="住所マスタ設定"
          openDialog={setOpenSearchAddressDialog}
          openAddDialog={setOpenAddAddressDialog}
        />
      )}

      <SizeBox h={10} />

      {switchToggle === 1 && (
        <ClassificationTableComponent
          classifications={classifications}
          getClassifications={getClassifications}
          setClassificationId={setClassificationId}
          setOpenConfirmDialog={setOpenConfirmDialog}
          setOpenEditClassificationDialog={setOpenEditClassificationDialog}
          editingClassification={editingClassification}
        />
      )}

      {switchToggle === 2 && (
        <AddressTableComponent
          cityWardTown={cityWardTown}
          getCityWardTown={getCityWardTown}
          setCityWardTownId={setCityWardTownId}
          setOpenConfirmDialog={setOpenConfirmDialog}
          setOpenEditAddressDialog={setOpenEditAddressDialog}
          editingCityWardTown={editingCityWardTown}
        />
      )}

      {switchToggle === 3 && (
        <PointTableComponent
          pointValueFromYen={pointValueFromYen}
          setPointValueFromYen={setPointValueFromYen}
          pointValueToYen={pointValueToYen}
          setPointValueToYen={setPointValueToYen}
          mutations={mutations}
        />
      )}

      {switchToggle === 4 && (
        <DeliveryTableComponent
          deliveryValue={deliveryValue}
          setDeliveryValue={setDeliveryValue}
          mutations={mutations}
        />
      )}

      {/* 検索 */}
      <ClassificationSearchComponent
        openSearchDialog={openSearchClassificationDialog}
        setOpenSearchDialog={setOpenSearchClassificationDialog}
        toFilteredClassificationData={toFilteredClassificationData}
        setToFilteredClassificationData={setToFilteredClassificationData}
        onSearch={() => {
          getClassifications();
          setOpenSearchClassificationDialog(false);
          cleanUpAllStates();
        }}
        mutations={mutations}
      />

      <AddClassificationComponent
        openSearchDialog={openAddClassificationDialog}
        setOpenSearchDialog={setOpenAddClassificationDialog}
        classificationsNameErr={classificationsNameErr}
        classificationDataErr={classificationDataErr}
        closeAction={closeAction}
        onAdd={() => {
          // setOpenAddClassificationDialog(false);
          createClassifications();
          //cleanUpAllStates();
        }}
        classificationData={classificationData}
        setClassificationData={setClassificationData}
        mutations={mutations}
      />

      <EditClassificationComponent
        openSearchDialog={openEditClassificationDialog}
        setOpenSearchDialog={setOpenEditClassificationDialog}
        classificationsNameEditErr={classificationsNameEditErr}
        classificationDataEditErr={classificationDataEditErr}
        closeAction={closeAction}
        onEdit={() => {
         // setOpenEditClassificationDialog(false);
          updateClassifications();
         // cleanUpAllStates();
        }}
        classificationData={toEditClassificationData}
        setClassificationData={setToEditClassificationData}
        mutations={mutations}
      />

      <AddressSearchComponent
        openSearchDialog={openSearchAddressDialog}
        setOpenSearchDialog={setOpenSearchAddressDialog}
        toFilteredCityWardTownData={toFilteredCityWardTownData}
        setToFilteredCityWardTownData={setToFilteredCityWardTownData}
        onSearch={() => {
          getCityWardTown();
          setOpenSearchAddressDialog(false);
          cleanUpAllStates();
        }}
        mutations={mutations}
      />

      <AddAddressComponent
        openSearchDialog={openAddAddressDialog}
        setOpenSearchDialog={setOpenAddAddressDialog}
        postCodeErr={postCodeErr}
        townshipErr={townshipErr}
        prefectureErr={prefectureErr}
        addressErr={addressErr}
        closeAddressMasterCreateAction={closeAddressMasterCreateAction}
        onAdd={() => {
          createCityWardTown();
        }}
        cityWardTownData={cityWardTownData}
        setCityWardTownData={setCityWardTownData}
        mutations={mutations}
      />

      <EditAddressComponent
        openSearchDialog={openEditAddressDialog}
        setOpenSearchDialog={setOpenEditAddressDialog}
        postCodeEditErr={postCodeEditErr}
        townshipEditErr={townshipEditErr}
        prefectureEditErr={prefectureEditErr}
        addressEditErr={addressEditErr}
        closeAddressMasterEditAction={closeAddressMasterEditAction}
        onEdit={() => {
         // setOpenEditAddressDialog(false);
          updateCityWardTown();
         // cleanUpAllStates();
        }}
        cityWardTownData={toEditCityWardTownData}
        setCityWardTownData={setToEditCityWardTownData}
        mutations={mutations}
      />

      <ConfirmComponent
        confirmText="Are you sure?"
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        onConfirm={() => {
          if (cityWardTownId) {
            deleteCityWardTownById();
          }
          if (classificationId) {
            deleteClassificationsById();
          }
          setOpenConfirmDialog(false);
        }}
      />

      <SizeBox h={100} />
    </div>
  );
};

export default MasterSettingsScreen;
