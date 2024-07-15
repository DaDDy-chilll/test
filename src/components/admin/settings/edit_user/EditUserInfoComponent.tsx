import InputBoxComponent from "@/components/InputBoxComponent";
import SizeBox from "@/components/SizeBox";
import { GetUpdatedAdminRes, updateAdminData } from "@/networks/mutations/admin/list/update";
import { Admin } from "@/types/admin/admin";
import { Autocomplete, Button } from "@mui/material";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface UserSearchProps {
  editData: Admin;
  updateAdmin:(user_id: number, update_data: updateAdminData) => Promise<GetUpdatedAdminRes>;
  onSuccess: ()=> void;
}

const EditUserInfoComponent = ({
  editData,
  updateAdmin,
  onSuccess,
}: UserSearchProps) => {
  const [role, setRole] = useState<AutoCompleteData>({
    label: editData.role == "1" ? "Super Admin" : "Admin",
    value: editData.role,
  });

  type AutoCompleteData = {
    label: string;
    value: string;
  };

  // Data
  const roleData: Array<AutoCompleteData> = [
    { label: "Super Admin", value: "1" },
    { label: "Admin", value: "2" },
  ];

  const [userName, setUserName] = useState<string>(editData.user_name);
  const [userNameErr, setUserNameErr] = useState<string>("");
  const [userNameKana, setUserNameKana] = useState<string>(editData.user_name_kana);
  const [userNameKanaErr, setUserNameKanaErr] = useState<string>("");
  const [mailAddress, setMailAddress] = useState<string>(editData.mail);
  const [mailAddressErr, setMailAddressErr] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(editData.phone);
  const [phoneNumberErr, setPhoneNumberErr] = useState<string>("");

  const[error,setError] = useState<String>("");

  const updateAdminData: updateAdminData = {
    user_name: userName,
    user_name_kana: userNameKana,
    mail: mailAddress,
    role: role?.value == "1" ? 1 : 2,
    phone: phoneNumber,
  };

  const updateBtnAction = () => {
    updateDataAction(editData.user_id, updateAdminData);
  };

  const updateDataAction = (id: number, updateData: updateAdminData) => {
    setMailAddressErr("");
    setUserNameErr("");
    setUserNameKanaErr("");
    setMailAddressErr("");
    setPhoneNumberErr("");
    setError("");

    updateAdmin(id, updateData)
      .then((ans) => {
        console.log(ans);
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        if(err.errors){
          if(err.message){
            setError(err.message);
          }
          if(err.errors.mail){
            setMailAddressErr(err.errors.mail);
          }
          if(err.errors.phone){
            setPhoneNumberErr(err.errors.phone);
          }
          if(err.errors.user_name){
            setUserNameErr(err.errors.user_name);
          }
          if(err.errors.user_name_kana){
            setUserNameKanaErr(err.errors.user_name_kana);
          }
        }
      })
  };

  useEffect ( ()=> {
    // const keydownListener = (event: KeyboardEvent) => {
    //   if(event.key === "Enter"){
    //     updateDataAction(editData.user_id, updateAdminData);
    //   }
      
    // }
    // window.addEventListener("keydown",keydownListener)

    // return () => {
    //   window.removeEventListener("keydown",keydownListener);
    // }
  })

  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      <div className="text-textBlue text-[20px] font-semibold">利用者変更</div>
      <div className="text-red-500 text-[18px] text-center">{error}</div>
      <SizeBox h={20} />
      <div className="flex flex-row">
        <InputBoxComponent
          className="flex-1 bg-bgcolor"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          label="名前"
          error={userNameErr}
        />
        <SizeBox w={50} />
        <InputBoxComponent
          className="flex-1 bg-bgcolor"
          value={userNameKana}
          onChange={(event) => {
            setUserNameKana(event.target.value);
          }}
          label="名前（カナ）"
          error={userNameKanaErr}
        />
      </div>

      <SizeBox h={20} />
      <div className="flex flex-row">
        <InputBoxComponent
          className="flex-1 bg-bgcolor"
          value={mailAddress}
          onChange={(event) => {
            setMailAddress(event.target.value);
          }}
          label="メール"
          error={mailAddressErr}
        />
        <SizeBox w={50} />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={role}
          onChange={(_, value) => {
            value && setRole(value);
          }}
          options={roleData}
          renderInput={(params) => <TextField {...params} label="権限" />}
          className="flex-1 bg-bgcolor"
        />
      </div>
      <SizeBox h={20} />

      <div className="flex">
        <InputBoxComponent
          className=" bg-bgcolor w-1/2"
          value={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
          label="電話番号"
          error={phoneNumberErr}
        />

        <SizeBox w={50} />

        <div className="w-1/2"></div>
      </div>

      <SizeBox h={20} />
      <div className="flex flex-row">
        <Button
          onClick={updateBtnAction}
          className="flex-1"
          variant="contained"
          size="large"
          style={{ backgroundColor: "#285DBD", height: 50 }}
        >
          保存
        </Button>
      </div>
      <SizeBox h={65} />
    </Card>
  );
};

export default EditUserInfoComponent;
