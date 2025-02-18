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
import { useDispatch } from "react-redux";
import AuthBtns from "../components/AuthBtns.jsx";
import appwriteService from "../appwrite/database.js";
import CircularLoader from "../components/CircularLoader.jsx";

function Start() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatId } = useParams();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-3.5");
  const models = ["GPT-3.5", "Llama 2", "Mistral 7B"];
  const [loader,setLoader] = useState(false);
  const [loader2,setLoader2] = useState(false);

  useEffect(() => {
    if (!userData) return;
    
    setLoader(true);

    async function fetchData() {
    await appwriteService.getUserChats(userData.userID).then((response) => {
      if (response ) {
        setChats(response);
        let loadedMessages = {};
        response.forEach((chat) => {
          loadedMessages[chat.$id] = chat.messages || [];
        });
        
        setMessages(loadedMessages);
      }
    });
    setLoader(false);
  }
  fetchData()
  }, []);


  const addChat = async () => {
    if (!userData) return;
    setLoader2(true);
    const newChat = await appwriteService.createChat(userData.userID, []);
    if (newChat) {
      setChats([...chats,newChat]);
      setMessages((prev) => ({[newChat.$id]: [], ...prev }));
      navigate(`/chat/${newChat.$id}`);
    }
    setLoader2(false);
  };

  const sendMessage = async () => {
    if (!userData || !newMessage.trim()) return;

    let chatIdToUse = chatId;
    const timestamp = Date.now();
    const newChatMessage = {
        userMessage: newMessage,
        modelMessage: "Thinking...",
        timestamp,
    };

    if (chats.length === 0) {
        const newChat = await appwriteService.createChat(userData.userID, [newChatMessage]);
        if (newChat) {
            setChats([newChat, ...chats]);
            setMessages((prev) => ({ ...prev, [newChat.$id]: [newChatMessage] }));
            chatIdToUse = newChat.$id;
            navigate(`/chat/${newChat.$id}`);
        } else {
            console.error("Failed to create new chat");
            return;
        }
    } else {
        const updatedMessages = [...(messages[chatIdToUse] || []), newChatMessage];
        setMessages((prev) => ({
            ...prev,
            [chatIdToUse]: updatedMessages,
        }));

        setChats((prev) =>
            prev.map((chat) =>
                chat.$id === chatIdToUse ? { ...chat, messages: updatedMessages } : chat
            )
        );

        await appwriteService.updateChat(chatIdToUse, userData.userID, updatedMessages);
    }

    setNewMessage("");
};


  const Logout = async () => {
    await authService.logout();
    localStorage.removeItem("authStatus");
    localStorage.removeItem("userData");
    dispatch(logout());
    navigate("/login");
  };

  const authStatus = localStorage.getItem("authStatus");

  return (
    <div>
      {
    loader?(
      <div className="h-screen bg-darkCol3 overflow-hidden flex justify-center items-center">
        <CircularLoader/>
      </div>
    ):(
    <div className="h-screen flex bg-darkCol3 overflow-hidden">
      {
        loader2 ?(
          <div className={`fixed top-0 left-0 h-full bg-[#121111] border-r border-[#524f4f] transition-transform duration-300 transform w-[80%] sm:w-[50%] md:w-[20%] lg:w-[18%] xl:w-[15%] md:translate-x-0 md:relative md:min-w-[250px] z-50`}>
            <div className="flex items-center justify-center h-full">
            <CircularLoader />
            </div>
          </div>
        ):(
          <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          chats={chats}
          selectChat={(id) => {
            navigate(`/chat/${id}`);
            setSidebarOpen(false);
          }}
          addChat={addChat}
          activeChat={chatId}
        />
  
        )
      }
      <div className="flex flex-col h-full flex-grow relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-auto bg-transparent p-3 z-10">
          <LLMSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} models={models} />
        </div>
        {authStatus ? (
          <div className="absolute top-0 right-0 p-3 z-10">
            <AccountBtn onLogout={Logout} />
          </div>
        ) : (
          <div className="absolute top-0 right-0 p-3 z-10">
            <AuthBtns />
          </div>
        )}

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
                {messages[chatId].map((msg, index) => (
                  <div key={index}>
                    <UserMessage message={msg.userMessage} />
                    <ModelMessage message={msg.modelMessage} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 gap-5 h-full">
                <h2 className="text-2xl font-semibold">What can I help with?</h2>
                {!authStatus && <h3 className="text-sm text-blue-500 font-medium">Login or Signup to start chatting</h3>}
              </div>
            )}
          </div>

          <div className="mt-auto flex justify-center">
            <MessageBox value={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
    )
  }
    </div>
  );
}

export default Start;
