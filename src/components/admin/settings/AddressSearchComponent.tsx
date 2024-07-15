import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import { ToFilterCityWardTownDataTypes } from "@/screens/admin/settings/MasterSettingsScreen";
import { MutationType } from "@/networks/mutations";
import InputBoxComponent from "@/components/InputBoxComponent";

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  toFilteredCityWardTownData: ToFilterCityWardTownDataTypes;
  setToFilteredCityWardTownData: Dispatch<
    SetStateAction<ToFilterCityWardTownDataTypes>
  >;
  onSearch: () => void;
  mutations: MutationType;
}

const AddressSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  onSearch,
  toFilteredCityWardTownData,
  setToFilteredCityWardTownData,
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
            検索
          </div>
          <div
            onClick={() => setOpenSearchDialog(false)}
            className="absolute right-[15px] btn"
          >
            <CloseIcon />
          </div>
        </div>
        <Divider />
        <div className="px-[50px] py-[20px] flex flex-col">
          <InputBoxComponent
            value={toFilteredCityWardTownData.codeToFilter}
            label="郵便番号"
            onChange={(e) =>
              setToFilteredCityWardTownData(
                (prevToFilteredCityWardTownData) => ({
                  ...prevToFilteredCityWardTownData,
                  codeToFilter: e.target.value,
                })
              )
            }
          />
          <SizeBox h={20} />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(_, value) => {
              value &&
                setToFilteredCityWardTownData(
                  (prevToFilteredCityWardTownData) => ({
                    ...prevToFilteredCityWardTownData,
                    prefectureIdToFilter: value.value.toString(),
                  })
                );
            }}
            options={prefectureData}
            renderInput={(params) => <TextField {...params} label="北海道" />}
          />

          <SizeBox h={20} />

          <InputBoxComponent
            value={toFilteredCityWardTownData.cityNameToFilter}
            label="区・市・町・村名"
            onChange={(e) =>
              setToFilteredCityWardTownData(
                (prevToFilteredCityWardTownData) => ({
                  ...prevToFilteredCityWardTownData,
                  cityNameToFilter: e.target.value,
                })
              )
            }
          />

          <SizeBox h={28} />
          {/* Button */}
          <Button onClick={onSearch} variant="contained">
            検索
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(AddressSearchComponent);
