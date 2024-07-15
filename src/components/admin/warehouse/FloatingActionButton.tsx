interface FloatingActionButtonProps {
    title?: string;
    titleStyle?: string;
    btnStyle?: string;
    onClick?: () => void;
}

const FloatingActionButton = ({title,titleStyle,btnStyle,onClick}:FloatingActionButtonProps) => {
    return <>
    <div className=" fixed bottom-[50px] right-[50px]">
        <div onClick={onClick} className={`flex flex-row w-[80px] h-[80px] bg-[#285DBD] text-white text-[20px] font-semibold justify-center items-center rounded-full nav drop-shadow-lg ${btnStyle}`}>
        <span className={titleStyle}>{ title}</span>
        </div>
    </div>
</>
}

export default FloatingActionButton;