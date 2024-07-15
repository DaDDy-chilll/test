import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, memo, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { CityWardTownDataTypes } from "@/screens/admin/settings/MasterSettingsScreen";
import InputBoxComponent from "@/components/InputBoxComponent";
import { MutationType } from "@/networks/mutations";

interface ProductSearchProps {
  openSearchDialog: boolean;
  postCodeEditErr: string;
  townshipEditErr: string;
  prefectureEditErr: string;
  addressEditErr: string;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  onEdit: () => void;
  closeAddressMasterEditAction: () => void;
  cityWardTownData: CityWardTownDataTypes;
  setCityWardTownData: Dispatch<SetStateAction<CityWardTownDataTypes>>;
  mutations: MutationType;
}

const EditAddressComponent = ({
  openSearchDialog,
  postCodeEditErr,
  townshipEditErr,
  prefectureEditErr,
  addressEditErr,
  closeAddressMasterEditAction,
  setOpenSearchDialog,
  onEdit,
  cityWardTownData,
  setCityWardTownData,
  mutations,
}: ProductSearchProps) => {
  const [selectedAddress, setSelectedAddress] =
    useState<AutoCompleteData | null>(null);

  type AutoCompleteData = {
    label: string;
    value: number;
  };

  // Data
  const [prefectureData, setPrefectureData] = useState<Array<AutoCompleteData>>(
    []
  );

  useEffect(() => {
    const tempArray: Array<AutoCompleteData> = [];

    if (openSearchDialog) {
      mutations.admin.prefecture.getPrefectureLists().then((ans) => {
        if (ans.data) {
          for (let index = 0; index < ans.data?.length; index++) {
            tempArray.push({
              label: ans.data[index].name,
              value: ans.data[index].prefecture_id,
            });
          }
          setPrefectureData(tempArray);
          if (cityWardTownData.prefectureId) {
            const selectedData = tempArray.find(
              (item) => item.value === cityWardTownData.prefectureId
            );
            setSelectedAddress(selectedData || null);
          }
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSearchDialog]);

  return (
    <DialogBox open={openSearchDialog} setOpen={setOpenSearchDialog}>
      <div className="">
        {/* Title */}
        <div className="h-[80px] flex flex-row justify-center items-center relative">
          <div className="text-[#3083FF] text-[20px] text-center font-semibold">
            住所マスタ変更
          </div>
          <div
            onClick={closeAddressMasterEditAction}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[50px] py-[20px] flex flex-col">
          <InputBoxComponent
            value={cityWardTownData.code}
            label="郵便番号"
            error={postCodeEditErr}
            onChange={(e) =>
              setCityWardTownData((prevCityWardTown) => ({
                ...prevCityWardTown,
                code: e.target.value,
              }))
            }
          />
          <SizeBox h={20} />

          <Autocomplete
            disablePortal
            value={selectedAddress}
            id="combo-box-demo"
            onChange={(_, value) => {
              value &&
                setCityWardTownData((prevCityWardTown) => ({
                  ...prevCityWardTown,
                  prefectureId: value.value,
                }));
            }}
            options={prefectureData}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  label="都道県"
                  className=" bg-bgcolor"
                />
                <div className="text-red-600 text-xs p-2 pl-4">
                  {prefectureEditErr}
                </div>
              </>
            )}
            // renderInput={(params) => <TextField {...params} label="北海道" />}
          />

          <SizeBox h={20} />

          <InputBoxComponent
            value={cityWardTownData.name}
            label="区・市・町・村名"
            error={townshipEditErr}
            onChange={(e) =>
              setCityWardTownData((prevCityWardTownData) => ({
                ...prevCityWardTownData,
                name: e.target.value,
              }))
            }
          />

          <SizeBox h={20} />

          <InputBoxComponent
            value={cityWardTownData.address}
            label="住所"
            error={addressEditErr}
            onChange={(e) =>
              setCityWardTownData((prevCityWardTownData) => ({
                ...prevCityWardTownData,
                address: e.target.value,
              }))
            }
            multiline={5}
          />
          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={onEdit} variant="contained">
            変更
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(EditAddressComponent);
