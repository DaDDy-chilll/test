import vector from "@/assets/user/top_page/vector1.svg";

const SectionVectorComponent = ()=>{
    return <div className="flex flex-row ml-[125px]">
        {/* Image Section */}
        <div className="">
            <img src={vector} />
        </div>
        {/* Double Divider */}
        <div className="flex-1">
            <div className="bg-[#808080] opacity-50 h-[1px] flex flex-row mt-[40px]"></div>
            <div className="bg-[#808080] opacity-50 h-[1px] flex flex-row ml-[110px] mt-[27px]"></div>
        </div>
    </div>
}

export default SectionVectorComponent;