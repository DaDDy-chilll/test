import React, { useRef, useState, useEffect } from "react";
import { Chat, Message } from "@/types/helperTypes";
import { User } from "@/types/helperTypes";
import MessageItem from "./MessageItem";
type ChatViewProps = {
  messages: Message[];
  user: User | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  selectedChat: Chat;
  limit: number;
};

const ChatView = ({
  messages,
  user,
  messagesEndRef,
  selectedChat,
}: ChatViewProps) => {
  const [showGoToBottom, setShowGoToBottom] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  /**
   * This Effect is used to handle the scroll event of the messages.
   * @author PSK
   */
  useEffect(() => {
    const handleScroll = () => {
      if (messagesRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = messagesRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
        setShowGoToBottom(!isNearBottom);
      }
    };

    const messagesDiv = messagesRef.current;
    if (messagesDiv) messagesDiv.addEventListener("scroll", handleScroll);

    return () => {
      if (messagesDiv) messagesDiv.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * This function is used to scroll to the bottom of the messages.
   * @author PSK
   */
  const scrollToBottom = () => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="overflow-y-auto px-3" ref={messagesRef}>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          currentUser={{ id: !!user?.id ? user?.id : null }}
          messagesEndRef={messagesEndRef}
          selectedChat={selectedChat}
        />
      ))}

      {showGoToBottom && (
        <div className="sticky bottom-5 w-full  z-50 text-center">
          <button
            className="bg-primaryColor text-white rounded-full p-2 shadow-md"
            onClick={scrollToBottom}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatView;
