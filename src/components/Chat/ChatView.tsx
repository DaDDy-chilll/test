import React from 'react'
import { Message,  } from '@/types/helperTypes'
import { User } from '@/types/user'
import MessageItem from './MessageItem'
import {jp} from '@/lang/jp'

type ChatViewProps = {
    messages: Message[]
    user: User | null
    messagesEndRef: React.RefObject<HTMLDivElement>
}

const ChatView = ({messages, user, messagesEndRef}: ChatViewProps) => {
  return (
    <>
     <div className="overflow-y-auto px-3">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                currentUser={{ id: !!user?.id ? user?.id : 0 }}
                messagesEndRef={messagesEndRef}
              />
            ))}
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <button className="bg-secondaryColor text-sm text-white px-3 py-2 rounded-md">
              {jp.aiChat}
            </button>
            <button className="bg-secondaryColor text-sm text-white px-3 py-2 rounded-md">
              {jp.adminHelp}
            </button>
          </div>
    </>
  )
}

export default ChatView