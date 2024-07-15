
// import { useEffect } from 'react';
// import Stomp from "stompjs";
// import SockJS from 'sockjs-client';

// const S3TestingScreen = ()=>{

//     useEffect(() => {
//         // Create a WebSocket client
//         const socket = new SockJS(import.meta.env.VITE_EC2_SOCKET); // Replace with your WebSocket endpoint
    
//         // Create a STOMP client over the WebSocket connection
//         const stompClient = Stomp.over(socket);
    
//         // Connect to the WebSocket server
//         stompClient.connect({}, () => {
//           console.log('Connected to WebSocket server');
    
//           // Subscribe to a destination (topic or queue)
//           stompClient.subscribe('/topic/messages', () => {
//             // Handle incoming messages
//             console.log('Received message:', "hello World");
//           });
    
//           // Send a message
//           stompClient.send('/app/sendMessage', {}, JSON.stringify({ content: 'Hello, WebSocket!' }));
//         });
    
//         // Cleanup function
//         return () => {
//           // Disconnect from the WebSocket server when the component unmounts
//           stompClient.disconnect(() => {
//             console.log('Disconnected from WebSocket server');
//           });
//         };
//       }, []);

//     return <div>Hello Amie</div>
// }

// export default S3TestingScreen;

import { useEffect, useState } from "react"
import Stomp from "stompjs";
import SockJS from "sockjs-client";

type Message = {
  sender: string;
  content: string;
  channel: string;
}
const S3TestingScreen = ()=>{
  const [myName,setMyName] = useState("");
  const [reciever,setReciever] = useState("");

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState<Array<Message>>([]);

  const [stompClient,setStompClient] = useState<Stomp.Client>();

  useEffect(()=>{

    const socket = new SockJS(import.meta.env.VITE_EC2_SOCKET);
    // const socket = new SockJS(import.meta.env.VITE_LOCAL_SOCKET);
    
    const client = Stomp.over(socket);

    client.connect({},()=>{
      client.subscribe("/topic/"+myName,(message)=>{
        const recieveMessage:Message = JSON.parse(message.body);
        setMessages((messages)=>[...messages,recieveMessage])
        console.log([...messages,recieveMessage]);
      })
    });

    setStompClient(client);
    return ()=> {
      client.disconnect(()=>{});
      console.log("test")
    }
    
  },[myName]); // [myName,messages,setMessage,setStompClient]

  const sendMessage = async () => {
    if(message){
      // console.log("send");
      const chatMessage = {
        sender: myName,
        content: message,
        channel: reciever
      }
      // console.log(chatMessage);
      try{
        await stompClient?.send("/app/chat", {}, JSON.stringify(chatMessage));
        setMessage("");
      }catch{
        console.log("error");
      }
    }
  }
  return <div>
    <div>
      <label htmlFor="">My Name</label>
      <input value={myName} onChange={(event)=>setMyName(event.target.value)} />
    </div>
    <div>
      <label htmlFor="">My Reciever</label>
      <input value={reciever} onChange={(event)=>setReciever(event.target.value)} />
    </div>
    {
      messages.map(({sender,content})=>{
        return <div key={Math.random()}>{sender}: {content}</div>
      })
    }
    <div>
      <input value={message} onChange={(event)=>setMessage(event.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
}
export default S3TestingScreen;


// // import { GlobalProps } from "@/App";
// // import aws from "@/aws";
// // import SizeBox from "@/components/SizeBox";
// // import { useState } from "react";

// // const S3TestingScreen = ({ mutations }: GlobalProps) => {
// //   // const keys = [];
// //   const [photos, setPhotos] = useState<Array<string>>(
// //     JSON.parse(localStorage.getItem("photos") || "[]")
// //   );
// //   const [files, setFiles] = useState<FileList | null>();

// //   const fileUploadActionClientSite = () => {
// //     if (files?.length) {
// //       aws.s3.upload(files).then((ans) => {
// //         const updatedPhotos = [...photos, ...ans];
// //         setPhotos(updatedPhotos);
// //         localStorage.setItem("photos", JSON.stringify(updatedPhotos));
// //       });
// //     }
// //   };

// //   const fileUploadActionSecure = () => {
// //     if (files?.length) {
// //       mutations.admin.awsStroageS3.putObjects(files).then((ans) => {
// //         const updatedPhotos = [...photos, ...ans];
// //         console.log(ans);

// //         setPhotos(updatedPhotos);
// //         localStorage.setItem("photos", JSON.stringify(updatedPhotos));
// //       });
// //     }
// //   };

// //   const fileDeleteAction = (key: string) => {
// //     aws.s3.delete({ keys: [key] }).then(() => {
// //       const updatedPhotos = photos.filter((existKey) => existKey != key);
// //       setPhotos(updatedPhotos);
// //       localStorage.setItem("photos", JSON.stringify(updatedPhotos));
// //     });
// //   };

// //   const fileDeleteActionSecure = (key: string) => {
// //     mutations.admin.awsStroageS3.deleteObjects([key]).then(() => {
// //       const updatedPhotos = photos.filter((existKey) => existKey != key);
// //       setPhotos(updatedPhotos);
// //       localStorage.setItem("photos", JSON.stringify(updatedPhotos));
// //     });
// //   };

// //   const allFileDeleteActionSecure = (keys: Array<string>) => {
// //     mutations.admin.awsStroageS3.deleteObjects(keys).then((ans) => {
// //       const updatedPhotos = photos.filter(
// //         (existKey) =>
// //           ans.filter((deletedKey) => deletedKey === existKey).length === 0
// //       );
// //       setPhotos(updatedPhotos);
// //       localStorage.setItem("photos", JSON.stringify(updatedPhotos));
// //     });
// //   };

// //   return (
// //     <div className="container mx-auto">
// //       {/* Title */}
// //       <div className="text-center my-[20px] text-[25px]">
// //         AWS S3 File Upload
// //       </div>
// //       <div className="flex flex-row items-center">
// //         Upload File:
// //         <input
// //           type="file"
// //           multiple
// //           onChange={(event) => setFiles(event.target.files)}
// //         />
// //         <div
// //           onClick={fileUploadActionClientSite}
// //           className="bg-green-300 text-green-800 py-[10px] px-[20px] rounded-lg nav"
// //         >
// //           Upload From Client
// //         </div>
// //         <SizeBox w={20} />
// //         <div
// //           onClick={fileUploadActionSecure}
// //           className="bg-green-300 text-green-800 py-[10px] px-[20px] rounded-lg nav"
// //         >
// //           Upload With Presign Url
// //         </div>
// //         <SizeBox w={20} />
// //         <div
// //           onClick={() => photos.length && allFileDeleteActionSecure(photos)}
// //           className="bg-red-300 text-red-800 py-[10px] px-[20px] rounded-lg nav"
// //         >
// //           Delete All
// //         </div>
// //       </div>
// //       <div className="grid grid-cols-6 gap-8 mt-[25px]">
// //         {photos.map((key) => {
// //           return (
// //             <div key={Math.random()} className=" relative">
// //               <img src={aws.s3.getUrl({ key })} className="h-[200px]" />
// //               <div
// //                 onClick={() => fileDeleteActionSecure(key)}
// //                 className="absolute right-0 top-0 bg-red-500 rounded-full px-[10px] text-white nav"
// //               >
// //                 delete
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default S3TestingScreen;
