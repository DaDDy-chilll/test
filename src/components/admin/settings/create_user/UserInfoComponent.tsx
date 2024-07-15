import SizeBox from "@/components/SizeBox";
import { Autocomplete, Button } from "@mui/material";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { GetCreatedAdminRes, createAdminData, getCreatedAdminErrRes } from "@/networks/mutations/admin/list/create";
import InputBoxComponent from "@/components/InputBoxComponent";

interface UserSearchProps {
  createAdmin: ( create_data : createAdminData) => Promise<GetCreatedAdminRes>;
  onSuccess: ()=>void;
}

const UserInfoComponent = ({
    createAdmin,
    onSuccess
} : UserSearchProps) => {
  const [role, setRole] = useState<AutoCompleteData>();
  type AutoCompleteData = {
    label: string;
    value: number;
  };

  // Data
  const roleData: Array<AutoCompleteData> = [
    { label: "Super Admin", value: 1 },
    { label: "Admin", value: 2 },
  ];

  const [userName, setUserName] = useState<string>("");
  const [userNameErr, setUserNameErr] = useState<string>("");
  const [userNameKana, setUserNameKana] = useState<string>("");
  const [userNameKanaErr, setUserNameKanaErr] = useState<string>("");
  const [mailAddress, setMailAddress] = useState<string>("");
  const [mailAddressErr,setMailAddressErr] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberErr, setPhoneNumberErr] = useState<string>("");

  // common error message
  const [error,setError] = useState<string>("");

const createAdminAction = () => {
  const createAdminData: createAdminData = {
      user_name: userName,
      user_name_kana: userNameKana,
      mail: mailAddress,
      role: role?.value == 1 ? 1 : 2,
      phone: phoneNumber
    };
  // reset err text
  setError("");
  setMailAddressErr("");
  setUserNameErr("");
  setUserNameKanaErr("");
  setPhoneNumberErr("");

  createAdmin(createAdminData)
  .then((ans) => {
      console.log(ans);
      onSuccess();
  })
  .catch((err:getCreatedAdminErrRes) => {
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
}
  useEffect(()=>{
    // const keydownListener = (event: KeyboardEvent)=>{
    //   // do action
    //   if(event.key === "Enter"){
    //     createAdminAction();
    //   }
      
    // }
    // // add listener
    // window.addEventListener("keydown",keydownListener)

    // return ()=>{
    //   // remove listener
    //   window.removeEventListener("keydown",keydownListener);
    // }
  });
  return (
    <Card className="px-[30px] py-[20px] bg-white rounded-[5px]">
      <div className="text-textBlue text-[20px] font-semibold">利用者登録</div>
      <div className="text-red-500 text-[18px] text-center">{error}</div>
      <SizeBox h={20} />
      <div className="flex flex-row">
        <InputBoxComponent
          className="flex-1 bg-bgcolor"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          error={userNameErr}
          label="名前"
        />
        <SizeBox w={50} />
        <InputBoxComponent
          className="flex-1 bg-bgcolor"
          value={userNameKana}
          onChange={(event) => {
            setUserNameKana(event.target.value);
          }}
          error={userNameKanaErr}
          label="名前（カナ）"
        />
      </div>

      <SizeBox h={20} />
      <div className="flex flex-row">
        <InputBoxComponent
          className="flex-1 bg-bgcolor"
          value={mailAddress}
          error={mailAddressErr}
          onChange={(event) => {
            setMailAddress(event.target.value);
          }}
          label="メール"
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
          renderInput={(params) => (
            <TextField {...params} label="権限" />
          )}
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
          error={phoneNumberErr}
          label="電話番号"
        />

        <SizeBox w={50} />

        <div className="w-1/2"></div>
      </div>

      <SizeBox h={20} />
        <div className="flex flex-row">
            <Button onClick={createAdminAction} className="flex-1" variant="contained" size="large" style={{backgroundColor: "#285DBD",height: 50}}>
                保存
            </Button>
        </div>
        <SizeBox h={65} />
    </Card>
    
  );
};

export default UserInfoComponent;
