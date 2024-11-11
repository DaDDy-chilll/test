/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateDoc } from "firebase/firestore";
import { colors } from "@/constants/color";
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
import {
  ChatList,
  AppointmentModel,
  ChatHeader,
  ChatView,
  ChatInput,
  ChatSkeleton,
} from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Chat, Message } from "@/types/helperTypes";
import { jp } from "@/lang/jp";
import useChat from "@/hooks/useChat";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store";
import { Helmet } from "react-helmet-async";

let MESSAGES_LIMIT = 30;

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navChat = location.state;
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAppointmentModelOpen, setIsAppointmentModelOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    chats,
    isLoading,
    refetch,
    refetching: isRefetching,
    isEnd,
  } = useChat({ id: user?.id });


  /**
   * Sets the title of the chat screen using the dispatch function.
   * @author PSK
   */
  useEffect(() => {
    dispatch(setTitle(jp.chat));
  }, [dispatch]);

  /**
   * Handles the selection of a chat.
   * @author PSK
   * @param {Chat} chat - The selected chat.
   * @returns {Function} Unsubscribe function to stop listening to messages.
   */
  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    const unsubscribe = fetchMessages(chat.id);
    return () => unsubscribe();
  };

  /**
   * Fetches messages for a given chat ID.
   * @author PSK
   * @param {string} chatId - The ID of the chat.
   * @returns {Function} Unsubscribe function to stop listening to messages.
   */
  const fetchMessages = (chatId: string) => {
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("chat_id", "==", chatId),
      orderBy("timestamp", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      async (querySnapshot) => {
        const fetchedMessages: Message[] = [];
        const updatePromises: Promise<void>[] = [];

        querySnapshot.forEach((doc) => {
          const messageData = doc.data() as Message;
          fetchedMessages.push({ ...messageData, id: doc.id });

          if (
            messageData.sender_id !== Number(`2${user?.id}`) &&
            !messageData.read
          ) {
            updatePromises.push(updateDoc(doc.ref, { read: true }));
          }
        });

        await Promise.all(updatePromises);
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Error fetching messages:", error);
      },
    );

    return unsubscribe;
  };

  /**
   * Sends a new message.
   * @author PSK
   */
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

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
        { merge: true },
      );
      setNewMessage("");
      fetchMessages(selectedChat.id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  /**
   * Scrolls the chat view to the bottom.
   * @author PSK
   */
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });

  /**
   * Scrolls to the bottom whenever messages change.
   * @author PSK
   */
  useEffect(() => scrollToBottom(), [messages]);

  /**
   * Selects the chat from navigation state if available.
   * @author PSK
   */
  useEffect(() => {
    const chat = chats.find((chat) => chat.id === navChat?.id);
    if (chat) handleChatSelect(chat);
  }, [navChat,!isLoading]);

  return (
    <>
      <Helmet>
        <title>{jp.chat} - Japan Job</title>
      </Helmet>
      <motion.main
        variants={chatVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" w-full h-[calc(100vh-65px)] grid grid-cols-8 grid-rows-9 gap-0.5 px-3 relative"
      >
        {/* User Lists View */}
        <div className="bg-gray-100 col-span-2 row-span-9 overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col gap-y-4 p-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <ChatSkeleton key={index} />
                ))}
            </div>
          ) : (
            <ChatList
              chats={chats}
              onSelectChat={handleChatSelect}
              selectedChat={selectedChat}
              refetch={refetch}
              isRefetching={isRefetching}
              isEnd={isEnd}
            />
          )}
        </div>

        {/* Header View */}
        <div className="bg-gray-100 col-start-3 col-end-9 row-start-1 row-end-2 relative">
          {selectedChat && (
            <ChatHeader
              selectedChat={selectedChat}
              setIsAppointmentModelOpen={setIsAppointmentModelOpen}
            />
          )}
        </div>

        {/* Chat View */}
        <div className="bg-gray-100 col-start-3 col-end-9   row-start-2 flex flex-col justify-end row-end-9 relative overflow-hidden border-l-2  border-r-2 border-gray-300 border-opacity-30">
          {selectedChat ? (
            messages.length > 0 ? (
              <ChatView
                messages={messages}
                user={user}
                messagesEndRef={messagesEndRef}
                selectedChat={selectedChat}
                limit={MESSAGES_LIMIT}
              />
            ) : (
              <div className="flex flex-col justify-center items-center h-full ">
                <svg
                  width="80px"
                  height="80px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
                    fill={colors.third}
                  />
                  <path
                    d="M8 11H8.009M11.991 11H12M15.991 11H16"
                    stroke={colors.third}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-400 text-normal mt-3">
                  {jp.noMessagesYet}
                </p>
              </div>
            )
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
              setIsAppointmentModelOpen={setIsAppointmentModelOpen}
              userId={Number(selectedChat?.jobfinder_id)}
              jobId={Number(selectedChat?.job_id)}
            />
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
};

const chatVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default ChatScreen;
