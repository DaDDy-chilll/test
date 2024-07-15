import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import ProductMenu from "@/components/admin/product/ProductMenu";
import CustomPaginationTable from "@/components/admin/common/CustomPaginationTable";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Helper from "@/helpers";
import { useEffect, useState } from "react";
import ProductSearchComponent from "@/components/admin/product/ProductSearchComponent";
import { GlobalProps } from "@/App";
import aws from "@/aws";
import ConfirmComponent from "@/components/admin/settings/ConfirmComponent";

interface ProductPhoto {
  product_id: number;
  product_photo_id: number;
  img_url: string;
  main_photo: number;
  created_at?: string;
  updated_at?: string;
}

type ProductsDataTypes = {
  index: number;
  product_id: number;
  product_name: string;
  product_name_kana: string;
  title: string;
  product_code: string | number;
  product_category_name: string;
  product_subcategory_name: string;
  buy_price: number | string;
  buy_tax: number | string;
  tax: number;
  expense: number;
  price: number;
  status: number;
  subscribe_status: number;
  product_photos: Array<ProductPhoto>;
};

const ProductScreen = ({ mutations, setIsAdmin, categories }: GlobalProps) => {
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [categoryToSearch, setCategoryToSearch] = useState<string>("");
  const [subCategoryToSearch, setSubCategoryToSearch] = useState<string>("");
  const [publicStatusToSearch, setPublicStatusToSearch] = useState<number>(2);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [porductCount, setProductCount] = useState<number>(0);

  const [products, setProducts] = useState<Array<ProductsDataTypes>>([]);
  const [productId, setProductId] = useState<number>(0);

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "商品一覧",
      action: () => {},
    },
  ];

  const detailAction = (productId: number) => {
    // navigate(Routes.ADMIN.PRODUCT_DETAIL,{state: {productId}});
    Helper.navigate({
      navigate,
      path: Routes.ADMIN.PRODUCT_DETAIL,
      state: {
        productId,
      },
    });
  };

  const cleanUpSearchParams = () => {
    setSearchKeyword("");
    setPublicStatusToSearch(2);
    setCategoryToSearch("");
    setSubCategoryToSearch("");
  };

  const deleteProductById = () => {
    mutations.admin.product
      .deleteProductById({ product_id: productId })
      .then((ans) => {
        if (ans.message) {
          getProducts();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = () => {
    // if(categoryToSearch!="" && publicStatusToSearch == 2) {
    //   console.log("searchKeyword");
    //   setPublicStatusToSearch(0);
    // }
    // console.log("status",publicStatusToSearch)
    mutations.admin.product
      .get({
        category: categoryToSearch,
        subCategory: subCategoryToSearch,
        publicStatus: publicStatusToSearch,
        search: searchKeyword,
      })
      .then((ans) => {
        if (ans.data) {
          console.log(ans.data);
          if (ans.data.length > 0) {
            porductCount===0 && setProductCount(ans.data.length);
            const transformedData: ProductsDataTypes[] = ans.data?.map(
              (product, index) => ({
                index: index,
                product_id: product.product_id,
                product_name: product.product_name,
                product_name_kana: product.product_name_kana,
                title: product.title.toString(),
                product_code: product.product_code,
                product_category_name: product?.product_category_name,
                product_subcategory_name: product?.product_subcategory_name,
                buy_price: product.buy_price,
                buy_tax: product.buy_tax,
                tax: product.tax,
                expense: product.expense,
                price: product.price,
                status: product.status,
                subscribe_status: product.subscribe_status,
                product_photos: product.product_photos,
              })
            );
            setProducts(transformedData);
            console.log("count",ans.data.length);
            setProductCount(ans.data.length);
          } else {
            setProducts([]);
          }

          cleanUpSearchParams();
        } else {
          console.log(ans.errors);
        }
      });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <ProductMenu title={`商品一覧（${porductCount}個）`} openDialog={setOpenSearchDialog} />
      <SizeBox h={10} />

      <CustomPaginationTable
        data={products}
        title={
          <thead className="">
            <tr className="bg-[#F6F7F8] border-black border-t-[1px] border-b-[1px] border-opacity-20">
              <th scope="col" className="px-2 py-4 w-[40px] ">
                No
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[250px] border-black  border-t-[1px] border-b-[1px] border-opacity-20"
              >
                商品名
              </th>
              <th scope="col" className="px-2 py-4 ">
                商品カテゴリ
              </th>
              <th scope="col" className="px-2 py-4 ">
                サブカテゴリ
              </th>
              <th scope="col" className="px-2 py-4 ">
                仕入単価（税込）
              </th>
              <th scope="col" className="px-2 py-4 ">
                販売単価（税抜）
              </th>
              <th scope="col" className="px-2 py-4 ">
                税率
              </th>
              <th scope="col" className="px-2 py-4 ">
                販売単価（税込）
              </th>
              <th scope="col" className="px-2 py-4 ">
                購入スタイル
              </th>
              <th scope="col" className="px-2 py-4 ">
                ステータス
              </th>
              <th scope="col" className="px-2 py-4 ">
                アクション
              </th>
            </tr>
          </thead>
        }
        renderBody={({
          index,
          product_id,
          product_name,
          title,
          product_code,
          product_category_name,
          product_subcategory_name,
          buy_price,
          buy_tax,
          tax,
          price,
          status,
          subscribe_status,
          product_photos,
        }: ProductsDataTypes) => (
          <tr
            key={Math.random()}
            className="nav bg-white text-gray-700 text-sm border-black border-b-[1px] border-opacity-20"
          >
            <td scope="row" className="px-6 py-4 ">
              {index + 1}
            </td>
            <td className="px-[8px] pb-4 pt-2  ">
              <div className="flex">
                <img
                  src={aws.s3.getUrl({ key: product_photos[0]?.img_url })}
                  className="h-[100px] object-cover bg-cover"
                />
              </div>
              <div className="flex flex-col justify-between ml-[8px] text-sm space-y-2 mt-2">
                <div className="font-bold">{product_name}</div>
                <div>{title}</div>
                <div>{product_code}</div>
              </div>
            </td>
            <td className="px-2 py-4  text-center">{product_category_name}</td>
            <td className="px-2 py-4  text-center">
              {product_subcategory_name}
            </td>
            <td className="px-2 py-4  text-center">
              {Helper.japaneseNumberFormat({
                number: Helper.calculatePercentage({
                  amount: +buy_price,
                  percent: +buy_tax,
                }),
              })}
            </td>
            <td className="px-2 py-4  text-center">
              {Helper.japaneseNumberFormat({ number: +price })}
            </td>
            <td className="px-2 py-4  text-center">{tax}%</td>
            <td className="px-2 py-4  text-center">
              {Helper.japaneseNumberFormat({
                number: Helper.calculatePercentage({
                  amount: price,
                  percent: tax,
                }),
              })}
            </td>
            <td className="px-2 py-4  text-center">
              {subscribe_status < 1 ? `定期購入（${(100-subscribe_status*100)}%）` : `1回購入`}
            </td>
            <td className={`py-4  `}>
              <div
                className={`text-center py-2 w-16 rounded-md mx-auto ${
                  status === 1
                    ? "bg-[rgba(222,240,221,1)] text-[#1A5E20] font-[700px]]"
                    : "bg-[#EDEFF6] text-[rgba(37,50,56,1)]"
                }`}
              >
                <p>{status === 1 ? "公開" : "非公開"}</p>
              </div>
            </td>
            <td className="px-2 py-4 ">
              <div className="flex flex-row justify-center">
                <RemoveRedEyeOutlinedIcon
                  className="text-primary nav"
                  onClick={() => detailAction(product_id)}
                />
                <SizeBox w={18} />
                <DeleteOutlineOutlinedIcon
                  onClick={() => {
                    setOpenConfirmDialog(true);
                    setProductId(product_id);
                  }}
                  className="text-red-500 nav"
                />
              </div>
            </td>
          </tr>
        )}
      />
      {/* 検索 */}
      <ProductSearchComponent
        categories={categories}
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        setPublicStatusToSearch={setPublicStatusToSearch}
        setCategoryToSearch={setCategoryToSearch}
        setSubCategoryToSearch={setSubCategoryToSearch}
        onSearch={() => {
          getProducts();
          setOpenSearchDialog(false);
        }}
      />

      <ConfirmComponent
        confirmText="Are you sure?"
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        onConfirm={() => {
          deleteProductById();
          setOpenConfirmDialog(false);
        }}
      />
      <SizeBox h={100} />
    </div>
  );
};

export default ProductScreen;
