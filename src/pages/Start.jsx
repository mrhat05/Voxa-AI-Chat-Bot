import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { logout } from "../store/authSlice";
import LLMSelector from "../components/LLMSelector.jsx";
import MessageBox from "../components/MessageBox.jsx";
import AccountBtn from "../components/AccountBtn.jsx";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import AuthBtns from "../components/AuthBtns.jsx";
import appwriteService from "../appwrite/database.js";
import CircularLoader from "../components/CircularLoader.jsx";
import model from "../lib/gemini.js"
import Chat from '../components/Chat.jsx'

function Start() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatId } = useParams();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [aiResponse,setAiResponse]=useState("")
  const [selectedModel, setSelectedModel] = useState("GPT-3.5");
  const models = ["GPT-3.5", "Llama 2", "Mistral 7B"];
  const [loader,setLoader] = useState(false);
  const [loader2,setLoader2] = useState(false);
  const [chatIdState,setChatIdState]=useState(chatId)
  const [activeChat,setActiveChat]=useState(chatIdState)
  const chatRef = useRef(null);
  // const {currMsgs,setCurrMsgs}=useState([])

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(()=>{
    setActiveChat(chatIdState)
  },[chatIdState])

  useEffect(() => {
    if (!userData) return;
    
    setLoader(true);

    async function fetchData() {
    await appwriteService.getUserChats(userData.userID).then((response) => {
      if (response ) {
        setChats(response);
        let loadedMessages = {};
        response.forEach((chat,ind) => {
          let currChatId=chat.$id
          loadedMessages[currChatId] = chat.messages || [];
          if(ind==response.length-1){
            setChatIdState(currChatId)
            navigate(`/chat/${currChatId}`)
          }
        });
        setMessages(loadedMessages);
      }
    });
    setLoader(false)
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
      setActiveChat(newChat.$id)
    }
    setLoader2(false);
  };

  const sendMessage = async () => {
    if (!userData || !newMessage.trim()) return;


    let chatIdToUse = chatId;
    const timestamp = Date.now();
    const prompt = newMessage;

    const chat = model.startChat();
    let result = await chat.sendMessageStream(prompt);

    let accumulatedText = "";

    let updatedMessages = [...(messages[chatIdToUse] || [])];

    const newChatMessage = {
        userMessage: prompt,
        modelMessage: "",
        timestamp,
    };

    updatedMessages.push(newChatMessage);
    setMessages((prev) => ({ ...prev, [chatIdToUse]: updatedMessages }));
    setNewMessage(""); 

    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;

        updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            modelMessage: accumulatedText,
        };

        setMessages((prev) => ({ ...prev, [chatIdToUse]: [...updatedMessages] }));
        setAiResponse(accumulatedText);
    }

    setMessages((prev) => ({ ...prev, [chatIdToUse]: [...updatedMessages] }));

    if (chats.length === 0) {
        const newChat = await appwriteService.createChat(userData.userID, updatedMessages);
        if (newChat) {
            setChats([newChat, ...chats]);
            setMessages((prev) => ({ ...prev, [newChat.$id]: updatedMessages }));
            chatIdToUse = newChat.$id;
            navigate(`/chat/${newChat.$id}`);
        } else {
            console.error("Failed to create new chat");
            return;
        }
    } else {
        await appwriteService.updateChat(chatIdToUse, userData.userID, updatedMessages);
    }
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
        loader2 ?
          <div className={`fixed top-0 left-0 h-full bg-[#121111] border-r border-[#524f4f] transition-transform duration-300 transform w-[80%] sm:w-[50%] md:w-[20%] lg:w-[18%] xl:w-[15%] md:translate-x-0 md:relative md:min-w-[250px] z-50`}>
            <div className="flex items-center justify-center h-full">
            <CircularLoader />
            </div>
          </div>
        :(
          <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          chats={chats}
          selectChat={(id) => {
            navigate(`/chat/${id}`);
            setActiveChat(id)
            setSidebarOpen(false);
          }}
          addChat={addChat}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          scrollToBottom={scrollToBottom}
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
          <Chat chatId={chatId} messages={messages} newMessage={newMessage} aiResponse={aiResponse}  authStatus={authStatus} ref={chatRef}/>

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
