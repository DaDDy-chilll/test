import Br from "@/components/BrComponent";
import SizeBox from "@/components/SizeBox";
import bankCard from "@/assets/user/cart/bank_card.jpg";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Cart, Product } from "@/models/dataModel";
import Helper from "@/helpers";
import { productList } from "@/const/admin/product/product_list";
type CartPaymentProps ={
    createOrder: ()=>void;
    carts:Array<Cart>;
}
const CartPaymentComponent = ({createOrder,carts}:CartPaymentProps)=>{
    
    const calcTaxAndTotal = ()=>{
        let total = 0;
        let tax = 0;
        carts.map(({productId,qty}:Cart)=>{
            const {sellPrice}:Product = productList.filter((p:Product)=>p.productId===productId)[0];
            
            total += sellPrice * qty;
            tax += sellPrice * qty * 0.1;
            total += sellPrice * qty * 0.1;
        })
        return {total,tax}
    }
    
    return <div>
        <div className="text-[30px] font-bold text-[#000] text-opacity-[0.8]">支払い</div>
        <SizeBox h={30} />
        <div className="flex flex-row justify-center">
            <div className="flex-[1]">
                <div className="flex border-[1px] border-[#D9D9D9] rounded-[5px] bg-[#fff] pl-[25px] pr-[30px] py-[20px]">
                    <div className="flex text-[14px] font-medium color-[#000] text-opacity-[0.8] pr-[25px]">配送先</div>
                    <div className="flex-[1] text-[14px] font-medium color-[#000] text-opacity-[0.8]">日本 〒124-0025, 東京都 葛飾区, 西新小岩2-1-1, 920, kyaw win thu様</div>
                    <div className="flex px-[30px] text-center text-[14px] font-medium underline text-[#3083FF] nav">編集</div>
                </div>
                <SizeBox h={10} />
                <div className="flex border-[1px] border-[#D9D9D9] rounded-[5px] bg-[#fff] pl-[25px] pr-[30px] py-[20px]">
                    <div className="flex text-[14px] font-medium color-[#000] text-opacity-[0.8] pr-[25px]">請求先</div>
                    <div className="flex-[1] text-[14px] font-medium color-[#000] text-opacity-[0.8]">日本 〒124-0025, 東京都 葛飾区, 西新小岩2-1-1, 920, kyaw win thu様</div>
                    <div className="flex px-[30px] text-center text-[14px] font-medium underline text-[#3083FF] nav">編集</div>
                </div>
                <SizeBox h={40} />
                <div className="border-[#D9D9D9] border-t-[0.5px] border-opacity-[0.3] pt-[25px]">
                    <div className="text-[20px] font-bold text-[#000] text-opacity-[0.8] mb-[15px]">カード情報</div>
                    <div className="flex border-[1px] border-[#D9D9D9] rounded-[5px] bg-[#fff] pl-[25px] pr-[30px] py-[20px]">
                        <img src={bankCard} alt="カード情報" />
                    </div>
                    <SizeBox h={20} />
                    <div className="w-full">
                        <TextField className="w-full bg-[#fff] text-[14px] font-medium text-[#000] text-opacity-[0.8]" id="outlined-basic" label="カード番号" variant="outlined" />
                        <SizeBox h={20} />
                        <TextField className="w-full bg-[#fff] text-[14px] font-medium text-[#000] text-opacity-[0.8]" id="outlined-basic" label="カードの名義人" variant="outlined" />
                        <SizeBox h={20} />
                        <div className="flex flex-row">
                            <TextField className="flex-1 bg-[#fff] text-[14px] font-medium text-[#000] text-opacity-[0.8]" id="outlined-basic" label="有効期限（月/年）" variant="outlined" />
                            <SizeBox w={20} />
                            <TextField className="flex-1 bg-[#fff] text-[14px] font-medium text-[#000] text-opacity-[0.8]" id="outlined-basic" label="セキュリティコード" variant="outlined" />
                        </div>
                    </div>
                </div>
            </div>
            <SizeBox w={35} />
            <div className="flex-1">
                <div className="bg-[#285DBD] rounded=[5px] bg-opacity-[0.06]">
                    
                    {
                        carts.map(({productId,qty}:Cart)=>{
                            const [product]:Array<Product> = productList.filter(({productId:p})=>p === productId);
                            return <div key={Math.random()} className="material-divider flex flex-row items-center p-[25px]">
                            <div className="flex mr-[15px]">
                                <img src={product.productPhoto[0]} alt="製品詳細" className="w-[70px]" />
                            </div>
                            <div className="flex-[1] text-[13px] font-bold text-[#000] text-opacity-[0.8]">
                                {product.productName}
                            <span className="block text-[11px] font-medium pt-[15px]">
                                {product.productTitle}
                            </span></div>
                            <div className="flex ml-[25px] text-[13px] font-medium text-[#000] text-opacity-[0.8]">
                                {Helper.japaneseNumberFormat({number:qty*product.sellPrice})}
                            </div>
                        </div>
                        })
                    }
                    
                    <div className="px-[25px]">
                        <Br />
                        <div className="flex flex-row justify-between pt-[10px]">
                            <div className="flex-1 text-[13px] fotn-medium">小計（税金10%）</div>
                            <div className="flex-1 text-right text-[13px] fotn-medium">
                                {
                                    Helper.japaneseNumberFormat({number: calcTaxAndTotal().tax})
                                }
                            </div>
                        </div>
                        <SizeBox h={10} />
                        <Br />
                        <div className="flex flex-row justify-between pt-[10px]">
                            <div className="flex-1 text-[13px] fotn-medium">配送</div>
                            <div className="flex-1 text-right text-[13px] fotn-medium">¥ 0</div>
                        </div>
                        <SizeBox h={10} />
                        <Br />
                        <div className="flex flex-row justify-between pt-[10px] pb-[35px]">
                            <div className="flex-1 text-[20px] fotn-medium">合計</div>
                            <div className="flex-1 text-right text-[20px] fotn-medium">
                                {
                                    Helper.japaneseNumberFormat({number: calcTaxAndTotal().total})
                                }
                            </div>
                        </div>
                        <Button onClick={createOrder} variant="contained" size="large" style={{width: "100%",backgroundColor: "#285DBD",height: 50, fontSize: 14, fontWeight: "bold", color: "#fff"}}>注文する</Button>
                        <SizeBox h={30} />
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
}

export default CartPaymentComponent;