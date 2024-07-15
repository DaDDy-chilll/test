import SizeBox from "@/components/SizeBox";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

type ChatMessage = {
    messages: Array<string>;
    myMessage: boolean;
}

type Message = {
    sender: string;
    content: string;
    channel: string;
    timestamp: string;
}

const ChatRoom = ()=>{

    const location = useLocation();
    const {sender,reciever} = location.state;

    const [message,setMessage] = useState<string>()
    const [chats,setChats] = useState<Array<ChatMessage>>([]);

    const [stompClient,setStompClient] = useState<Stomp.Client>();

    const sendMessageAction = async ()=>{
        if(message){
            const chatMessage = {
              sender: sender,
              content: message,
              channel: reciever
            }
            try{
                await stompClient?.send("/app/chat", {}, JSON.stringify(chatMessage));
                if(chats.length>0 && chats[chats.length-1].myMessage){
                    const updatedChats = chats.map((chat,index)=>{
                        if(index === chats.length-1){
                            chat.messages = [...chat.messages,message];
                        }
                        return chat;
                    });
                    setChats(updatedChats);
                }else{
                    const newMessge: ChatMessage = {
                        messages: [message],
                        myMessage: true
                    }
                    setChats([...chats,newMessge]);
                }
                setMessage("");
            }catch{
              console.log("error");
            }
        }
    }

    // websocket config useEffect
    useEffect(()=>{
        const socket = new SockJS(import.meta.env.VITE_EC2_SOCKET);
        const client = Stomp.over(socket);
        client.connect({},()=>{
            client.subscribe("/topic/"+sender,(message)=>{
                const recieveMessage:Message = JSON.parse(message.body);
                if(chats.length>0 && !chats[chats.length-1].myMessage){
                    const updateChats = chats.map((chat,index)=>{
                        if(index === chats.length-1){
                            chat.messages = [...chat.messages,recieveMessage.content];
                        }
                        return chat;
                    })
                    setChats(updateChats);
                }else{
                    const newMessge: ChatMessage = {
                        messages: [recieveMessage.content],
                        myMessage: false
                    }
                    setChats([...chats,newMessge]);
                }
            });
        });
        
        setStompClient(client);

        return ()=> {
            if(client){
                if( client.ws.readyState > 0 ){
                    client.disconnect(()=>{});
                }
            }
        }
    },[chats]);

    const enterAction = (keyboardEvent: KeyboardEvent)=>{
        if(keyboardEvent.key=== "Enter"){
            sendMessageAction();
        }
    }

    useEffect(()=>{
        window.addEventListener("keydown",enterAction);

        return ()=>{
            window.removeEventListener("keydown",enterAction);
        }
    })

    return (
        <div className="flex flex-col h-screen items-center">
            <div className="text-[25px] my-[30px]">Private Chat Room</div>
            <div className="flex-1 flex flex-col w-[40%] bg-white p-4 rounded-[15px] overflow-scroll">
                <div className="flex-1">
                {
                    chats.map(({messages,myMessage})=>{
                        return (
                            <div key={Math.random()} className={`${myMessage?"flex flex-col items-end":"flex flex-col items-start"}`}>
                                <div className={`${myMessage?"w-fit rounded-full rounded-r-none text-white px-2 bg-pink-300":"w-fit rounded-full rounded-l-none text-white px-2 bg-blue-300"}`}>{myMessage?sender:reciever}</div>
                                {
                                    messages.map((message)=>{
                                        return (
                                            <div key={Math.random()} className="">{message}</div>
                                        );
                                    })
                                }
                            </div>
                        )
                    })
                }
                </div>
                
                <div className="flex flex-row mt-4">
                    <input value={message} onChange={(event)=>setMessage(event.currentTarget.value)} className=" border-[1px] pl-[8px] border-gray-300 rounded-full flex-1"/>
                    <Button onClick={sendMessageAction}>Send</Button>
                </div>
            </div>
            <SizeBox h={20}/>
        </div>
    );
}

export default ChatRoom;