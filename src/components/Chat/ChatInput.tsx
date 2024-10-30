type ChatInputProps = {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
};

const ChatInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}: ChatInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewMessage(e.target.value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && handleSendMessage();

  return (
    <div className="flex items-center gap-2 w-full h-full px-4 py-3 border-4 border-gray-300 rounded-sm border-opacity-30 shadow-md">
      <input
        type="text"
        placeholder="Write a message..."
        className="w-full p-2 rounded-md bg-gray-300 text-sm"
        value={newMessage}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-primaryColor text-sm text-white px-10 py-2 rounded-md hover:bg-primaryColor/80"
        onClick={handleSendMessage}
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
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
