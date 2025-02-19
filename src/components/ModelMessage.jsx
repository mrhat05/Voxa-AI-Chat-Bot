import React from "react";
import Markdown from 'react-markdown'

const ModelMessage = ({ message }) => {
    return (
      <div className="flex justify-start my-2">
        <div className="bg-[#25282A] text-white p-3 rounded-2xl max-w-[75%] shadow-md">
          <Markdown>{message}</Markdown>
        </div>
      </div>
    );
  };
  
  export default ModelMessage;
  