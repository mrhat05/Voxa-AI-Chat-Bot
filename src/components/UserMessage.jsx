import React from "react";

const UserMessage = ({ message }) => {
    return (
      <div className="flex justify-end my-2">
        <div className="bg-blue-500 text-white p-3 rounded-2xl max-w-[75%] shadow-md">
          {message}
        </div>
      </div>
    );
  };
  
  export default UserMessage;
  