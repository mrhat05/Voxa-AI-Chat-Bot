import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function LLMSelector({selectedModel,models,setSelectedModel}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" relative w-full max-w-xs md:max-w-sm text-white">
      <button
        className="w-full flex items-center justify-between px-4 py-2 text-lg bg-transparent rounded-md backdrop-blur-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedModel}
        <FaChevronDown
          className="text-gray-400 transition-transform w-10 duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-transparent backdrop-blur-md rounded-md shadow-lg z-10">
          {models.map((model, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white transition"
              onClick={() => {
                setSelectedModel(model);
                setIsOpen(false);
              }}
            >
              {model}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LLMSelector;
