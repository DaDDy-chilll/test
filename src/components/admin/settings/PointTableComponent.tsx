import SizeBox from "@/components/SizeBox";
import { MutationType } from "@/networks/mutations";
import { ClassificationDataTypes } from "@/screens/admin/settings/MasterSettingsScreen";
import { Dispatch, SetStateAction } from "react";

type PointTableComponentProps = {
  pointValueToYen: ClassificationDataTypes;
  pointValueFromYen: ClassificationDataTypes;
  setPointValueToYen: Dispatch<SetStateAction<ClassificationDataTypes>>;
  setPointValueFromYen: Dispatch<SetStateAction<ClassificationDataTypes>>;
  mutations: MutationType;
};

const PointTableComponent = ({
  pointValueToYen,
  pointValueFromYen,
  setPointValueToYen,
  setPointValueFromYen,
  mutations,
}: PointTableComponentProps) => {
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
        <div className="w-1/3 h-14 flex justify-center items-center bg-[#F2F5FB]">
          <p>1P</p>
        </div>
        <div className="w-1/3 h-14 flex justify-center items-center border-black border-l-[1px] border-r-[1px] border-opacity-20">
          <input
            type="number"
            className="focus:outline-none border-none w-full text-center"
            value={pointValueToYen.value}
            onChange={(e) =>
              setPointValueToYen((prevPointValueToYen) => ({
                ...prevPointValueToYen,
                value: e.target.value,
              }))
            }
            onBlur={() =>
              updateAction(
                pointValueToYen.masterId,
                pointValueToYen.name,
                +pointValueToYen.value
              )
            }
          />
        </div>
        <div className="w-1/3 h-14 flex justify-center items-center bg-[#F2F5FB]">
          <p>円</p>
        </div>
      </div>
      <SizeBox h={20} />
      <div className="flex rounded-md border-black border-[1px] border-opacity-20 w-[250px] overflow-hidden">
        <div className="w-1/2 h-14 flex justify-center items-center">
          <input
            type="number"
            className="focus:outline-none border-none w-full text-center"
            value={pointValueFromYen.value}
            onChange={(e) =>
              setPointValueFromYen((prevPointValueFromYen) => ({
                ...prevPointValueFromYen,
                value: e.target.value,
              }))
            }
            onBlur={() =>
              updateAction(
                pointValueFromYen.masterId,
                pointValueFromYen.name,
                +pointValueFromYen.value
              )
            }
          />
        </div>
        <div className="w-1/2 h-14 flex justify-center items-center bg-[#F2F5FB] border-black border-l-[1px] border-opacity-20">
          <p>円 = 1P</p>
        </div>
      </div>
    </div>
  );
};

export default PointTableComponent;
