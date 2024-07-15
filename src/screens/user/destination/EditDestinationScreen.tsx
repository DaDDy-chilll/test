import { GlobalProps } from "@/App";
import UserLayout from "@/layouts/user/UserLayout";
import { subNavItemsProp } from "@/models/dataModel";
import SubNavbarComponent from "@/components/user/navbar/SubNavbarComponent";
import SizeBox from "@/components/SizeBox";
import HomeIcon from "@mui/icons-material/Home";
import Routes from "@/navigations/routes";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Checkbox } from "@material-tailwind/react";
import { DeliveryAddressList } from "@/types/delivery_address/delivery_address_list";
import { useEffect, useState } from "react";
import { Prefecture } from "@/types/prefecture/Prefecture";
import { useLocation, useNavigate } from "react-router-dom";
import InputBoxComponent from "@/components/InputBoxComponent"
import { updateAddressData } from "@/networks/mutations/user/deliveryAddress/update";


const EditDestinationScreen = ({ mutations }: GlobalProps) => {

  const location = useLocation();
  const { editData }: { editData: DeliveryAddressList } = location.state;

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressList[]>([]);

  const [firstname, lastname] = editData.name.split(",");

  const [family_name, setFamilyName] = useState<string>(firstname);
  const [familyNameErr, setFamilyNameErr] = useState<string>("");
  const [name, setName] = useState<string>(lastname);
  const [nameErr, setNameErr] = useState<string>("");
  const [post_code, setPostCode] = useState<string>(editData.post_code);
  const [postCodeErr, setPostCodeErr] = useState<string>("");
  const [address_name, setAddressName] = useState<string>(editData.address_name);
  const [addressNameErr, setAddressNameErr] = useState<string>("");
  const [phone, setPhone] = useState<string>(editData.phone);
  const [phoneErr, setPhoneErr] = useState<string>("");

  const [main_address, setMainAddress] = useState<number>(editData.main_address);

  // const [error, setError] = useState<String>("");


  const subNavItems: Array<subNavItemsProp> = [
    {
      Title: HomeIcon,
      route: Routes.USER.TOP_PAGE,
    },
    {
      Title: "マイページ",
      route: Routes.USER.ACCOUNT,
    },
    {
      Title: "配達先",
      route: Routes.USER.DESTINATION,
    },
    {
      Title: "配達先登録",
      route: null,
    },
  ];

  type AutoCompleteData = {
    label: string;
    value: number;
  };

  const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);

  const [prefectureData, setPrefectureData] = useState<Array<AutoCompleteData>>([]);

  const [cityWardTownData, setCityWardTownData] = useState<Array<AutoCompleteData>>([]);

  const [prefectureId, setPrefectureId] = useState<AutoCompleteData | undefined>({
    label: editData.prefecture.name,
    value: editData.prefecture_id
  });

  const [prefecture_id, setPrefectureIdValue] = useState<number | undefined>(editData.prefecture_id);

  const [cityWardTownId, setCityWardTownId] = useState<AutoCompleteData | undefined>({
    label: editData.city_ward_town.name,
    value: editData.city_ward_town_id
  });

  const [city_ward_town_id, setCityWardTownIdValue] = useState<number | undefined>(editData.city_ward_town_id);

  const navigate = useNavigate();
  const redirect = ({ route, state }: any) => {
    navigate(route, {
      state,
    });
  };

  useEffect(() => {
    getPrefectures();
    getDeliveryAddress();
  }, []);

  const getPrefectures = () => {
    mutations.pub.prefecture
      .get()
      .then((ans) => {
        if (ans.data) {
          setPrefectures(ans.data);
          setPrefectureData(
            ans.data.map(({ prefecture_id: id, name: name }) => ({
              value: id,
              label: name,
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDeliveryAddress = () => {
    mutations.user.deliveryAddress.get({status: 1})
      .then((ans) => {
        if (ans.data) {
          setDeliveryAddress(ans.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAddressData: updateAddressData = {
    family_name: family_name,
    name: name,
    post_code: post_code,
    prefecture_id: prefecture_id,
    city_ward_town_id: city_ward_town_id,
    address_name: address_name,
    phone: phone,
    main_address: main_address,
  };

  const updateBtnAction = () => {
    updateDeliveryAddress(editData.address_id, updateAddressData);
  };

  const updateDeliveryAddress = (address_id: number, updateData: updateAddressData) => {

    setFamilyNameErr("");
    setNameErr("");
    setPostCodeErr("");
    setAddressNameErr("");
    setPhoneErr("");
    // setError("");

    mutations.user.deliveryAddress.update(address_id, updateData)
      .then((ans) => {
        if (ans.data) {
          redirect({ route: "/destination" });
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        // if (err.errors) {
        //   if (err.message) {
        //     setError(err.message);
        //   }
        //   if (err.response.data.errors.family_name) {
        //     setFamilyNameErr(err.response.data.errors.family_name);
        //   }
        //   if (err.response.data.errors.name) {
        //     setNameErr(err.response.data.errors.name);
        //   }
        //   if (err.response.data.errors.post_code) {
        //     setPostCodeErr(err.response.data.errors.post_code);
        //   }
        //   if (err.response.data.errors.address_name) {
        //     setAddressNameErr(err.response.data.errors.address_name);
        //   }
        //   if (err.response.data.errors.phone) {
        //     setPhoneErr(err.response.data.errors.phone);
        //   }
        // }
      });

  }
  return (
    <UserLayout>
      {/* Temp */}
      <div className="container mx-auto">
        <SubNavbarComponent text="配達先登録" subNavItems={subNavItems} />
        <SizeBox h={20} />

        <div className="flex space-x-8">
          <div className="w-7/12 space-y-6">
            <div className="flex space-x-8">
              <InputBoxComponent
                value={family_name}
                onChange={(e) => { setFamilyName(e.target.value); }}
                label="姓"
                className="w-1/2 bg-white"
                multiline = {2}
                backgroundColor="#FFFFFF"
                error={familyNameErr}
              />

              <InputBoxComponent
                value={name}
                onChange={(e) => { setName(e.target.value); }}
                label="名"
                className="w-1/2 bg-white"
                multiline = {2}
                backgroundColor="#FFFFFF"
                error={nameErr}
              />
            </div>

            <div className="flex space-x-8">
              <InputBoxComponent
                value={post_code}
                onChange={(e) => { setPostCode(e.target.value); }}
                label="郵便番号"
                className="w-1/2 bg-white"
                multiline = {2}
                backgroundColor="#FFFFFF"
                error={postCodeErr}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={prefectureId}
                options={prefectureData}
                renderInput={(params) => (
                  <TextField {...params} label="都道府県" multiline rows={2} />
                )}
                onChange={(_, data) => {
                  if (data) {
                    setPrefectureId(data);
                    setPrefectureIdValue(data.value);
                    setCityWardTownId(
                      {
                        value: prefectures.filter((prefecture) => prefecture.prefecture_id == data.value)[0]?.city_ward_town[0].city_ward_town_id,
                        label: prefectures.filter((prefecture) => prefecture.prefecture_id == data.value)[0]?.city_ward_town[0].name + ""
                      }
                    );
                    setCityWardTownIdValue(data.value);
                    setCityWardTownData(
                      (
                        prefectures?.filter(
                          (prefecture) => prefecture.prefecture_id === data.value
                        )[0]?.city_ward_town || []
                      ).map(({ city_ward_town_id: id, name }) => ({
                        value: id,
                        label: name || "",
                      }))
                    );
                  } else {
                    setCityWardTownId(undefined);
                    setPrefectureId(undefined);
                  }
                }}
                className="flex-1 bg-white"
              />
            </div>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cityWardTownData}
              renderInput={(params) => (
                <TextField {...params} label="市区町村" multiline rows={2} />
              )}
              value={cityWardTownId}
              onChange={(_, value) => {
                if (value) {
                  setCityWardTownId(value);
                  setCityWardTownIdValue(value.value);
                } else {
                  setCityWardTownId(undefined);
                  setCityWardTownIdValue(undefined);
                }
              }}
              className="flex-1 bg-white"
            />

            <InputBoxComponent
              value={address_name}
              onChange={(e) => { setAddressName(e.target.value); }}
              label="建物名、部屋番号など"
              className="w-full bg-white"
              multiline ={2}
              backgroundColor="#FFFFFF"
              error={addressNameErr}
            />

            <InputBoxComponent
              value={phone}
              onChange={(e) => { setPhone(e.target.value); }}
              label="電話番号"
              className="w-full bg-white"
              multiline ={2}
              backgroundColor="#FFFFFF"
              error={phoneErr}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                value={main_address}
                onChange={(e) => { e.target.checked == true ? setMainAddress(1) : setMainAddress(-1) }}
                crossOrigin={1}
                checked={main_address == 1 ? true : false}
                className="bg-white checked:bg-[#08C856] checked:border-[#08C856]"
              />
              <p className="text-sm">デフォルトに設定</p>
            </div>

            <Button onClick={() => { updateBtnAction(); }} variant="contained" className="w-full">
              更新
            </Button>
          </div>
          <div className="w-5/12 space-y-6 pt-4">
            <p className="text-sm">登録されてる配達先リスト</p>
            {
              deliveryAddress.map((delivery_address: DeliveryAddressList) => {
                const fullName = delivery_address.name.replace(",", " ");
                return (
                  <div key={delivery_address.address_id} className="px-8 py-6 rounded-md bg-white text-sm relative space-y-2 border-black border-[1px] border-opacity-20">
                    <p className="font-semibold text-base">{fullName}</p>
                    <p className="pt-2">{delivery_address.post_code}</p>
                    <p>{delivery_address.prefecture.name}</p>
                    <p className="pb-2">{delivery_address.city_ward_town.name}{delivery_address.city_ward_town.address}</p>
                    <p>電話：{delivery_address.phone}</p>

                    {delivery_address.main_address == 1 && <div className="px-4 py-2 rounded-md bg-primary absolute top-4 right-4 text-white">
                      <p>Default</p>
                    </div>}
                  </div>
                );
              })
            }
          </div>
        </div>

        <SizeBox h={100} />
      </div>
      {/* Temp */}
    </UserLayout>
  );
};
export default EditDestinationScreen;
