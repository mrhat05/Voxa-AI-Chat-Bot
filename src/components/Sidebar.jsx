import React from "react";
import { FaBars, FaTimes, FaPlus } from "react-icons/fa";

function Sidebar({ isOpen, toggleSidebar, chats = [], selectChat, addChat, activeChat }) {
  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="fixed top-5 left-5 z-50 text-white bg-gray-800 p-2 rounded-full md:hidden"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar + Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={toggleSidebar}
      ></div>


      <div
        className={`fixed top-0 left-0 h-full bg-[#121111] border-r border-[#524f4f] transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-[80%] sm:w-[50%] md:w-[20%] lg:w-[18%] xl:w-[15%] md:translate-x-0 md:relative md:min-w-[250px] z-50`}
      >
        <div className="p-5 text-white flex flex-col h-full">

          <button className="text-gray-300 text-2xl self-end md:hidden mb-3" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          {/* Chat List Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Chats</h2>
            <button className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full" onClick={addChat}>
              <FaPlus />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto max-h-[75vh]">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded cursor-pointer mb-2 hover:bg-gray-800 text-gray-300 ${
                  activeChat === chat.id ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  selectChat(chat.id);
                  toggleSidebar();
                }}
              >
                {chat.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
