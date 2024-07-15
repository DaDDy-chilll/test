import { GlobalProps } from "@/App";

const TestingScreen = ({addToCartAction,increaseProductQty,decreaseProductQty,removeCarts,createOrders}:GlobalProps)=>{
    return <div>
        <div className="my-[100px]" 
            onClick={()=>addToCartAction({
                productId:22,
                qty:10
              })}
        >
            Testing
        </div>
        <div onClick={()=>createOrders()}>Create order</div>
        <div className="flex flex-row items-center justify-between w-[200px]">
            <div onClick={()=>increaseProductQty(22)} className="nav mt-[40px]  p-3 bg-blue-200 ">+</div>
            <div>Qty</div>
            <div onClick={()=>decreaseProductQty(22)}  className="nav mt-[40px]  p-3 bg-blue-200 ">-</div>
            
        </div>
        <div onClick={removeCarts}>Remove</div>
    </div>
}
export default TestingScreen;