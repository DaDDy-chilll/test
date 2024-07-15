import { Divider } from "@mui/material";
import Button from '@mui/material/Button';

interface MenuComponentProp {
    title: string;
    actionList: Array<ActionListProp>;
}

interface ActionListProp {
    text: string;
    action: ()=>void;
    disable: boolean;
}

const MenuComponent = ({title,actionList}:MenuComponentProp)=> {
    
    return <div className="flex flex-col w-full">
        {/* Title */}
        <div className="text-[20px] mb-[10px] opacity-80">
            {title}
        </div>
        
        {/* Ruller */}
        <Divider className=""/>
        
        {/* Action List */}
        <div className="grid grid-cols-2 mt-[30px] gap-y-[12px] gap-x-[18px]">
           {
                actionList.map(({text,action,disable})=>{
                    return <Button key={Math.random()} onClick={action} variant="contained" size="large" style={{backgroundColor: "#285DBD",opacity: disable? 0.7: 1,height: 50}}>
                        {text}
                    </Button>
                })
           }
        </div>
    </div>
}

export default MenuComponent;