import CustomPaginationTable from "../common/CustomPaginationTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CityWardTown } from "@/types/citywardtown/CityWardTown";

type AddressTableComponentProps = {
  cityWardTown: Array<CityWardTown>;
  getCityWardTown: () => void;
  setCityWardTownId: Dispatch<SetStateAction<number | undefined>>;
  setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
  setOpenEditAddressDialog: Dispatch<SetStateAction<boolean>>
  editingCityWardTown: (cityWardTownId: number) => void;
};

const AddressTableComponent = ({
  cityWardTown,
  getCityWardTown,
  setCityWardTownId,
  setOpenConfirmDialog,
  setOpenEditAddressDialog,
  editingCityWardTown
}: AddressTableComponentProps) => {
  useEffect(() => {
    getCityWardTown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CustomPaginationTable
      data={cityWardTown}
      title={
        <thead className="">
          <tr className="bg-[#F6F7F8] border-black border-t-[1px] border-b-[1px] border-opacity-20">
            <th scope="col" className="px-2 py-4 w-[40px] ">
              No
            </th>
            <th scope="col" className="px-2 py-4 w-[300px] text-left">
              郵便番号
            </th>
            <th scope="col" className="px-2 py-4 w-[300px] text-left">
              都道県
            </th>
            <th scope="col" className="px-2 py-4 w-[300px] text-left">
              区・市・町・村名
            </th>
            <th scope="col" className="px-2 py-4 w-[300px] text-left">
              住所
            </th>
            <th scope="col" className="px-10 py-4 text-right whitespace-nowrap">
              アクション
            </th>
          </tr>
        </thead>
      }
      renderBody={({
        index,
        city_ward_town_id,
        name,
        prefecture_name,
        code,
        address,
      }: CityWardTown) => (
        <tr
          key={Math.random()}
          className="nav bg-white text-gray-700 text-sm  border-black border-b-[1px] border-opacity-20"
        >
          <td scope="row" className="px-6 py-4 ">
            {index}
          </td>
          <td className="px-2 py-4">{code}</td>
          <td className="px-2 py-4">{prefecture_name}</td>
          <td className="px-2 py-4">{name}</td>
          <td className="px-2 py-4">{address}</td>
          <td className="px-10 py-4 flex justify-end space-x-4">
            <div
              className="w-8 h-8 rounded-full border-[#3083FF] border-[1px] flex justify-center items-center"
              onClick={() => {}}
            >
              <EditIcon onClick={() => {
                setOpenEditAddressDialog(true);
                editingCityWardTown(city_ward_town_id)
              }} fontSize="small" className="text-[#3083FF]" />
            </div>
            <div className="w-8 h-8 rounded-full border-[#FF0303] border-[1px] flex justify-center items-center">
              <DeleteIcon
                onClick={() => {
                  setCityWardTownId(city_ward_town_id);
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

export default AddressTableComponent;
