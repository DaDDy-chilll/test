import SizeBox from "@/components/SizeBox";
import Helper from "@/helpers";
import { OrderForCustomerRes } from "@/types/order/order";
import { Card, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import aws from "@/aws";


const OrderItemComponent = () => {

  const location = useLocation();
  const {orderDetail} : {orderDetail : OrderForCustomerRes } = location.state;

  return (
    <Card className="pb-[20px] bg-white rounded-[5px] border-black border-[1px] border-opacity-20">
      {/* Title */}
      <div className="w-full flex space-x-24 items-center h-[60px] px-[30px] bg-[#E2EDFF] border-black border-b-[1px] border-opacity-20">
        <p className="font-semibold">{orderDetail.order_detail.length} items</p>
      </div>
      <SizeBox h={30} />
      <div className="px-10">
        {
          orderDetail.order_detail.map((od)=>{
            return <div>
              <div key={Math.random()} className="flex items-center space-x-4 py-4">
              {
                od.products?.product_photos.filter((p)=>{
                  return p.main_photo === 1;
                }).map(({img_url}, index)=> index === 0 ? <img src={aws.s3.getUrl({key:img_url})} 
                                                                             width="200px"
                                                                              height="200px"/> : <span></span>)
              }
              <div className="space-y-4">
                  <p className="text-sm text-textBlue">{od.products?.product_name}</p>
                  <p className="text-sm">{od.products?.title}</p>
                  <p className="text-sm">
                    {Helper.japaneseNumberFormat({
                      number: Math.round(od.products?.price? od.products.price * (1 + od.products?.tax / 100):0),
                    })}
                    <span className="text-sm ml-2">(税込)</span>
                  </p>
              </div>
              </div>
              <Divider />
            </div>
          })
        }
         
      </div>
      <SizeBox h={20} />
    </Card>
  );
};

export default OrderItemComponent;
