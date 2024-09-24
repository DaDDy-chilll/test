
type ChatInputProps = {
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: () => void
}

const ChatInput = ({newMessage, setNewMessage, handleSendMessage}: ChatInputProps) => {
  return (
    <div className="flex items-center gap-2 w-full h-full px-4 py-3 border-4 border-gray-300 rounded-sm border-opacity-30 shadow-md">
    <input
      type="text"
      placeholder="Write a message..."
      className="w-full p-2 rounded-md bg-gray-300 text-sm"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
    />
    <button
      className="bg-primaryColor text-sm text-white px-10 py-2 rounded-md"
      onClick={handleSendMessage}
    >
      Send
    </button>
  </div>
  )
}

export default ChatInput