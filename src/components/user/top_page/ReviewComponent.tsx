import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Person2Icon from '@mui/icons-material/Person2';
import SizeBox from '@/components/SizeBox';
import {reviews, Review} from '@/const/user/reviews';
import { useState } from "react";
import SeeMoreComponent from "@/components/user/top_page/SeeMoreComponent";

const ReviewComponent = ()=> {
    const [seeMore,setseeMore] = useState<boolean>(false);

    return <div className="container mx-auto">
        <SizeBox h={50} />
        <div className="flex flex-row text-[30px] justify-center font-body pb-[50px]">お客様のレビュー</div>
        <div className="text-[15px] mb-[20px]">4レビュー</div>
        {
            reviews.filter(({id}:Review)=>seeMore?true:id<=3).map(({id,username,title,date,review,rating}:Review)=>{
                return <div key={id} className="p-[30px] mt-[15px] bg-[#3083ff] bg-opacity-10 rounded-[10px]">
                    <div className="flex flex-row items-center mb-[10px]">
                        <div>
                            <Avatar sx={{backgroundColor:"#cbd9f5"}}>
                                <Person2Icon/>
                            </Avatar>
                        </div>
                        <SizeBox w={10}/>
                        <div className="text-[15px] font-medium">{username}</div>
                    </div>
                    <div className="flex mb-[10px]">
                        <div className="mr-[10px]">
                            <Rating name="read-only" value={rating} readOnly />
                        </div>
                        <div className="min-w-[290px] text-[18px] font-bold">{title}</div>
                        <div className="text-[15px] font-medium">{date}</div>
                    </div>
                    <div className="text-[15px] font-medium leading-[38px]">{review}</div>
                </div>
            })
        }
        <div className="flex flex-row justify-center mt-[50px]">
            <SeeMoreComponent seeMore={seeMore} setseeMore={setseeMore} />
        </div>
        <SizeBox h={120} />
    </div>
}
export default ReviewComponent;