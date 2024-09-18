import React, { useEffect, useState, useRef, useCallback } from "react";
import Layout from '@/layouts/Layout';
import { motion } from 'framer-motion';
import UserItem from '@/components/Chat/UserItem';
import { jp } from '@/lang/jp';
import MessageItem from '@/components/Chat/MessageItem';
import {
  getDocs,
  query,
  where,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { userRef, db } from "@/firebaseConfig";
import { getRoomId } from "@/utils/common";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Message {
  messageId: string;
  chat_id: string;
  content: string;
  read: boolean;
  sender_id: number;
  timestamp: Date;
}

interface ChatInfo {
  userId: number;
}


const ChatScreen = () => {
  const {token,user} = useSelector((state: RootState) => state.auth);
const [userId,setUserId] = useState<number | null>(null);
const [messages, setMessages] = useState<any>([]);
const [newMessage, setNewMessage] = useState("");
const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
const [hasMore, setHasMore] = useState(true);
const [isLoading, setIsLoading] = useState(false);
const [oldestMessageTimestamp, setOldestMessageTimestamp] = useState<string>(
  new Date().toISOString()
);
const chatRef = useRef<HTMLDivElement>(null);

  const users = [
    {
      id:1,
      avatar: 'https://via.placeholder.com/150',
      name: 'John Doe',
      message: 'Hello, how are you?',
    },
    {
      id:2,
      avatar: 'https://via.placeholder.com/150',
      name: 'John Doe',
      message: 'Hello, how are you?',
    },
    {
      id:3,
      avatar: 'https://via.placeholder.com/150',
      name: 'John Doe',
      message: 'Hello, how are you?',
    },
  ];

  const handleUserClick = (id: number) => {
    console.log('User clicked', id);
    setUserId(id);
    setChatInfo({
      userId: id,
    });
  }

 // Fetch messages from Firestore
 useEffect(() => {
  if (!userId) {
    return;
  }
  // createRoomIfNotExists();

  const roomId = getRoomId(user?.email, userId);
  // const docRef = doc(db, "rooms", roomId);
  const messageRef = collection(db, "messages");
  const q = query(messageRef,where("chat_id", "==", roomId), orderBy("createdAt", "desc"));

  const unsub = onSnapshot(q, (snapshot) => {
    const allMessages = snapshot.docs.map((doc) => doc.data());
    setMessages([...allMessages]);
  });

  return () => unsub();
}, [userId]);




 // Send a new message
 const sendMessage = async () => {
  if (newMessage.trim() === "") return;
  const newMsg = {
    chat_id: chatInfo?.userId || "",
    content: newMessage,
    sender_id: user?.email,
    timestamp: Timestamp.now(),
    read: false,
  };


  try {
    await addDoc(collection(db, "messages"), newMsg);
    setNewMessage("");
    console.log('success');
  } catch (error) {
    console.log('error');
    console.error("Error sending message: ", error);
  }
};

console.log(messages);

  return (
    <Layout>
      <motion.div
      variants={chatVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className=' w-full h-[calc(100vh-65px)] grid grid-cols-8 grid-rows-9 gap-0.5 p-3'>

        {/* User Lists View */}
        <div className='bg-gray-100 col-span-2 row-span-9 '>
          {users.map((user,index) => (
            <UserItem key={index} user={user} handleClick={handleUserClick} />
          ))}
        </div>

        {/* Header View */}
        <div className='bg-gray-100 col-start-3 col-end-9 row-start-1 row-end-2'>
          <div className='flex items-center justify-between w-full h-full px-4 py-3'>
            <h1 className='text-normal font-bold'>Name</h1>
            <button className='bg-gray-500 text-sm text-white px-3 py-2 rounded-md'>Interview Schedule</button>
          </div>
        </div>

        {/* Chat View */}
        <div className='bg-gray-100 col-start-3 col-end-9 row-start-2 row-end-9 relative'>
          <div className="bg-red-100 w-full h-full flex flex-col-reverse gap-2 justify-start">
          {messages.sort((a:any,b:any) => a.timestamp - b.timestamp).map((message:any, index:any) => (
              <MessageItem key={index} message={message.content} currentUser={user} />
            ))}
          </div>
          <div className='absolute top-2 right-2 flex items-center gap-2'>
            <button className='bg-secondaryColor text-sm text-white px-3 py-2 rounded-md'>{jp.aiChat}</button>
            <button className='bg-secondaryColor text-sm text-white px-3 py-2 rounded-md'>{jp.adminHelp}</button>
          </div>
        </div>

        {/* Input View */}
        <div className='bg-gray-100 col-start-3 col-end-9 row-start-9 row-end-10'>
          <div className='flex items-center gap-2 w-full h-full px-4 py-3'>
            <input type="text" placeholder='Write a message...' className='w-full p-2 rounded-md bg-gray-300 text-sm' value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}/>
            <button className='bg-primaryColor text-sm text-white px-10 py-2 rounded-md' onClick={sendMessage}>Send</button>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

const chatVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
export default ChatScreen;