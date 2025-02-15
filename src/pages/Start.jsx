import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import LLMSelector from "../components/LLMSelector.jsx";
import UserMessage from "../components/UserMessage.jsx";
import ModelMessage from "../components/ModelMessage.jsx";
import MessageBox from "../components/MessageBox.jsx";

function Start() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([{ name: "New Chat 1" }]);
  const [activeChat, setActiveChat] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-3.5");

  const models = ["Llama 2", "Mistral 7B"];

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMsg = { type: "user", text: newMessage };
    const modelResponse = { type: "model", text: "Thinking..." };

    setMessages([...messages, userMsg, modelResponse]);
    setNewMessage("");
  };

  return (
    <div className="h-screen flex bg-darkCol3 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        chats={chats}
        selectChat={(index) => {
          setActiveChat(index);
          setSidebarOpen(false);
        }}
        activeChat={activeChat}
        addChat={() => {
          setChats([{ name: `New Chat ${chats.length + 1}` }, ...chats]);
          setActiveChat(0);
        }}
      />

      <div className="flex flex-col h-full flex-grow relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-auto bg-transparent p-3 z-10 h-1/4">
          <LLMSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} models={models} />
        </div>

        <div className="flex flex-col flex-grow pt-20 relative h-1/2">
          <div
            className="flex flex-col flex-grow px-4 py-6 overflow-y-auto mx-5 no-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {messages.length === 0 ? (
              <div className="flex flex-col flex-grow items-center justify-center text-gray-400 gap-5">
                <h2 className="text-2xl font-semibold">What can I help with?</h2>
                <MessageBox value={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
              </div>
            ) : (
              messages.map((msg, index) =>
                msg.type === "user" ? (
                  <UserMessage key={index} message={msg.text} />
                ) : (
                  <ModelMessage key={index} message={msg.text} />
                )
              )
            )}
          </div>
        </div>
        {
            messages.length > 0 && (
            <div className=" bg-darkCol3 p-4 m-1">
                <div className="w-full flex justify-center">
                  <MessageBox value={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
                </div>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default Start;
