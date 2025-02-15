import React from "react";
import { FaTimes, FaBars, FaPlus } from "react-icons/fa";

function Sidebar({ isOpen, toggleSidebar, chats, selectChat, activeChat, addChat }) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-[#121111] border-r border-[#524f4f] transition-all duration-300
          ${isOpen ? "w-full sm:w-1/2 md:w-1/5" : "w-0 md:w-1/5"} overflow-hidden z-40 md:relative`}
      >
        <div className="p-5 text-white flex flex-col h-full">
          <button className="text-gray-300 text-2xl self-end md:hidden" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          <div className="flex items-center justify-between mb-4 md:mt-1 mt-5">
            <h2 className="text-xl font-bold">Chats</h2>
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
              onClick={() =>{
                isOpen=true
                addChat()
              }}
            >
              <FaPlus />
            </button>
          </div>

          <div
            className="flex-grow overflow-y-auto max-h-[75vh]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#292929 #1a1919",
            }}
          >
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`p-3 rounded cursor-pointer mb-2 transition-all
                    ${activeChat === index ? "bg-gray-700 text-white" : "hover:bg-gray-800 text-gray-300"}`}
                onClick={() => selectChat(index)}
              >
                {chat.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-[#2E8BFF] text-white p-3 rounded-full shadow-lg md:hidden"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      )}

      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
