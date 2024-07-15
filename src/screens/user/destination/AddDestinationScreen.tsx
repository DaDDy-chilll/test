import InputBoxComponent from "@/components/InputBoxComponent";
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
import { useNavigate } from "react-router-dom";

const AddDestinationScreen = ({ mutations }: GlobalProps) => {

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressList[]>([]);
  const [family_name, setFamilyName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [post_code, setPostCode] = useState<string>("");
  const [address_name, setAddressName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [main_address, setMainAddress] = useState<number>(-1);

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

  type ValidationErrors = {
    family_name?: string;
    name?: string;
    post_code?: string;
    prefecture_id?: string;
    city_ward_town_id?: string;
    address_name?: string;
    phone?: string;
  }

  const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);

  const [prefectureData, setPrefectureData] = useState<Array<AutoCompleteData>>([]);

  const [cityWardTownData, setCityWardTownData] = useState<Array<AutoCompleteData>>([]);

  const [prefectureId, setPrefectureId] = useState<AutoCompleteData | undefined>();

  const [prefecture_id, setPrefectureIdValue] = useState<number | undefined>();

  const [cityWardTownId, setCityWardTownId] = useState<AutoCompleteData | undefined>();

  const [city_ward_town_id, setCityWardTownIdValue] = useState<number | undefined>();

  const [errors, setErrors] = useState<ValidationErrors>({});

  const status = 1;

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

  const createDeliveryAddress = () => {
    mutations.user.deliveryAddress.create({family_name, name, post_code, prefecture_id, city_ward_town_id, address_name, phone, main_address, status})
    .then((ans) => {
      if (ans.data) {
        redirect({route : "/destination"});
      }
    })
    .catch((err: any) => {
      setErrors(err.response.data.errors);
      console.log(err);
    });
  }

  return (
    <UserLayout>
      <div className="container mx-auto">
        <SubNavbarComponent text="配達先登録" subNavItems={subNavItems} />
        <SizeBox h={20} />

        <div className="flex space-x-8">
          <div className="w-7/12 space-y-6">
            <div className="flex space-x-8">
              <InputBoxComponent
                value={family_name}
                label="姓"
                onChange={(e) => {
                  setFamilyName(e.target.value);
                }}
                multiline={2}
                backgroundColor="#FFFFFF"
                error={errors.family_name ? errors.family_name : ""}
              />
              <InputBoxComponent
                value={name}
                label="名"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                multiline={2}
                backgroundColor="#FFFFFF"
                error={errors.name ? errors.name : ""}
              />
            </div>

            <div className="flex space-x-8">
              <InputBoxComponent
                value={post_code}
                label="郵便番号"
                onChange={(e) => {
                  setPostCode(e.target.value);
                }}
                multiline={2}
                backgroundColor="#FFFFFF"
                error={errors.post_code ? errors.post_code : ""}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={prefectureId}
                options={prefectureData}
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="都道府県" multiline rows={2} />
                    <div className="text-red-600 text-xs p-2 pl-4">
                      {errors.prefecture_id ? errors.prefecture_id : ""}
                    </div>
                  </>
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
                className={`flex-1 bg-white h-20 ${errors.prefecture_id ? "mb-6" : ""}`}
              />
            </div>
            <div className="flex space-x-8">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cityWardTownData}
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="市区町村" multiline rows={2} />
                    <div className="text-red-600 text-xs p-2 pl-4">
                      {errors.city_ward_town_id ? errors.city_ward_town_id : ""}
                    </div>
                  </>
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
                className={`flex-1 bg-white h-20 ${errors.city_ward_town_id ? "mb-6" : ""}`}
              />
            </div>
            <div className="flex space-x-8">
              <InputBoxComponent
                value={address_name}
                label="建物名、部屋番号など"
                onChange={(e) => { setAddressName(e.target.value); }}
                multiline={2}
                backgroundColor="#FFFFFF"
                error={errors.address_name ? errors.address_name : ""}
              />
            </div>

            <div className="flex space-x-8">
              <InputBoxComponent
                value={phone}
                label="電話番号"
                onChange={(e) => { setPhone(e.target.value); }}
                multiline={2}
                backgroundColor="#FFFFFF"
                error={errors.phone ? errors.phone : ""}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="default"
                value={main_address}
                onChange={(e) => { e.target.checked == true ? setMainAddress(1) : setMainAddress(-1) }}
                crossOrigin={1}
                className="bg-white checked:bg-[#08C856] checked:border-[#08C856]"
              />
              <p className="text-sm"><label htmlFor="default" style={{cursor:"pointer"}}>デフォルトに設定</label></p>
            </div>

            <Button onClick={() => {createDeliveryAddress();}} variant="contained" className="w-full">
            登録
          </Button>
          </div>
          <div className="w-5/12 space-y-6 pt-4">
            <p className="text-sm">登録されてる配達先リスト</p>
            {
              deliveryAddress.map((delivery_address: DeliveryAddressList) => {
                return(
                  <div key={delivery_address.address_id} className="px-8 py-6 rounded-md bg-white text-sm relative space-y-2 border-black border-[1px] border-opacity-20">
                    <p className="font-semibold text-base">{delivery_address.name}</p>
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
    </UserLayout>
  );
};
export default AddDestinationScreen;
