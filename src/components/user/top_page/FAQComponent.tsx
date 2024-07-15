import SizeBox from "@/components/SizeBox";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from "@mui/material";


const FAQComponent = ()=>{

    const faqAccordion = [
        {
            number: "01",
            title: "ナノ技術は何ですか？"
        },
        {
            number: "02",
            title: "他のサプリメントと何が違いますか？"
        },
        {
            number: "03",
            title: "単品とセットで飲んだ場合、何が違いますか？"
        },
        {
            number: "04",
            title: "副作用はありますか？"
        },
        {
            number: "05",
            title: "子供飲んで良いですか？"
        },
        {
            number: "06",
            title: "妊娠さんは飲めますか？"
        },
    ];

    return <div className="bg-gradient-to-r from-[#faf9f9] to-[#ffffff] pt-[60px] pb-[100px]S">
        <div className="container mx-auto">
            <div className="flex text-[35px] font-bold items-center text-opacity-80"><span className="inline-block w-[80px] h-[3px] border-t-[3px] border-[#000] border-opacity-80 mr-[8px]"></span>FAQ</div>

            {
                faqAccordion.map(({number, title},index) => {
                    return <div key={index} className="flex flex-row items-center bg-[#7AB8E7] bg-opacity-10 rounded-[10px] py-[20px] pr-[20px] pl-[40px] mb-[15px]">
                    <div className="flex text-[15px] font-bold text-opacity-80 pr-[40px]">{number}</div>
                    <div className="flex-[2] text-[15px] font-bold text-opacity-80">{title}</div>
                    <div className="flex flex-row justify-center items-center bg-[#3083ff] rounded-full w-[20px] h-[20px] text-[#fff] font-bold">
                        <KeyboardArrowDownIcon style={{width: 20, height: 20}} />
                    </div>
                </div>
                })   
            }
            <Button className="w-full h-[70px]" variant="contained" size="large" style={{backgroundColor: "#285DBD"}}>
                すべて見る
            </Button>
            <SizeBox h={100} />
        </div>
    </div>
}

export default FAQComponent;