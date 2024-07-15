import SizeBox from "@/components/SizeBox";

interface FloatingActionButtonConfirmProps {
    onClick?: ()=>void;
    onCancel?: ()=>void;
}
const FloatingActionButtonConfirm = ({onClick,onCancel}:FloatingActionButtonConfirmProps)=>{
    return <>
        <div className=" fixed bottom-[50px] right-[50px]">
            <div onClick={onCancel} className={`flex flex-row w-[80px] h-[80px] bg-[#FF0303] text-white text-[16px] justify-center items-center rounded-full nav drop-shadow-lg`}>
                <span>キャンセル</span>
            </div>
            <SizeBox h={25}/>
            <div onClick={onClick} className={`flex flex-row w-[80px] h-[80px] bg-[#285DBD] text-white text-[20px] font-semibold justify-center items-center rounded-full nav drop-shadow-lg`}>
                <span>確定</span>
            </div>
        </div>
    </>
}

export default FloatingActionButtonConfirm;