import { ProductSubscribe} from "@/types/productsubscribe/productSubscribeRes";
import { Card } from "@mui/material";
import aws from "@/aws";
import SizeBox from "@/components/SizeBox";
import Helper from "@/helpers";
import { SubDetail } from "../OrderScreen";
import RemoveOrderInfoDialogComponent from "@/components/user/order/RemoveOrderInfoDialogComponent";
import ChangeOrderInfoDialogComponent from "@/components/user/order/ChangeOrderInfoDialogComponent";
import {useState } from "react";
import { format } from "date-fns";
import mutations from "@/networks/mutations";
import { getProductSubscribeUpdateErrRes } from "@/networks/mutations/user/productSubscribe/updateProductSubscribe";


interface SubscribeCartProps {
    productSubscribe: ProductSubscribe;
    subScribeTotal: (subscribes: ProductSubscribe[]) => {
        total: number;
        totalTax: number;
        subdetail: SubDetail[];
        getDetail: (id: number) => SubDetail;
    };
    subscribes: Array<ProductSubscribe>;
    removeAction: (removeProductSubId: number) => void;
}


const SubscribeCart = ({
   productSubscribe: {
    product_subscribe_id,
    product_id,
    product_qty,
    subscribe_kikan,
    product_name,
    img_url,
    schedule_delivery_date,
    min_sell_amt,
    max_sell_amt
   },
   subScribeTotal,
   subscribes,
   removeAction,
}:SubscribeCartProps)=>{

    const [openChangeDialog, setOpenChangeDialog] = useState<boolean>(false);
    const [openRemoveDialog, setOpenRemoveDialog] = useState<boolean>(false);
 
    /* Qty */
    const [qty, setQty] = useState<number | undefined>(product_qty);

    const [subKikan, setSubKikan] = useState<number>(subscribe_kikan);

    const [scheduleDeliDate, setScheduleDeliDate] = useState<string | undefined>(schedule_delivery_date);
    const [scheduleDeliDateErr, setScheduleDeliDateErr] = useState<string >();

    const updateAction = ()=>{
        setScheduleDeliDateErr("");
        mutations.user.productSubscribe.updateProductSubscribe(product_subscribe_id, {mode:2,product_qty:qty,subscribe_kikan:subKikan,schedule_delivery_date:scheduleDeliDate})
        .then((ans) => {
            console.log(ans.data);
            setOpenChangeDialog(false);
            setQty (ans.data.product_qty);
            setScheduleDeliDate(ans.data.schedule_delivery_date);
            setScheduleDeliDateErr("");
        })
        .catch((err:getProductSubscribeUpdateErrRes) => {
            console.log("aa" + err.errors?.schedule_delivery_date);
            console.log(err);
            if(err.errors?.schedule_delivery_date){
                setScheduleDeliDateErr(err.errors.schedule_delivery_date);
            }
        })
      
    }

    const onClose = ()=>{
        /* Qty */
        setQty(product_qty);
    }
      
    return (
        <>
        <Card key={Math.random()} className={`nav`}>
            {/* Image */}
            <div className="p-[25px] h-[200px]">
            <img src ={aws.s3.getUrl({key:img_url ? img_url : ""})} className="w-full h-full"/>
            </div>

            {/* Title */}
            <div className="text-[14px] font-bold pt-[15px] px-[30px]">
            {product_name}
            </div>
            <SizeBox h={20} />
            <div className="flex-1 text-[20px] font-bold pl-[30px]">
            {Helper.japaneseNumberFormat({
                number: subScribeTotal(subscribes).getDetail(product_id).includeTax
            })}
            <span className="text-[12px] font-medium -ml-[8px]">
                （税込）
            </span>
            </div>
            <SizeBox h={20} />
            <div className="text-[14px] px-[30px]">
            <p>
                次の配達日:{" "}
                <span
                onClick={() => setOpenChangeDialog(true)}
                className="text-primaryColor underline underline-offset-2 cursor-pointer"
                >
                    {format(new Date(schedule_delivery_date), "yyyy/MM/dd")}
                </span>
            </p>
            </div>
            <SizeBox h={20} />
            <div className="text-[14px] px-[30px]">
            <p>
                次の配達数量:{" "}
                <span
                onClick={() => setOpenChangeDialog(true)}
                className="text-primaryColor underline underline-offset-2 cursor-pointer"
                >
                {product_qty} 個
                </span>
            </p>
            </div>
            <SizeBox h={20} />
            <div className="px-[30px]">
            <button
                onClick={() => {
                    setOpenRemoveDialog(true);
                    // setRemoveSub(product_subscribe_id);
                }
                }
                className="py-3 text-center rounded-md bg-[#FF030380] w-full text-sm text-white"
            >
                定期購入から外す
            </button>
            </div>
            <SizeBox h={20} />
        </Card>


        <ChangeOrderInfoDialogComponent
            openDialog={openChangeDialog}
            setOpenDialog={setOpenChangeDialog}
            qty={qty}
            setQty={setQty}
            subKikan={subKikan}
            setSubKikan={setSubKikan}
            scheduleDeliDate={scheduleDeliDate}
            setScheduleDeliDate={setScheduleDeliDate}
            min={min_sell_amt}
            max={max_sell_amt}
            img_url = {img_url}
            product_name = {product_name}
            total = {subScribeTotal(subscribes).getDetail(product_id).includeTax}
            updateAction={updateAction}
            onClose={onClose}
            scheduleDeliDateErr = {scheduleDeliDateErr}
        />

        <RemoveOrderInfoDialogComponent
            openDialog={openRemoveDialog}
            setOpenDialog={setOpenRemoveDialog}
            setRemoveOpenDialog={setOpenRemoveDialog}
            scheduleDeliDate={scheduleDeliDate}
            qty={qty}
            img_url = {img_url}
            product_name = {product_name}
            total = {subScribeTotal(subscribes).getDetail(product_id).includeTax}
            removeSubId={product_subscribe_id}
            removeAction={removeAction}
        />
        
        </>
    )
}

export default SubscribeCart;