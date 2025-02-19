import { useEffect, useRef, forwardRef } from "react";
import UserMessage from "./UserMessage";
import ModelMessage from "./ModelMessage";

const Chat = forwardRef(({ chatId, messages, newMessage, aiResponse, authStatus }, ref) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [newMessage, aiResponse]);

  useEffect(() => {
    if (ref) {
      ref.current = chatContainerRef.current;
    }
  }, [ref]);


  return (
    <div
      ref={chatContainerRef}
      className="flex-grow overflow-y-auto custom-scrollbar p-16 mt-auto"
      style={{
        minHeight: "500px",
        maxHeight: "73vh",
        scrollbarWidth: "thin",
        scrollbarColor: "#4B5563 #1F2937",
      }}
    >
      {chatId && messages[chatId]?.length > 0 ? (
        <div className="flex flex-col gap-10">
          {messages[chatId].map((msg, index) => (
            <div key={index}>
              <div className="mt-5 mb-5">
                <UserMessage message={msg.userMessage} />
              </div>
              <div className="mt-5 mb-5">
                <ModelMessage message={msg.modelMessage} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 gap-5 h-full">
          <h2 className="text-2xl font-semibold">What can I help with?</h2>
          {!authStatus && (
            <h3 className="text-sm text-blue-500 font-medium">
              Login or Signup to start chatting
            </h3>
          )}
        </div>
      )}
    </div>
  );
});

export default Chat;
