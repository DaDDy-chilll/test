import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  query,
  where,
  addDoc,
  collection,
  orderBy,
  Timestamp,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import ChatList from "../components/Chat/ChatList";
import Loading from "@/components/ui/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AppointmentModel from "@/components/Chat/AppointmentModel";
import { Chat, Message } from "@/types/helperTypes";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatView from "@/components/Chat/ChatView";
import ChatInput from "@/components/Chat/ChatInput";
import { AnimatePresence } from "framer-motion";
import { jp } from "@/lang/jp";
import useChat from "@/hooks/useChat";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { Helmet } from "react-helmet-async";
// company id
// const currentUser = {
//   id: 1,
// };
// const parsedUser = {
//   id: 21,
// };

// const parsedId = parsedUser.id;

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navChat = location.state;
  // const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminTime, setAdminTime] = useState<moment.Moment | null>(null);
  const [meetingTime, setMeetingTime] = useState<moment.Moment | null>(null);
  const [isAppointmentModelOpen, setIsAppointmentModelOpen] = useState(false);
  // const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
  // const [newJobTitle, setNewJobTitle] = useState("");
  // const queryClient = useQueryClient();
  // const [chatId, setChatId] = useState();
  // const [selectedJobId, setSelectedJobId] = useState<number | 1>(1);
  const { chats, isLoading } = useChat({ id: user?.id });
  useEffect(() => {
    dispatch(setTitle(jp.chat));
  }, [dispatch]);
  // fetch chat room
  // useEffect(() => {
  //   setIsLoading(true);
  //   const chatsRef = collection(db, "chats");
  //   const q = query(
  //     chatsRef,
  //     where("company_id", "==", user?.id), //company id
  //     orderBy("last_message_timestamp", "desc")
  //   );

  //   const unsubscribe = onSnapshot(
  //     q,
  //     (querySnapshot) => {
  //       const fetchedChats: Chat[] = [];
  //       querySnapshot.forEach((doc) => {
  //         fetchedChats.push({ id: doc.id, ...doc.data() } as Chat);
  //       });
  //       setChats(fetchedChats);
  //       setIsLoading(false);
  //     },
  //     (error) => {
  //       console.error("Error fetching chats:", error);
  //       setError("Failed to fetch chats. Please try again.");
  //     }
  //   );

  //   return () => unsubscribe();
  // }, []);

  //Handle Chat Select

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    const unsubscribe = fetchMessages(chat.id);
    return () => unsubscribe();
  };

  //fetch Messages
  const fetchMessages = (chatId: string) => {
    setError(null);
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("chat_id", "==", chatId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedMessages: Message[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages. Please try again.");
      }
    );

    // Return the unsubscribe function
    return unsubscribe;
  };

  //send message
  // Modify the handleSendMessage function:
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    setError(null);

    const messageData = {
      chat_id: selectedChat.id,
      sender_id: Number("2" + user?.id),
      content: newMessage.trim(),
      timestamp: Timestamp.now(),
      read: false,
    };

    try {
      await addDoc(collection(db, "messages"), messageData);
      await setDoc(
        doc(db, "chats", selectedChat.id),
        {
          last_message: newMessage.trim(),
          last_message_timestamp: Timestamp.now(),
        },
        { merge: true }
      );
      setNewMessage("");
      // Remove this line as it's no longer needed:
      fetchMessages(selectedChat.id);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  //fetch jobs
  // const { data: jobs, error: jobsError } = useQuery({
  //   queryKey: ["jobs"],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `https://api.japanjob.exbrainedu.com/v1/job`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch jobs");
  //     }
  //     return response.json();
  //   },
  // });

  // console.log(jobs);

  //fetch users
  // const {
  //   data: users,

  //   error: usersError,
  // } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `https://api.japanjob.exbrainedu.com/v1/user/all`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch users");
  //     }
  //     return response.json();
  //   },
  // });

  // Fetch chat information
  // useEffect(() => {
  //   const fetchChatInfo = async () => {
  //     const chatDocRef = doc(db, "chats", chatId);
  //     const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
  //       if (docSnapshot.exists()) {
  //         const chatData = docSnapshot.data();
  //         setChatInfo({
  //           jobId: chatData.job_id,
  //           companyId: chatData.company_id?.toString() || "",
  //           jobfinderId: chatData.jobfinder_id,
  //           jobTitle: chatData.job_title || "Unknown Job",
  //           companyName: chatData.company_name || "Unknown Company",
  //           companyLogo: chatData.company_logo || null,
  //           jobfinderName: chatData.jobfinder_name || "Unknown Jobfinder",
  //         });
  //       }
  //     });

  //     return () => unsubscribe();
  //   };
  //   fetchChatInfo();
  // }, [chatId]);

  // if (error || usersError) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-red-500 text-xl">
  //         {error ||
  //           usersError?.message ||
  //           "An error occurred. Please try again."}
  //       </p>
  //     </div>
  //   );
  // }

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);
  useEffect(() => {
    if (navChat) handleChatSelect(navChat);
  }, [navChat]);
  return (
    <>
           <Helmet>
      <title>{jp.chat} - Japan Job</title>
    </Helmet>
      {isLoading && (
        <Loading isLoading={isLoading} className="h-[calc(100vh-68px)]" />
      )}
      <motion.div
        variants={chatVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-[calc(100vh-65px)] grid grid-cols-8 grid-rows-9 gap-0.5 p-3 relative"
      >
        {/* User Lists View */}
        <div className="bg-gray-100 col-span-2 row-span-9 overflow-hidden">
          <ChatList
            chats={chats}
            onSelectChat={handleChatSelect}
            selectedChat={selectedChat}
          />
        </div>

        {/* Header View */}
        <div className="bg-gray-100 col-start-3 col-end-9 row-start-1 row-end-2">
          {selectedChat && (
            <ChatHeader
              selectedChat={selectedChat}
              setIsAppointmentModelOpen={setIsAppointmentModelOpen}
            />
          )}
        </div>

        {/* Chat View */}
        <div className="bg-gray-100 col-start-3 col-end-9  row-start-2 flex flex-col justify-end row-end-9 relative overflow-hidden border-l-2 border-gray-300 border-opacity-30 border-r-2 border-gray-300 border-opacity-30">
          {selectedChat ? (
            <ChatView
              messages={messages}
              user={user}
              messagesEndRef={messagesEndRef}
              selectedChat={selectedChat}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-xl">{jp.startMessage}</p>
            </div>
          )}
        </div>

        {/* Input View */}
        <div className="bg-gray-100 col-start-3 col-end-9 row-start-9 row-end-10">
          {selectedChat && (
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          )}
        </div>

        {/* Appointment Model */}
        <AnimatePresence mode="wait">
          {isAppointmentModelOpen && (
            <AppointmentModel
              key="isAppointmentModelOpen"
              setAdminTime={setAdminTime}
              setMeetingTime={setMeetingTime}
              setIsAppointmentModelOpen={setIsAppointmentModelOpen}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const chatVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default ChatScreen;
