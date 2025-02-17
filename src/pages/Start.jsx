import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { logout } from "../store/authSlice";
import LLMSelector from "../components/LLMSelector.jsx";
import UserMessage from "../components/UserMessage.jsx";
import ModelMessage from "../components/ModelMessage.jsx";
import MessageBox from "../components/MessageBox.jsx";
import AccountBtn from "../components/AccountBtn.jsx";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import AuthBtns from "../components/AuthBtns.jsx";

function Start() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([{ id: Date.now().toString(), name: "New Chat 1", messages: [] }]);
  const [activeChat, setActiveChat] = useState(chats[0]?.id);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-3.5");

  const Logout = async () => {
    await authService.logout();
    localStorage.removeItem("authStatus");
    localStorage.removeItem("userData");
    dispatch(logout());
    navigate("/login");
  };

  const models = ["GPT-3.5", "Llama 2", "Mistral 7B"];

  const addChat = () => {
    const newChatId = Date.now().toString();
    const newChat = { id: newChatId, name: `New Chat ${chats.length + 1}`, messages: [] };

    setChats([newChat, ...chats]);
    setMessages((prev) => ({ ...prev, [newChatId]: [] }));

    navigate(`/chat/${newChatId}`);
  };

  const sendMessage = () => {
    if(!authStatus)return
    let startChatId;
    if (!newMessage.trim() || !chatId) {
      console.log("No message or chatId");
      if (!chatId) {
        startChatId = chats[0]?.id;
        navigate(`/chat/${startChatId}`);
      } else return;
    }

    const userMsg = { type: "user", text: newMessage };
    const modelResponse = { type: "model", text: "Thinking..." };

    setMessages((prev) => ({
      ...prev,
      [chatId || startChatId]: [...(prev[chatId || startChatId] || []), userMsg, modelResponse],
    }));

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId || startChatId
          ? { ...chat, messages: [...(chat.messages || []), userMsg, modelResponse] }
          : chat
      )
    );

    setNewMessage("");
  };

  const authStatus = localStorage.getItem("authStatus");

  return (
    <div className="h-screen flex bg-darkCol3 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        chats={chats}
        selectChat={(id) => {
          navigate(`/chat/${id}`);
          setSidebarOpen(false);
        }}
        addChat={addChat}
        activeChat={chatId || activeChat}
      />

      <div className="flex flex-col h-full flex-grow relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-auto bg-transparent p-3 z-10">
          <LLMSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} models={models} />
        </div>
        {
          authStatus?(
            <div className="absolute top-0 right-0 p-3 z-10">
              <AccountBtn onLogout={Logout} />
            </div>
          ):(
            <div className="absolute top-0 right-0 p-3 z-10">
              <AuthBtns/>
            </div>
          )
        }

        <div className="flex flex-col flex-grow pt-20 px-4 py-6 mx-5">
          <div
            className="flex-grow overflow-y-auto custom-scrollbar p-10 mt-auto"
            style={{
              minHeight: "500px",
              maxHeight: "73vh",
              scrollbarWidth: "thin",
              scrollbarColor: "#4B5563 #1F2937",
            }}
          >
            {chatId && messages[chatId]?.length > 0 ? (
              <div className="flex flex-col">
                {messages[chatId].map((msg, index) =>
                  msg.type === "user" ? (
                    <UserMessage key={index} message={msg.text} />
                  ) : (
                    <ModelMessage key={index} message={msg.text} />
                  )
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 gap-5 h-full">
                <h2 className="text-2xl font-semibold">What can I help with?</h2>
                {!authStatus && (
                  <h3 className="text-sm text-blue-500 font-medium">Login or Signup to start chatting</h3>
                )}
              </div>
            )}
          </div>

          <div className="mt-auto flex justify-center">
            <MessageBox value={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
