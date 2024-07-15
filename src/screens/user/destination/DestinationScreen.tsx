import { GlobalProps } from "@/App";
import { subNavItemsProp } from "@/models/dataModel";
import SubNavbarComponent from "@/components/user/navbar/SubNavbarComponent";
import SizeBox from "@/components/SizeBox";
import HomeIcon from "@mui/icons-material/Home";
import Routes from "@/navigations/routes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ConfirmDefaultDestinationComponent from "@/components/user/destination/ConfirmDefaultDestinationComponent";
import { DeliveryAddressList } from "@/types/delivery_address/delivery_address_list";
import { useEffect, useState } from "react";
import Helper from "@/helpers";
import ConfirmDeleteAddressComponent from "@/components/user/destination/ConfirmDeleteAddressComponent";
import { updateAddressData } from "@/networks/mutations/user/deliveryAddress/update";
import UserLayout from "../UserLayout";


const DestinationScreen = ({ mutations, loginUser, changeLoginUserAction }: GlobalProps) => {
  const navigate = useNavigate();
  const [openConfirmDialog, setOpenDefaultAddressDialog] = useState<boolean>(false);
  const [defaultAddressId, setDefaultAddressId] = useState<number>();

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressList[]>([]);
  
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
      Title: "配達先",
      route: null,
    },
  ];

  /* delete address */
  const [deleteAddressId,setDeleteAddressId] = useState<number>();
  const [openDeleteAddressDialog,setOpenDeleteAddressDialog] = useState<boolean>(false);

  useEffect(() => {
    getDeliveryAddress();
  }, []);

  const deleteAddress = ()=>{

    if(deleteAddressId){
      mutations.user.deliveryAddress.delete(deleteAddressId)
      .then(()=>{
        const updatedAddress = deliveryAddress.filter(({address_id})=>deleteAddressId!==address_id);
        setDeliveryAddress(updatedAddress);
        // reback
        setDeleteAddressId(undefined);
        setOpenDeleteAddressDialog(false);
      })
    }
  }

  const deleteAction = (addressId: number)=>{
    setDeleteAddressId(addressId);
    setOpenDeleteAddressDialog(true);
  }

  const getDeliveryAddress = () => {
    mutations.user.deliveryAddress.get({status: 1})
    .then((ans) => {
      if (ans.data) {
        setDeliveryAddress(ans.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // update Default Address

  const updateAddressData: updateAddressData = {
    family_name: '',
    name: '',
    post_code: '',
    prefecture_id: 0,
    city_ward_town_id: 0,
    address_name: '',
    phone: '',
    main_address: 1,
  };

  const defaultAction = (addressId:number)=>{
    setDefaultAddressId(addressId);
    setOpenDefaultAddressDialog(true);
  }

  const updateDefaultDeliveryAddress = () => {

    if (defaultAddressId) {
      mutations.user.deliveryAddress.update(defaultAddressId, updateAddressData)
        .then(() => {

          setDeliveryAddress(deliveryAddress);
          // reback
          setDeleteAddressId(undefined);
          setOpenDefaultAddressDialog(false);

          const updatedAddress = deliveryAddress.map((address)=>{
            if(address.address_id === defaultAddressId){
              address.main_address = 1;
              return address;
            }else{
              address.main_address = -1;
              return address;
            }
          })
          setDeliveryAddress(updatedAddress);
        })
    }
  }

  // edit Address

  const editDeliAddressAction = (editData: DeliveryAddressList) => {
    // console.log(editData);
    Helper.navigate({
      navigate,
      path: Routes.USER.EDIT_DESTINATION,
      state: {
        editData,
      },
    });
  };

  return (
    <UserLayout activeNumber={3} loginUser={loginUser} changeLoginUserAction={changeLoginUserAction}>
      <div className="container mx-auto py-20">
        <SubNavbarComponent text="配達先" subNavItems={subNavItems} />
        <SizeBox h={20} />

        <div className="grid grid-cols-3 gap-8">
          <div
            onClick={() => navigate(Routes.USER.ADD_DESTINATION)}
            className="px-8 py-6 rounded-md bg-[#f7f7f7] text-sm relative space-y-2 flex justify-center items-center cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full border-black border-[3px] border-opacity-50 flex justify-center items-center">
              <AddIcon fontSize="large" className="opacity-50" />
            </div>
          </div>

          {
            deliveryAddress.map((delivery_address: DeliveryAddressList) => {
              const fullName = delivery_address.name.replace(","," ");
              return(
              <div key={delivery_address.address_id} className="px-8 py-6 rounded-md bg-[#f7f7f7] text-sm relative space-y-2">
                  <p className="font-semibold text-base">{fullName}</p>
                <p className="pt-2">{delivery_address.post_code}</p>
                <p>{delivery_address.prefecture.name}</p>
                <p className="pb-2">{delivery_address.city_ward_town.name}{delivery_address.city_ward_town.address}</p>
                <p>電話：{delivery_address.phone}</p>

                <div className="flex space-x-4 pt-4">
                  <EditIcon
                      onClick={() =>  editDeliAddressAction(
                        delivery_address
                        ) }
                    fontSize="small"
                    className="text-[#3083FF] cursor-pointer"
                  />

                  <DeleteIcon onClick={()=>deleteAction(delivery_address.address_id)} fontSize="small" className="text-[#FF0303] nav" />

                  {delivery_address.main_address == -1 && <p
                      onClick={() => defaultAction(delivery_address.address_id)}
                    className="text-textBlue underline underline-offset-2 pl-8 cursor-pointer"
                  >
                    デフォルトに設定
                  </p>}
                </div>

                {delivery_address.main_address == 1 && <div className="px-4 py-2 rounded-md bg-primary absolute top-4 right-4 text-white nav">
                  <p>Default</p>
                </div>}
              </div>);
            })
          }
        </div>

        {/* 検索 */}
        <ConfirmDefaultDestinationComponent
          openConfirmDialog={openConfirmDialog}
          setOpenConfirmDialog={setOpenDefaultAddressDialog}
          onConfirm={updateDefaultDeliveryAddress}
        />

        {/* delete */}
        <ConfirmDeleteAddressComponent 
          openConfirmDialog={openDeleteAddressDialog}
          setOpenConfirmDialog={setOpenDeleteAddressDialog}
          onConfirm={deleteAddress}
        />
        <SizeBox h={100} />
      </div>
    </UserLayout>
  );
};
export default DestinationScreen;
