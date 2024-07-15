import CustomPaginationTable from "../common/CustomPaginationTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MasterDetail } from "@/types/master_detail/master_detail";

type ClassificationTableComponentProps = {
  classifications: Array<MasterDetail>;
  getClassifications: () => void;
  setClassificationId: Dispatch<SetStateAction<number | undefined>>;
  setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
  setOpenEditClassificationDialog: Dispatch<SetStateAction<boolean>>;
  editingClassification: (classificationId: number) => void;
};

const ClassificationTableComponent = ({
  classifications,
  getClassifications,
  setClassificationId,
  setOpenConfirmDialog,
  setOpenEditClassificationDialog,
  editingClassification,
}: ClassificationTableComponentProps) => {
  useEffect(() => {
    getClassifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CustomPaginationTable
      data={classifications}
      title={
        <thead className="">
          <tr className="bg-[#F6F7F8] border-black border-t-[1px] border-b-[1px] border-opacity-20">
            <th scope="col" className="px-2 py-4 w-[40px] ">
              No
            </th>
            <th scope="col" className="px-2 py-4 w-[300px] text-left">
              区分名
            </th>
            <th scope="col" className="px-2 py-4 w-[300px] text-left">
              区分値
            </th>
            <th scope="col" className="px-2 py-4 w-[300px] text-left">
              種類
            </th>
            <th scope="col" className="px-10 py-4 text-right whitespace-nowrap">
              アクション
            </th>
          </tr>
        </thead>
      }
      renderBody={({
        index,
        master_detail_id,
        name,
        value,
        master_name,
      }: MasterDetail) => (
        <tr
          key={Math.random()}
          className="nav bg-white text-gray-700 text-sm  border-black border-b-[1px] border-opacity-20"
        >
          <td scope="row" className="px-6 py-4 ">
            {index}
          </td>
          <td className="px-2 py-4">{name}</td>
          <td className="px-2 py-4">{value}</td>
          <td className="px-2 py-4">{master_name}</td>
          <td className="px-10 py-4 flex justify-end space-x-4">
            <div
              className="w-8 h-8 rounded-full border-[#3083FF] border-[1px] flex justify-center items-center"
              onClick={() => {}}
            >
              <EditIcon
                onClick={() => {
                  editingClassification(master_detail_id);
                  setOpenEditClassificationDialog(true);
                }}
                fontSize="small"
                className="text-[#3083FF]"
              />
            </div>
            <div className="w-8 h-8 rounded-full border-[#FF0303] border-[1px] flex justify-center items-center">
              <DeleteIcon
                onClick={() => {
                  setClassificationId(master_detail_id);
                  setOpenConfirmDialog(true);
                }}
                fontSize="small"
                className="text-[#FF0303]"
              />
            </div>
          </td>
        </tr>
      )}
    />
  );
};

export default ClassificationTableComponent;
