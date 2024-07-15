import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
import TagIcon from "@mui/icons-material/Tag";
import { Checkbox } from "@material-tailwind/react";
import ShippingMenu from "@/components/admin/delivery/ShippingMenu";
import ShippingSearchComponent from "@/components/admin/warehouse/ShippingSearchComponent";
import mutations from "@/networks/mutations";
import { InventoryExport } from "@/types/inventory_export/inventory_export";
import FloatingActionButton from "@/components/admin/warehouse/FloatingActionButton";
import ConfirmShippingComponent from "@/components/admin/warehouse/ConfirmShippingComponent";
import { InventoryExportUpdateErrRes } from "@/networks/mutations/admin/inventory_export/update";
import DialogBox from "@/components/DialogBox";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";

const ShippingScreen = ({ setIsAdmin }: GlobalProps) => {
  const navigate = useNavigate();
  const [selectedShippingIds, setSelectedShippingIds] = useState<Array<number>>([]);
  const [selectedShippingNo, setSelectedShippingNo] = useState<Array<number>>([]);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [inventoryExport, setInventoryExport] = useState<Array<InventoryExport>>();

  //confirm text dialog
  const [confirmText, setConfirmText] = useState<string>("");

  //get route data from warehouse
  const location = useLocation();
  const warehouseDetailId = location.state.warehouse_detail_id;
  const productList = location.state;

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "在庫一覧",
      action: () => navigate(Routes.ADMIN.WAREHOUSE),
    },
    {
      title: "出荷",
      action: () => { },
    },
  ];

  //inital state of shipping
  useEffect(() => {
    getInventoryExportList();
  }, [])

  const getInventoryExportList = () => {
    mutations.admin.inventoryExport.get({ warehouse_detail_id: warehouseDetailId })
      .then((ans) => {
        const sortedData = [...ans.data].sort((a, b) => a.warehouse_transaction_id - b.warehouse_transaction_id);
        console.log(sortedData)
        setInventoryExport(sortedData);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  interface onCheckActionProps {
    warehouse_transaction_id: number,
    check: boolean,
    number: number
  };

  const handleCheckboxChange = ({ warehouse_transaction_id, check, number }: onCheckActionProps) => {
   
    if (check) {
      setSelectedShippingNo([...selectedShippingNo, number]);
      setSelectedShippingIds([...selectedShippingIds, warehouse_transaction_id]);
    } else {
      setSelectedShippingNo(selectedShippingNo.filter(no => no !== number));
      setSelectedShippingIds(selectedShippingIds.filter(id => id !== warehouse_transaction_id));
    }
  }

  //handleShippingButton
  const handleShippingButton = () => {
    const sortedNumbers = [...selectedShippingNo].sort((a, b) => a - b);
    if (selectedShippingIds.length > 0) {
      setConfirmText("倉庫トランザクション ID: " + sortedNumbers);
      setOpenConfirmDialog(true);
    }
  }

  //shipping action
  const shippingAction = () => {
    if (selectedShippingIds.length > 0) {
      setOpenConfirmDialog(true);
      mutations.admin.inventoryExport.update({ warehouse_transaction_id: selectedShippingIds })
        .then(() => {
          setOpenConfirmDialog(false);
          const updatedInventoryExport = inventoryExport?.filter(({ warehouse_transaction_id }) => !selectedShippingIds.includes(warehouse_transaction_id))
          setInventoryExport(updatedInventoryExport);
          setSelectedShippingIds([]); //set selected id is null
          setSelectedShippingNo([]); //set selected id is null
        })
        .catch((err: InventoryExportUpdateErrRes) => { //if inventory is not enough
          if (err.errors?.product_qty == "残り在庫が十分にありません。") {
            setOpenErrorDialog(true);
            setOpenConfirmDialog(false);
          }
        })
    }
  }

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <ShippingMenu openDialog={setOpenSearchDialog} productList={productList} />
      <SizeBox h={20} />

      <CustomPaginationTableWithPageNo
        data={inventoryExport ? inventoryExport : []}
        title={
          <thead className="">
            <tr className="bg-[#F6F7F8]">
              <th
                scope="col"
                className="px-2 py-4 w-[10px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                No
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[10px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                <TagIcon fontSize="small" />
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                コード
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                顧客名
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                注文日
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                注文数量
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                出荷指示日時
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[400px] border-black border-t-[1px] border-b-[1px] border-opacity-20 text-start"
              >
                出荷予定日時
              </th>
            </tr>
          </thead>
        }
        renderBody={({
          warehouse_transaction_id,
          order_code,
          user_code,
          user_name,
          product_qty,
          created_at,
          schedule_pickup_date,
          schedule_delivery_date
        }: InventoryExport, index : number, currentPage : number, itemsPerPage : number) => (
          <tr
            key={warehouse_transaction_id}
            className=" bg-white text-gray-700 text-sm border-black border-b-[1px] border-opacity-20"
          >
            <td scope="row" className="px-6 py-8">
            {(index + 1) + (currentPage - 1) * itemsPerPage}
            </td>
            <td scope="row" className="px-6 py-6">
              <Checkbox
                type="checkbox"
                crossOrigin={1}
                checked={selectedShippingIds.includes(warehouse_transaction_id)}
                onChange={(event) => handleCheckboxChange(
                  { 
                    warehouse_transaction_id, 
                    check: event.currentTarget.checked,
                    number: (index + 1) + (currentPage - 1) * itemsPerPage
                  })}
                className="bg-white checked:bg-[#08C856] checked:border-[#08C856]"
              />
            </td>
            <td scope="row" className="px-6 py-8">
              <p className="underline underline-offset-2 text-textBlue leading-6">
                {order_code}
              </p>
            </td>
            <td className="px-2 py-8">
              <p className="w-full text-center">
                {user_code}  {user_name}
              </p>
            </td>
            <td className="px-2 py-8">
              <div className="w-full text-center">
                {created_at && (
                  <>
                    {created_at.split('T')[0]}
                  </>
                )}
              </div>
            </td>
            <td className="px-2 py-8">
              <div className="w-full text-center">{product_qty}個</div>
            </td>
            <td className="px-2 py-8">
              <div className="w-full">
                {schedule_pickup_date && (
                  <>
                    {schedule_pickup_date.split('T')[0]}
                  </>
                )}
              </div>
            </td>
            <td className="px-2 py-8">
              <div className="w-full">
                {schedule_delivery_date && (
                  <>
                    {schedule_delivery_date.split('T')[0]}
                  </>
                )}
              </div>
            </td>
          </tr>

        )}
      />

      {/* 検索 */}
      <ShippingSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        setInventoryExport={setInventoryExport}
        warehouseDetailId={warehouseDetailId}
        onSearch={() => setOpenSearchDialog(false)}
      />

      {/* 出荷 */}
      <FloatingActionButton
        title="出荷"
        onClick={handleShippingButton}
      />

      <ConfirmShippingComponent
        confirmText={confirmText}
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        onConfirm={shippingAction}
      />

      <DialogBox open={openErrorDialog} setOpen={setOpenErrorDialog}>
        <div className="">
          {/* Title */}
          <div className="h-[60px] flex flex-row justify-center items-center relative">
            <div
              onClick={() => setOpenErrorDialog(false)}
              className="absolute right-[26px] btn text-black"
            >
              <CloseIcon />
            </div>
          </div>
          <div className="px-[50px] py-[20px] flex flex-col items-center">
            <div className="text-center font-bold space-y-2 text-red-400">
              <p>残り在庫が十分にありません。</p>
            </div>
            <SizeBox h={50} />
            {/* Button */}
            <Button
              onClick={() => setOpenErrorDialog(false)}
              variant="contained"
              className="w-2/3"
            >
              OK
            </Button>
          </div>
        </div>
      </DialogBox>
    </div>
  );
};

export default ShippingScreen;
