import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Checkbox } from "@material-tailwind/react";
import InputBoxComponent from "@/components/InputBoxComponent";
import { Prefecture } from "@/types/prefecture/Prefecture";

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

interface UserNameDialogProps {
  prefectures: Array<Prefecture>;
  prefectureData: Array<AutoCompleteData>;
  cityWardTownData: Array<AutoCompleteData>;
  setCityWardTownData: Dispatch<SetStateAction<Array<AutoCompleteData>>>;
  familyName: string;
  setFamilyName: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  postCode: string;
  setPostCode: Dispatch<SetStateAction<string>>;
  addressName: string;
  setAddressName: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  mainAddress: number;
  setMainAddress: Dispatch<SetStateAction<number>>;
  setCreateStatus: Dispatch<SetStateAction<boolean>>;
  prefectureId: AutoCompleteData | undefined;
  setPrefectureId: Dispatch<SetStateAction<AutoCompleteData | undefined>>;
  setPrefectureIdValue: Dispatch<SetStateAction<number | undefined>>;
  cityWardTownId: AutoCompleteData | undefined;
  setCityWardTownId: Dispatch<SetStateAction<AutoCompleteData | undefined>>;
  setCityWardTownIdValue: Dispatch<SetStateAction<number | undefined>>;
  errors: ValidationErrors;
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const DeliveryAddressDialogComponent = ({
  prefectures,
  prefectureData,
  cityWardTownData,
  setCityWardTownData,
  familyName,
  setFamilyName,
  name,
  setName,
  postCode,
  setPostCode,
  addressName,
  setAddressName,
  phone,
  setPhone,
  mainAddress,
  setMainAddress,
  setCreateStatus,
  prefectureId,
  setPrefectureId,
  setPrefectureIdValue,
  cityWardTownId,
  setCityWardTownId,
  setCityWardTownIdValue,
  errors,
  openDialog,
  setOpenDialog,
}: UserNameDialogProps) => {
  return (
    <DialogBox size="md" open={openDialog} setOpen={setOpenDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center pr-6 relative">
          <p className="text-black font-semibold">配送先登録</p>
          <div
            onClick={() => setOpenDialog(false)}
            className="absolute top-6 right-6 btn"
          >
            <CloseIcon className="text-black" />
          </div>
        </div>

          <div className="space-y-6 px-6 pb-6">
            <div className="flex space-x-8">
              <InputBoxComponent
                value={familyName}
                label="姓"
                onChange={(e) => {
                  setFamilyName(e.target.value);
                }}
                backgroundColor="#FFFFFF"
                error={errors.family_name ? errors.family_name : ""}
              />
              <InputBoxComponent
                value={name}
                label="名"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                backgroundColor="#FFFFFF"
                error={errors.name ? errors.name : ""}
              />
            </div>

            <div className="flex space-x-8">
              <InputBoxComponent
                value={postCode}
                label="郵便番号"
                onChange={(e) => {
                  setPostCode(e.target.value);
                }}
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
                    <TextField {...params} label="都道府県" />
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
                className={`flex-1 bg-white h-10 ${errors.prefecture_id ? "mb-6" : ""}`}
              />
            </div>

            <div className="flex space-x-8">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cityWardTownData}
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="市区町村" />
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
                className={`flex-1 bg-white h-10 ${errors.city_ward_town_id ? "mb-8" : "mb-4"}`}
              />
            </div>

            <div className="flex space-x-8">
              <InputBoxComponent
                value={addressName}
                label="建物名、部屋番号など"
                onChange={(e) => { setAddressName(e.target.value); }}
                backgroundColor="#FFFFFF"
                error={errors.address_name ? errors.address_name : ""}
              />
            </div>

            <div className="flex space-x-8">
              <InputBoxComponent
                value={phone}
                label="電話番号"
                onChange={(e) => { setPhone(e.target.value); }}
                backgroundColor="#FFFFFF"
                error={errors.phone ? errors.phone : ""}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="default"
                value={mainAddress}
                onChange={(e) => { e.target.checked == true ? setMainAddress(1) : setMainAddress(-1) }}
                crossOrigin={1}
                className="bg-white checked:bg-[#08C856] checked:border-[#08C856]"
              />
              <p className="text-sm"><label htmlFor="default" style={{cursor:"pointer"}}>デフォルトに設定</label></p>
            </div>
            <Button onClick={() => {setCreateStatus(true);}} variant="contained" className="w-full">
              登録
            </Button>
          </div>
      </div>
    </DialogBox>
  );
};

export default memo(DeliveryAddressDialogComponent);
