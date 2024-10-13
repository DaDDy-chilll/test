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
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

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
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.11 13.6501L13.69 10.0601"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
