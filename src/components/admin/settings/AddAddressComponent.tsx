import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import { CityWardTownDataTypes } from "@/screens/admin/settings/MasterSettingsScreen";
import InputBoxComponent from "@/components/InputBoxComponent";
import { MutationType } from "@/networks/mutations";

interface ProductSearchProps {
  openSearchDialog: boolean;
  postCodeErr: string;
  townshipErr: string;
  prefectureErr: string;
  addressErr: string;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  onAdd: () => void;
  closeAddressMasterCreateAction: () => void;
  cityWardTownData: CityWardTownDataTypes;
  setCityWardTownData: Dispatch<SetStateAction<CityWardTownDataTypes>>;
  mutations: MutationType;
}

const AddAddressComponent = ({
  openSearchDialog,
  postCodeErr,
  townshipErr,
  prefectureErr,
  addressErr,
  setOpenSearchDialog,
  onAdd,
  closeAddressMasterCreateAction,
  cityWardTownData,
  setCityWardTownData,
  mutations,
}: ProductSearchProps) => {
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
            住所マスタ追加
          </div>
          <div
            onClick={closeAddressMasterCreateAction}
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
            error={postCodeErr}
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
                  {prefectureErr}
                </div>
              </>
            )}
            // renderInput={(params) => 
            // <TextField {...params} label="北海道" />}
          />

          <SizeBox h={20} />

          <InputBoxComponent
            value={cityWardTownData.name}
            label="区・市・町・村名"
            error={townshipErr}
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
            error={addressErr}
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
          <Button onClick={onAdd} variant="contained">
            追加
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(AddAddressComponent);
