import Br from "@/components/BrComponent";
import SizeBox from "@/components/SizeBox";
import Radio from '@mui/material/Radio';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";
import { Cart, Product } from "@/models/dataModel";
import { productList } from "@/const/admin/product/product_list";
import Helper from "@/helpers";
import { useState } from "react";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

type CartDeliveryProps ={
    setTab: Dispatch<SetStateAction<number>>;
    carts:Array<Cart>;
}

const CartDeliveryAddress = ({setTab,carts}:CartDeliveryProps)=>{

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

    const [isCheck,setIsCheck] = useState<boolean>(false);

    return <div className="bg-white">
        <div className="text-[30px] font-bold">配送先設定</div>
        <SizeBox h={20} />
        <div className="flex flex-row">
            <div className="flex-1">
                <div className="border-[1px] rounded-[5px] border-[#D9D9D9] bg-[#fff] px-[25px] py-[15px]">
                    <div>
                        <div onClick={()=>setIsCheck(true)} className="flex flex-row items-center nav">
                            {
                                isCheck?
                                <RadioButtonCheckedIcon className="text-blue-500"/>
                                :<RadioButtonUncheckedIcon />
                            }
                            <div className="ml-[7px]">Kyaw Win Thu</div>
                        </div>
                        <div className="w-[300px] text-[13px] font-medium leading-[26px] pl-[30px]">124-0033 Tokyo-to, 葛飾区西新小岩2-1-1 西新小岩リバーハイツ920号室</div>
                        <div className="text-[13px] font-medium pl-[30px]">電話：039498493344</div>
                        <SizeBox h={30} />
                        <Br />
                    </div>
                    <div className="my-[10px]">
                        <div onClick={()=>setIsCheck(false)} className="flex flex-row items-center nav">
                            {
                                isCheck?
                                <RadioButtonUncheckedIcon />
                                :<RadioButtonCheckedIcon className="text-blue-500"/>
                            }
                            <div className="ml-[7px]">Ni Ni Aung</div>
                        </div>
                        <div className="w-[300px] text-[13px] font-medium leading-[26px] pl-[30px]">124-0033 Tokyo-to, 葛飾区西新小岩2-1-1 西新小岩リバーハイツ920号室</div>
                        <div className="text-[13px] font-medium pl-[30px]">電話：039498493344</div>
                        <SizeBox h={30} />
                        <Br />
                    </div>
                    <div className="pl-[30px] text-[14px] font-bold">
                        <Button key={Math.random()} onClick={()=> {}} variant="contained" size="large" style={{width: 195,backgroundColor: "#285DBD",height: 50}}>
                            配送先新規追加
                        </Button>
                    </div>
                </div>
                <SizeBox h={35} />
                <Br />
                <SizeBox h={30} />
                <div className="text-[20px] font-bold">請求先住所</div>
                <div className="border-[1px] rounded-[5px] border-[#D9D9D9] bg-[#fff] px-[25px] py-[15px]">
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="配送先住所と同じ" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>

            <SizeBox w={30} />

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
                        <Button onClick={()=>setTab(3)} variant="contained" size="large" style={{width: "100%",backgroundColor: "#285DBD",height: 50, fontSize: 14, fontWeight: "bold", color: "#fff"}}>支払いへ</Button>
                        <SizeBox h={30} />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
}

export default CartDeliveryAddress;