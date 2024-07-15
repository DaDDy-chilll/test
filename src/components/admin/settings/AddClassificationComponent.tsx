import DialogBox from "@/components/DialogBox";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, memo, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { MutationType } from "@/networks/mutations";
import { ClassificationDataTypes } from "@/screens/admin/settings/MasterSettingsScreen";
import InputBoxComponent from "@/components/InputBoxComponent";

interface ProductSearchProps {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
  classificationsNameErr: string | undefined;
  classificationDataErr: string | undefined;
  onAdd: () => void;
  closeAction: () => void;
  classificationData: ClassificationDataTypes;
  setClassificationData: Dispatch<SetStateAction<ClassificationDataTypes>>;
  mutations: MutationType;
}

const AddClassificationComponent = ({
  openSearchDialog,
  setOpenSearchDialog,
  onAdd,
  closeAction,
  classificationData,
  classificationsNameErr,
  classificationDataErr,
  setClassificationData,
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
          console.log(ans);

          if (ans.data) {
            for (let index = 0; index < ans.data?.length; index++) {
              if (ans.data[index].master_id > 3) {
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
            区分マスタ追加
          </div>
          <div
            onClick={closeAction}
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
                setClassificationData((prevClassificationData) => ({
                  ...prevClassificationData,
                  masterId: value.value,
                }));
            }}
            options={masterData}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  label="種類"
                  className=" bg-bgcolor"
                />
                <div className="text-red-600 text-xs p-2 pl-4">
                  {classificationDataErr}
                </div>
              </>
            )}
          />

          <SizeBox h={20} />

          <InputBoxComponent
            value={classificationData.name}
            label="区分名"
            error={classificationsNameErr}
            onChange={(e) =>
              setClassificationData((prevClassificationData) => ({
                ...prevClassificationData,
                name: e.target.value,
              }))
            }
          />

          <SizeBox h={20} />

          <InputBoxComponent
            value={classificationData.value}
            label="区分値"
            onChange={(e) =>
              setClassificationData((prevClassificationData) => ({
                ...prevClassificationData,
                value: e.target.value,
              }))
            }
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

export default memo(AddClassificationComponent);
