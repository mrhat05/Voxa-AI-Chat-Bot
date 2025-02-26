import React from "react";
import { FaBars, FaTimes, FaPlus } from "react-icons/fa";

function Sidebar({ isOpen, toggleSidebar, chats = [], selectChat, addChat, activeChat, scrollToBottom }) {
  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-5 left-5 z-50 text-white bg-gray-800 p-2 rounded-full md:hidden"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#121111] border-r border-[#524f4f] transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-[80%] sm:w-[50%] md:w-[20%] lg:w-[18%] xl:w-[15%] md:translate-x-0 md:relative md:min-w-[250px] z-50`}
      >
        <div className="p-5 text-white flex flex-col h-full">

          {/* Close Button for Mobile */}
          <button className="text-gray-300 text-2xl self-end md:hidden mb-3" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Chats</h2>
            <button className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full" onClick={addChat}>
              <FaPlus />
            </button>
          </div>

          {/* Chat List with Dark Slim Scrollbar */}
          <div className="flex-grow overflow-y-auto max-h-[75vh] custom-scrollbar">
            {chats.slice().reverse().map((chat, ind) => (
              <div
                key={ind}
                className={`p-3 rounded cursor-pointer mb-2 hover:bg-gray-800 text-gray-300 ${
                  activeChat === chat.$id ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  scrollToBottom();
                  selectChat(chat.$id);
                  toggleSidebar();
                }}
              >
                {`New Chat ${chats.length - ind}`}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Slim Scrollbar Styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #222;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #555 #222;
        }
      `}</style>
    </>
  );
}

export default Sidebar;
