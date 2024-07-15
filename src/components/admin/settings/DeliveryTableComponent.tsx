import SizeBox from "@/components/SizeBox";
import { MutationType } from "@/networks/mutations";
import { ClassificationDataTypes } from "@/screens/admin/settings/MasterSettingsScreen";
import { Dispatch, SetStateAction } from "react";

type DeliveryTableComponentProps = {
  deliveryValue: ClassificationDataTypes;
  setDeliveryValue: Dispatch<SetStateAction<ClassificationDataTypes>>;
  mutations: MutationType;
};

const DeliveryTableComponent = ({
  deliveryValue,
  setDeliveryValue,
  mutations,
}: DeliveryTableComponentProps) => {
  const updateAction = (id: number, name: string, value: number) => {
    const body = {
      master_id: id,
      name: name,
      value: value,
    };
    console.log(body);

    mutations.admin.masterDetail
      .update({ master_detail_id: id }, body)
      .then((ans) => {
        if (ans) {
          console.log(ans);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" bg-white px-8 py-6 mx-[25px] rounded-md">
      <p className="font-semibold text-xl">ポイントマスタ設定</p>
      <SizeBox h={20} />
      <div className="flex rounded-md border-black border-[1px] border-opacity-20 w-[250px] overflow-hidden">
        <div className="w-1/3 h-14 flex justify-center items-center">
          <input
            type="number"
            className="focus:outline-none border-none w-full text-center"
            value={deliveryValue.value}
            onChange={(e) =>
              setDeliveryValue((prevDiscountValue) => ({
                ...prevDiscountValue,
                value: e.target.value,
              }))
            }
            onBlur={() =>
              updateAction(
                deliveryValue.masterId,
                deliveryValue.name,
                +deliveryValue.value
              )
            }
          />
        </div>
        <div className="w-2/3 h-14 flex justify-center items-center bg-[#F2F5FB] border-black border-l-[1px] border-opacity-20">
          <p>円以上 = 無料</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTableComponent;
