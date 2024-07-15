import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, memo } from "react";
import { ToFilterClassificationDataTypes } from "@/screens/admin/settings/MasterSettingsScreen";
import { MutationType } from "@/networks/mutations";
import InputBoxComponent from "@/components/InputBoxComponent";

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  onSearch: () => void;
  toFilteredClassificationData: ToFilterClassificationDataTypes;
  setToFilteredClassificationData: Dispatch<
    SetStateAction<ToFilterClassificationDataTypes>
  >;
  mutations: MutationType;
}

const ClassificationSearchComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  onSearch,
  toFilteredClassificationData,
  setToFilteredClassificationData,
  mutations,
}: ProductSearchProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };

  // Data
  const [masterData, setMasterData] = useState<Array<AutoCompleteData>>([]);

  useEffect(() => {
    const tempArray: Array<AutoCompleteData> = [];

    if (openSearchDialog) {
      mutations.admin.master
        .get()
        .then((ans) => {
          if (ans.data) {
            for (let index = 0; index < ans.data?.length; index++) {
              if(ans.data[index].master_id > 3) {
                tempArray.push({
                  label: ans.data[index].master_name,
                  value: ans.data[index].master_id,
                });
              }
            }
            setMasterData(tempArray);
          }
        })
        .catch((err) => {
          console.log(err);
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
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(_, value) => {
              value &&
                setToFilteredClassificationData(
                  (prevToFilteredClassificationData) => ({
                    ...prevToFilteredClassificationData,
                    masterIdToFilter: value.value.toString(),
                  })
                );
            }}
            options={masterData}
            renderInput={(params) => <TextField {...params} label="種類" />}
          />

          <SizeBox h={20} />

          <InputBoxComponent
            value={toFilteredClassificationData.classificationNameToFilter}
            label="区分名"
            onChange={(e) =>
              setToFilteredClassificationData(
                (prevToFilteredClassificationData) => ({
                  ...prevToFilteredClassificationData,
                  classificationNameToFilter: e.target.value,
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

export default memo(ClassificationSearchComponent);
