import { GlobalProps } from "@/App";
import { subNavItemsProp } from "@/models/dataModel";
import SubNavbarComponent from "@/components/user/navbar/SubNavbarComponent";
import SizeBox from "@/components/SizeBox";
import HomeIcon from "@mui/icons-material/Home";
import Routes from "@/navigations/routes";
import { useEffect, useState } from "react";
import mutations from "@/networks/mutations";
import UserNameDialogComponent from "@/components/user/security/UserNameDialogComponent";
import UserMailAddressDialogComponent from "@/components/user/security/UserMailAddressDialogComponent";
import UserPhoneNumberDialogComponent from "@/components/user/security/UserPhoneNumberDialogComponent";
import UserPasswordDialogComponent from "@/components/user/security/UserPasswordDialogComponent";
import { CustomerLoginAndSecurityListRes } from "@/networks/mutations/user/loginandsecurity/get";
import { CustomerLoginAndSecurityUpdateRes } from "@/networks/mutations/user/loginandsecurity/update";
import UserLayout from "../UserLayout";

export type updatePayload = {
  name?: string;
  mail?: string;
  phone?: string;
  new_password?: string;
  old_password?: string;
  password?:string;
  token?: string;
}

//NOTED AYZ
const SecurityScreen = ({loginUser, changeLoginUserAction}: GlobalProps) => {
  
  /* Dialogue Box */
  const [userNameDialog, setUserNameDialog] = useState<boolean>(false);
  const [mailAddressDialog, setMailAddressDialog] = useState<boolean>(false);
  const [phoneNumberDialog, setPhoneNumberDialog] = useState<boolean>(false);
  const [passwordDialog, setPasswordDialog] = useState<boolean>(false);

  /* Phone */
  const [phone,setPhone] = useState<string>();
  const [editPhone,setEditPhone] = useState<string>();
  const [phoneErr,setPhoneErr] = useState<string>("");

  /* Name */
  const [name,setName] = useState<string>();
  const [editName,setEditName] = useState<string>();
  const [nameErr,setNameErr] = useState<string>("");

  /* Mail */
  const [mail,setMail] = useState<string>();
  const [editMail,setEditMail] = useState<string >();
  const [mailErr,setMailErr] = useState<string>("");
  
  /* password */
  const [passwordErr,setPasswordErr] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newConfirmPassword, setNewConfirmPassword] = useState<string>("");

  const getUserData  = () => {
      mutations.user.customerLoginAndSecurity.get()
      .then((ans: CustomerLoginAndSecurityListRes) => {
        if (ans.data) {
          const {name,mail,phone} = ans.data;
          setName(name);
          setEditName(name);
          setMail(mail);
          setEditMail(mail);
          setPhone(phone);
          setEditPhone(phone);
        }
    });
  }

  const onClose = ()=>{
    /* Mail */
    setEditMail(mail);
    setMailErr("");

    /* Password */
    setOldPassword("");
    setNewPassword("");
    setNewConfirmPassword("");

    /* Name */
    setEditName(name);
    setNameErr("");

    /* Phone */
    setEditPhone(phone);
    setPhoneErr("");
  }

  const updateAction = (payload: updatePayload)=>{
    setMailErr("");
    setNameErr("");
    setPasswordErr("");
    setPhoneErr("");

    mutations.user.customerLoginAndSecurity.update(payload)
    .then(({data})=>{
      setMailAddressDialog(false);
      setPasswordDialog(false);
      setUserNameDialog(false);
      setPhoneNumberDialog(false);
      setMail(data?.mail);
      setName(data?.name);
      setPhone(data?.phone);
      
      // メール変更のみ
      if(data?.token){
        localStorage.setItem("token",data?.token);
      }  
    })
    .catch((err:CustomerLoginAndSecurityUpdateRes)=>{
      if(err){
        if(err.errors?.mail){
          setMailErr(err.errors.mail);
        }
        if(err.errors?.password){
          setPasswordErr(err.errors.password);
        }
        if(err.errors?.name){
          setNameErr(err.errors.name);
        }
        if(err.errors?.phone){
          setPhoneErr(err.errors.phone);
        }
      }
    })
  }


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
      Title: "ログイン & セキュリティ",
      route: null,
    },
  ];


  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserLayout activeNumber={3} loginUser={loginUser} changeLoginUserAction={changeLoginUserAction}>
      {/* Temp */}
      <div className="container mx-auto py-20">
        <SubNavbarComponent
          text="ログイン & セキュリティ"
          subNavItems={subNavItems}
        />
        <SizeBox h={20} />

        <div className="bg-white rounded-md border-black border-[1px] border-opacity-20">
          <div className="flex justify-between border-black border-b-[1px] border-opacity-20 px-12 py-6 text-sm">
            <div className="space-y-3">
              <p className="font-semibold">名前：</p>
              <p className="px-3 py-2">
                {name}
              </p>
            </div>
            <button
              onClick={() => setUserNameDialog(true)}
              className="w-28 h-10 border-black border-[1px] border-opacity-20 rounded-md"
            >
              編集
            </button>
          </div>

          <div className="flex justify-between border-black border-b-[1px] border-opacity-20 px-12 py-6 text-sm">
            <div className="space-y-3">
              <p className="font-semibold">Eメール：</p>
              <p className="px-3 py-2">
                {mail}
              </p>
            </div>
            <button
              onClick={() => setMailAddressDialog(true)}
              className="w-28 h-10 border-black border-[1px] border-opacity-20 rounded-md"
            >
              編集
            </button>
          </div>

          <div className="flex justify-between border-black border-b-[1px] border-opacity-20 px-12 py-6 text-sm">
            <div className="space-y-3">
              <p className="font-semibold">電話番号：</p>
              <p className="px-3 py-2">
                {phone}
              </p>
            </div>
            <button
              onClick={() => setPhoneNumberDialog(true)}
              className="w-28 h-10 border-black border-[1px] border-opacity-20 rounded-md"
            >
              編集
            </button>
          </div>

          <div className="flex justify-between border-black border-b-[1px] border-opacity-20 px-12 py-6 text-sm">
            <div className="space-y-3">
              <p className="font-semibold">パスワード：</p>
              <p className="px-3 py-2">
                * * * * * * *
              </p>
            </div>
            <button
              onClick={() => setPasswordDialog(true)}
              className="w-28 h-10 border-black border-[1px] border-opacity-20 rounded-md"
            >
              編集
            </button>
          </div>
        </div>

        {/* 検索 */}
        <UserNameDialogComponent
          editName = {editName}
          setEditName = {setEditName}
          nameErr = {nameErr}
          setNameErr = {setNameErr}
          openDialog={userNameDialog}
          setOpenDialog={setUserNameDialog}
          updateAction={updateAction}
          onClose = {onClose}
        />

        <UserMailAddressDialogComponent
          editMail = {editMail}
          setEditMail = {setEditMail}
          mailErr= {mailErr}
          setMailErr = {setMailErr}
          openDialog={mailAddressDialog}
          setOpenDialog={setMailAddressDialog}
          updateAction={updateAction}
          onClose = {onClose}
        />

        <UserPhoneNumberDialogComponent
          editPhone={editPhone}
          setEditPhone={setEditPhone}
          phoneErr={phoneErr}
          setPhoneErr = {setPhoneErr}
          openDialog={phoneNumberDialog}
          setOpenDialog={setPhoneNumberDialog}
          updateAction={updateAction}
          onClose = {onClose}
          
        />

        <UserPasswordDialogComponent
          openDialog={passwordDialog}
          setOpenDialog={setPasswordDialog}
          passwordErr={passwordErr}
          oldPassword={oldPassword}
          newPassword={newPassword}
          newConfirmPassword={newConfirmPassword}
          setPasswordErr={setPasswordErr}
          setOldPassword={setOldPassword}
          setNewPassword={setNewPassword}
          setNewConfirmPassword={setNewConfirmPassword}
          updateAction={updateAction}
          onClose = {onClose}
        />
        <SizeBox h={100} />
      </div>
      {/* Temp */}
    </UserLayout>
  );
};
export default SecurityScreen;
