import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { GlobalProps } from "@/App";
// import { Review } from "@/models/dataModel";
import ReviewMenu from "@/components/admin/review/ReviewMenu";
// import { reviewList } from "@/const/admin/review/review_list";
import { ProductReviewResponse } from "@/types/product_review/product_review_response";
import ReviewSearchComponent,{ReviewSearchActionType} from "@/components/admin/review/ReviewSearchComponent";
// import ReviewSearchComponent from "@/components/admin/review/ReviewSearchComponent";
import mutations from "@/networks/mutations";
// import { keyframes } from "@emotion/react";
import aws from "@/aws";
// import Helper from "@/helpers";
import { ProductReview } from "@/types/product_review/product_review";
import ConfirmComponent from "@/components/admin/settings/ConfirmComponent";
import CustomPaginationTableWithPageNo from "@/components/admin/common/CustomPaginationTableWithPageNo";
// import { stringify } from "querystring";
// import { error } from "console";

const ReviewScreen = ({ setIsAdmin }: GlobalProps) => {
  const [confirmText, setConfirmText] = useState<string>("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [pReviewID, setpReviewID] = useState<number>();

  const [productReviewList, setReviewList] = useState<Array<ProductReview>>([]);

  const breadcrubItems = [
    {
      title: "メニュー",
      action: () => navigate(Routes.ADMIN.HOME),
    },
    {
      title: "商品レビュー",
      action: () => {},
    },
  ];

  const searchProductReviewAction = ({customer,product,date,title,review,shoninsha_id,rating,approver_name} : ReviewSearchActionType) => {
    mutations.admin.productReview.get({customer,product,date,title,review,shoninsha_id,rating,approver_name})
    .then((ans)=> {
      setReviewList(ans.data);
      console.log(ans.data);
      setOpenSearchDialog(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const changeApproveStatusAction = (productReviewId: number) => {
    mutations.admin.productReview.shoninProductReview(productReviewId)
    .then((ans)=> {
      const updateProductReview = productReviewList.map((review) => {
        if(review.product_review_id == productReviewId){
           return ans.data;
        }
        return review;
      });
        setReviewList(updateProductReview);
        setOpenConfirmDialog(false);
        console.log(ans.data);
    })
    .catch((error) => {
      console.log(error);
    })

  }

  useEffect(()=>{
    if(productReviewList.length == 0){
      mutations.admin.productReview.get()
      .then((ans) =>{
        console.log("Product Review List >>>>>>>>", ans.data.toString);
        setReviewList(ans.data);
      })
      .catch((error) => {
        console.log("Product Review List Error >>>>>> " + error);
      })
    }
  })

  // const shoninProductReview = (id: number) => {
  //   if(confirm("Are you sure?") == true){
  //     mutations.admin.shoninProductReview(id)
  //     .then((res) => {
  //       console.log(res.data);
  //       let product_review_list: any[] = [];
  //       productReviewList.map((product_review)=>{
  //         if(product_review.product_review_id != res.data.product_review_id){
  //           product_review_list.push(product_review);
  //         }
  //         else{
  //           product_review_list.push(res.data);
  //         }
  //       })
  //       setProductReviewList(product_review_list);
  //     })
  //     .catch((err: getShoninProductReviewErrRes) => console.log(err));
  //   }
  // }

  return (
    <div>
      <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

      <SizeBox h={95} />

      <ReviewMenu title="商品レビュー" openDialog={setOpenSearchDialog} />
      <SizeBox h={10} />

      <CustomPaginationTableWithPageNo
        data={productReviewList}
        title={
          <thead className="">
            <tr className="bg-[#F6F7F8]">
              <th
                scope="col"
                className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                No
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                日付
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[40px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                顧客
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[250px] border-black  border-t-[1px] border-b-[1px] border-opacity-20"
              >
                商品
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                レビュータイトル
              </th>
              <th
                scope="col"
                className="px-2 py-4 w-[300px] border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                レビュー内容
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                ランク
              </th>
             <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                ステータス
              </th>
              <th
                scope="col"
                className="px-2 py-4 border-black border-t-[1px] border-b-[1px] border-opacity-20"
              >
                承認者
              </th>
            </tr>
          </thead>
        }
        renderBody={({
          product_review_id,
          customer_code,
          customer_name,
          product_name,
          product_code,
          product_title,
          product_created_at,         
          image_url,
          title,
          // product_desc,
          review,
          rank,
          approver_id,
          approver_name,
        }: ProductReviewResponse,index:number,currentPage: number, itemsPerPage: number) => (
          <tr
            onClick={() => {}}
            key={Math.random()}
            className="nav bg-white text-gray-700 text-sm border-black border-b-[1px] border-opacity-20"
          >
            <td scope="row" className="px-6 py-4 ">
             {(index + 1) + (currentPage - 1) * itemsPerPage}
            </td>
            <td scope="row" className="px-6 py-4 ">
              {product_created_at}
            </td>
            <td scope="row" className="px-6 py-4 ">
              <p>#{customer_code}</p>
              <p>{customer_name}</p>
            </td>
            <td className="px-[8px] py-4 ">
            {image_url && <img src={aws.s3.getUrl({ key: image_url })} className="h-[100px] w-[100px] object-contain" />}
              <div className="flex flex-col justify-between ml-[8px] text-sm space-y-4">
                <div className="font-bold">{product_name}</div>
                <div>{product_title}</div>
                <div>{product_code}</div>
              </div>
            </td>
            <td className="px-2 py-4 ">{title}</td>
            <td className="px-2 py-4">{review}</td>
            <td className="px-2 py-4">
              <div className="text-center">{rank == 1 && "＊"}{rank == 2 && "＊＊"}{rank == 3 && "＊＊＊"}{rank == 4 && "＊＊＊＊"}{rank == 5 && "＊＊＊＊＊"}</div>
            </td>
            <td className="px-2 py-4">
              <div className="text-center">
                {approver_id > 0 ? (
                  <span className="underline text-green-500 underline-offset-2" 
                  onClick={() => {
                    setConfirmText("未承認します。");
                    setOpenConfirmDialog(true);
                    setpReviewID(product_review_id);
                  }}>承認済</span>
                ) : (
                  <span className="underline text-textBlue underline-offset-2"
                  onClick={() => {
                    setConfirmText("承認済します。");
                    setOpenConfirmDialog(true);
                    setpReviewID(product_review_id);
                  }}>
                    未承認
                  </span>
                )}
              </div>
            </td>
            <td className="px-2 py-4"><div className="text-center">{approver_name}</div></td>
          </tr>
        )}
      />
      {/* 検索 */}
      <ReviewSearchComponent
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
        // onSearch={() => setOpenSearchDialog(false)}
        onSearch ={searchProductReviewAction}
      />

    <ConfirmComponent
        confirmText={confirmText}
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        changeApproveStatusAction = {changeApproveStatusAction}
        pReviewId={pReviewID}
      />
      <SizeBox h={100} />
    </div>   
  );
};

export default ReviewScreen;
