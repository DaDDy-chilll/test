import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Dispatch, SetStateAction } from 'react';

interface SeeMoreProps  {
    seeMore: boolean;
    setseeMore: Dispatch<SetStateAction<boolean>>;
}
const SeeMoreComponent = ({seeMore,setseeMore}:SeeMoreProps)=>{
    return <div onClick={()=>setseeMore(!seeMore)} className="flex flex-col justify-center shadow-md items-center border-[1px] border-black border-opacity-20 w-[100px] h-[100px] rounded-full text-black/20 nav">
        <ArrowForwardIosIcon fontSize="large" className={`${seeMore?"-rotate-90":"rotate-90"}`} />
    </div>
}

export default SeeMoreComponent;