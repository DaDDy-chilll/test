import SizeBox from "@/components/SizeBox";
import Helper from "@/helpers";
import routes from "@/navigations/routes";
import Button from "@mui/material/Button";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatScreen = ()=>{

    const [sender,setSender] = useState("");

    const [reciever,setReciever] = useState("");

    const navigate = useNavigate();

    const onSenderChange = (event: ChangeEvent<HTMLInputElement>)=>{
        let text = event.currentTarget.value.toLocaleLowerCase();
        if(text.includes(" ")){
            text = text.replace(" ","_");
        }
        setSender(text);
    }

    const onRecieverChange = (event: ChangeEvent<HTMLInputElement>)=>{
        let text = event.currentTarget.value.toLocaleLowerCase();
        if(text.includes(" ")){
            text = text.replace(" ","_");
        }
        setReciever(text);
    }

    const startAction = ()=>{
        if(sender && reciever){
            Helper.navigate({navigate, path: routes.ADMIN.ChatRoom, state: {sender,reciever}}); 
        }
    }

    return <div className="flex flex-col bg-blue-gray-100 h-screen justify-center items-center">
        <div className="flex flex-col items-center bg-blue-gray-200 p-[60px] rounded-[30px]">
            <div className="text-[25px]">Welcome Chat Test!</div>
            <SizeBox h={20} />
            <div className="text-[14px]">Please Enter Your Name and You Partner Name</div>
            <SizeBox h={20} />
            <div className=" flex flex-row justify-start w-full">
                <label className="flex-[1]">Your Name</label>
                <input className="flex-[2]" value={sender} onChange={onSenderChange}/>
            </div>
            <SizeBox h={20} />
            <div className=" flex flex-row justify-start w-full">
                <label className="flex-[1]">Friend Name</label>
                <input className="flex-[2]" value={reciever} onChange={onRecieverChange}/>
            </div>
            <SizeBox h={50} />
            <Button variant="contained" onClick={startAction}>Start</Button>
        </div>
    </div>
}

export default ChatScreen;