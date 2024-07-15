import aws from "@/aws";
import SizeBox from "@/components/SizeBox";
import Helper from "@/helpers";
import { Card } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {  useNavigate } from "react-router-dom";
import { Repurchase } from "../OrderScreen";
import Routes from "@/navigations/routes";


interface OrderProductHistoryProps  {
    repurchases : Array<Repurchase>;
}

const OrderProductHistory = ({
    repurchases,
}:OrderProductHistoryProps) => {
    const navigate = useNavigate();
    return <>
    
              <div>
                <div className="grid grid-cols-3 gap-[20px]" 
                onClick={()=>navigate(Routes.USER.PRODUCT_DETAIL)}>
                  {repurchases.map(
                    ({
                     prdouct_name,
                     title,
                     qty,
                     price,
                     photoUrl
                    }: Repurchase) => {
                      return (
                        <Card key={Math.random()} className={`mb-[30px] nav `}>
                          {/* Image */}
                          {/* <div className={`${productBgColor} p-[25px] h-[200px]`}> */}
                          <div className="p-[25px] h-[200px]">
                            <img src ={aws.s3.getUrl({key:photoUrl ? photoUrl : ""})} className="w-full h-full"/>
                          </div>

                          {/* Name*/}

                          <div className="text-[14px] font-bold pt-[15px] px-[30px]">
                            {prdouct_name}
                          </div>

                          {/* Title */}
                          <div className="text-[14px] font-bold pt-[15px] px-[30px]">
                            {title} X {qty} 本
                          </div>
                          <SizeBox h={20} />
                          {/* Price */}
                          <div className="flex flex-row items-center pb-[35px]">
                            {/* price */}
                            <div className="flex-1 text-[20px] font-bold pl-[30px]">
                              {Helper.japaneseNumberFormat({ number: price ? price : 0 })}{" "}
                              <span className="text-[12px] font-medium -ml-[8px]">
                                （税込）
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex flex-row justify-center items-center rounded-md bg-primaryColor px-4 py-2 mr-[30px]"
                          >
                              <ShoppingCartIcon
                                style={{ width: 20, height: 20 }}
                                className="text-white"
                              />
                            </div>
                            <SizeBox h={40} />
                          </div>
                        </Card>
                      );
                    }
                  )}
                </div>
               
              </div>
            
    </>

}
export default OrderProductHistory;