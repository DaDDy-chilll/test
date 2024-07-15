import DialogBox from "@/components/DialogBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import Helper from "@/helpers";
import SizeBox from "@/components/SizeBox";
import mutations from "@/networks/mutations";
import aws from "@/aws";
import InputBoxComponent from "@/components/InputBoxComponent";


interface CustomerInfoDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  qty: number | undefined;
  setQty: Dispatch<SetStateAction<number | undefined>>;
  subKikan : number;
  setSubKikan: Dispatch<SetStateAction<number>>;
  scheduleDeliDate: string | undefined;
  setScheduleDeliDate :  Dispatch<SetStateAction<string | undefined>>;
  min: number;
  max: number;
  img_url: string;
  product_name:string;
  total:number;
  updateAction: () => void;
  onClose: ()=>void;
  scheduleDeliDateErr:string | undefined;
}

const ChangeOrderInfoDialogComponent = ({
  openDialog,
  setOpenDialog,
  qty,
  setQty,
  subKikan,
  setSubKikan,
  scheduleDeliDate,
  setScheduleDeliDate,
  min,
  max,
  img_url,
  product_name,
  total,
  updateAction,
  onClose,
  scheduleDeliDateErr,
}: CustomerInfoDialogProps) => {
  type AutoCompleteData = {
    label: string;
    value: number;
  };

  const [qtyAutoComplete,setQtyAutoComplete] = useState<AutoCompleteData>();
  const [qtyMaster,setQtymaster] = useState<Array<AutoCompleteData>>();

  const [masterData, setMasterData] = useState<Array<AutoCompleteData>>([]);
  const [subscribeKikan, setSubscribeKikan] = useState<AutoCompleteData>();


  const [dateError, setDateError] = useState<boolean>(false);

  const generateAutoCompleteData = ()=>{
    let data:Array<AutoCompleteData> = [];
    for(let i=min;i<=max;i++){
      const current = {label: `${i} 個`, value: i};
      data = [...data,current]
      if(qty===i){
        setQtyAutoComplete(current);
      }
    }
    // return data;
    setQtymaster(data);
  }

  const getMasterData = () => {
    mutations.pub.master
      .getById(4)
      .then((ans) => {
        if (ans.data) {
          const updatedMasterData = ans.data.map(({ master_detail_id: id, name }) => {
          const data = {
            value: id,
            label: name,
          }
          if(subKikan == id)
          {
            setSubscribeKikan(data);
            setSubKikan(id);
          }
            return data;
          });
          setMasterData(updatedMasterData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    generateAutoCompleteData();
  },[qty]);

  useEffect(()=>{
    getMasterData();
  },[]);

  const onCloseAction = ()=>{
    onClose();
    setOpenDialog(false);
  }

  return (
    <DialogBox size="md" open={openDialog} setOpen={onCloseAction}>
      <div className="">
        {/* Title */}
        <div className="h-[60px] flex flex-row justify-center items-center relative">
          <p className="text-sm text-black font-semibold">配達日の変更</p>
          <div onClick={() => onCloseAction()} className="btn">
            <CloseIcon className="absolute top-4 right-4 text-black" />
          </div>
        </div>

        <Divider />


        <div className="space-y-4 px-6 pb-6">
          <div className="flex space-x-6 items-center py-6">
            <img
              src={aws.s3.getUrl({key:img_url ? img_url : ""})}
              alt="Product photo"
              width={180}
              height={180}
            />

            <div className="text-black space-y-3 text-sm">
              <p>{product_name}</p>
              <p className="font-semibold text-xl">
                {Helper.japaneseNumberFormat({
                  number: total,
                })}
                <span className=" font-thin text-xs">（税込）</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-3">
            <Autocomplete
              disablePortal
              // id="combo-box-demo"
              value={qtyAutoComplete}
              onChange={(_, value) => {
                if(value){
                  setQtyAutoComplete(value);
                  setQty(value.value);
                }
              }}
              options={qtyMaster || []}
              renderInput={(params) => <TextField {...params} label="数量" />}
              className="w-1/3"
            />

            <Autocomplete
              disablePortal
              //id="combo-box-demo"
              value={subscribeKikan}
              onChange={(_, value) => {
               if(value)
               {
                setSubscribeKikan(value);
                setSubKikan(value.value);
               }
              }}
              options={masterData || []}
              renderInput={(params) => <TextField {...params} label="配達スケジュール" />}
              className="w-1/3"
            />

            <div className="w-1/3">
              {/* <InputBoxComponent
              value={scheduleDeliDate}
              className={`p-2 rounded-md bg-white focus:outline-none w-full ${
                dateError &&
                "border-2 border-red-400 text-red-400"
              }`}
              error={scheduleDeliDateErr}
              onChange={(e) => {
                setDateError(false);
                setScheduleDeliDate(e.target.value);
              }}
              label="次の配達日"/> */}
                <p className="text-sm">次の配達日</p>
                <input
                  type="date"
                  value={scheduleDeliDate}
                  className={`p-2 rounded-md bg-white focus:outline-none w-full ${
                    dateError &&
                    "border-2 border-red-400 text-red-400"
                  }`}
                  onChange={(e) => {
                    setDateError(false);
                    setScheduleDeliDate(e.target.value);
                  }}
                />
                <p className="text-red-400 text-sm">{scheduleDeliDateErr}</p>
              </div>
          </div>

          <SizeBox />
          <Button onClick={updateAction} variant="contained" className="w-full">
            変更
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};

export default memo(ChangeOrderInfoDialogComponent);
