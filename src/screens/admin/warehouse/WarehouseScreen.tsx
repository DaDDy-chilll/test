import { GlobalProps } from "@/App";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import SizeBox from "@/components/SizeBox";
import CustomPaginationTable from "@/components/admin/common/CustomPaginationTable";
import CommonMenuComponent from "@/components/admin/common/CommonMenuComponent";
import Helper from "@/helpers";
import { useEffect, useState } from "react";
import WareHouseSearchComponent from "@/components/admin/warehouse/WareHouseSearchComponent";
import WareHouseStockComponent from "@/components/admin/warehouse/WareHouseStockComponent";
import mutations from "@/networks/mutations";
import aws from "@/aws";
import { warehouse_detail } from "@/types/warehouse/warehouse_detail";

const WarehouseScreen = ({ setIsAdmin, categories }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openStockDialog, setOpenStockDialog] = useState(false);

  const [warehouseDetails, setWarehouseDetails] = useState<Array<warehouse_detail>>();
  const [wareHouseData, setWareHouseData] = useState<warehouse_detail>();
  const [categoryToSearch, setCategoryToSearch] = useState<string>("");
  const [subCategoryToSearch, setSubCategoryToSearch] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "在庫一覧",
      action: () => { },
    },
  ];

  //initial state
  useEffect(() => {
    getWareHouseList();
  }, [])

  const getWareHouseList = () => {
    mutations.admin.warehouseDetail.get({
      search: searchKeyword,
      category: categoryToSearch,
      subCategory: subCategoryToSearch,
    })
    .then((ans) => {
      const wareHouseLists = ans.data?.map(
        (warehouse, index) => ({
          index: index,
          product_id: warehouse.product_id,
          img_url: warehouse.img_url,
          warehouse_detail_id: warehouse.warehouse_detail_id,
          inventory: warehouse.inventory,
          product_code: warehouse.product_code,
          product_name: warehouse.product_name,
          title: warehouse.title ,
          safe_stock_amt: warehouse.safe_stock_amt,
          price: warehouse.price,
          sub_cat_name: warehouse.sub_cat_name,
          total_order: warehouse.total_order,
          cat_name: warehouse.cat_name
        })
      )
      setSearchKeyword("");
      setCategoryToSearch("");
      setSubCategoryToSearch("");
      setWarehouseDetails(wareHouseLists);
    })
    .catch((err) => console.log(err));
  }

  /* updated */
  const onInputProductQtySuccess = ()=> {
    getWareHouseList();
  }

  //setOpenStockDialog(true)
  const shiIreAction = (data: warehouse_detail) => {
    // Set the new warehouse data in state
    setWareHouseData(data);

    // Open the stock dialog
    setOpenStockDialog(true);
  };

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <CommonMenuComponent title="在庫一覧" openDialog={setOpenSearchDialog} />

      <SizeBox h={20} />

      <CustomPaginationTable
        data={warehouseDetails ? warehouseDetails : []}
        title={
          <thead className="">
            <tr className="bg-[#F6F7F8]">
              <th
                scope="col"
                className="px-2 py-4 w-[60px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                No
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[300px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                商品
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                商品カテゴリ
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                サブカテゴリ
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                残在庫
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                注文済数
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                販売可能数
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                安全在庫
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                操作
              </th>
            </tr>
          </thead>
        }
        renderBody={(
          {
            index,
            product_id,
            img_url,
            warehouse_detail_id,
            inventory,
            product_code,
            product_name,
            title,
            safe_stock_amt,
            price,
            sub_cat_name,
            total_order,
            cat_name
          }: warehouse_detail,
          //index: number
        ) => {
          return (
            <tr key={Math.random()} className="bg-white text-gray-700 text-sm">
              <td
                scope="row"
                className="px-6 py-4 border-black border-b-[1px] border-opacity-20"
              >
                <div className="w-full text-center">{index + 1}</div>
              </td>
              <td className="px-[8px] py-4 border-black border-b-[1px] border-opacity-20">
                <img
                  src={aws.s3.getUrl({ key: img_url })}
                  className="h-[150px] w-[200px] object-contain"
                />
                <div className="flex flex-col space-y-3 text-sm">
                  <div className="font-bold">{product_name}</div>
                  <div>{title}</div>
                  <div>{product_code}</div>
                  <div>
                    {Helper.japaneseNumberFormat({ number: price })}
                  </div>
                </div>
              </td>
              <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                <div className="w-full text-center">{cat_name}</div>
              </td>
              <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                <div className="w-full text-center">{sub_cat_name}</div>
              </td>
              <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                <div className="w-full text-center"> {inventory}個</div>
              </td>
              <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                <div className="w-full text-center">{total_order}個</div>
              </td>
              <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20 text-[#08C856]">
                <div className="w-full text-center">
                  {inventory - total_order}個
                </div>
              </td>
              <td className="px-2 py-4 border-black border-b-[1px] border-opacity-20">
                <div className="w-full text-center">{safe_stock_amt}個</div>
              </td>
              <td className="px-2 py-4 w-[70px] border-black border-b-[1px] border-opacity-20">
                <div className="flex flex-col justify-between items-center">
                  <button
                    onClick={() =>
                      shiIreAction({
                        index,
                        product_id,
                        img_url,
                        warehouse_detail_id,
                        product_code,
                        product_name,
                        title,
                        price,
                        inventory,
                        safe_stock_amt,
                        sub_cat_name,
                        total_order,
                        cat_name,
                      })
                    }
                    className="text-blue-500 underline"
                  >
                    仕入れ
                  </button>
                  <SizeBox h={10} />
                  <button onClick={() => navigate(Routes.ADMIN.SHIPPING, {
                    state: {
                      warehouse_detail_id: warehouse_detail_id,
                      product_code: product_code,
                      product_name: product_name,
                      img_url: img_url,
                      title: title,
                      price: price
                    }
                  }
                    )} 
                    className="text-blue-500 underline">出荷</button>
                  <SizeBox h={10} />
                  <button onClick={() => navigate(Routes.ADMIN.RECORD, {
                    state: {
                      warehouse_detail_id: warehouse_detail_id,
                      product_code: product_code,
                      product_name: product_name,
                      img_url: img_url,
                      title: title,
                      price: price
                    }
                  })} className="text-blue-500 underline">履歴
                  </button>
                </div>
              </td>
            </tr>
          );
        }}
      />
      {/* 検索 */}
      <WareHouseSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        categories={categories}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        categoryToSearch={categoryToSearch}
        setCategoryToSearch={setCategoryToSearch}
        subCategoryToSearch={subCategoryToSearch}
        setSubCategoryToSearch={setSubCategoryToSearch}
        onSearch={() => {
          getWareHouseList();
          setOpenSearchDialog(false)
        }}
      />

      <WareHouseStockComponent
        openStockDialog={openStockDialog}
        setOpenStockDialog={setOpenStockDialog}
        setWarehouseDetails={setWarehouseDetails}
        wareHouseData={wareHouseData}
        onInputProductQtySuccess={onInputProductQtySuccess}
      />

      <SizeBox h={100} />
    </div>
  );
};

export default WarehouseScreen;
