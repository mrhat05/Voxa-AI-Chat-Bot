import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSelector } from "react-redux";

function MessageBox({value, setNewMessage, sendMessage}) {
  const authStatus = localStorage.getItem("authStatus");
  return (
    <form
      onSubmit={(e)=>{
        e.preventDefault();
        sendMessage()
      }}
      className={`flex w-full md:w-3/4  items-end bg-[#1B1B1B] p-2 rounded-xl shadow-lg`}
      autoComplete="off"
    >
      <TextField
        value={value}
        onChange={(e) => setNewMessage(e.target.value)}
        size="small"
        variant="outlined"
        placeholder="Type a message..."
        multiline
        minRows={1}
        maxRows={6}
        InputProps={{
          style: {
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "12px",
            paddingLeft: "12px",
            overflow: "auto",
          },
          sx: {
            "& fieldset": { border: "none" },
            "&:hover fieldset": { borderColor: "#777" },
            "&:focus-within fieldset": { borderColor: "#ddd" },
            "& textarea": {
              scrollbarWidth: "thin",
              scrollbarColor: "#444 #1B1B1B",
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": { background: "#1B1B1B" },
              "&::-webkit-scrollbar-thumb": {
                background: "#444",
                borderRadius: "6px",
              },
              "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
            },
          },
        }}
        fullWidth
      />
      <Button
        type="submit"
        sx={{
          background: authStatus
          ? "linear-gradient(135deg, #2E8BFF, #1E64E2)"
          : "linear-gradient(135deg, #555, #333)",
          color: "white",
          minWidth: "50px",
          height: "45px",
          borderRadius: "50px",
          marginLeft: "10px",
          padding: "0 16px",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.05)" },
          "&:active": { transform: "scale(0.95)" },
        }}
      >
        <SendRoundedIcon sx={{ fontSize: 22 }} />
      </Button>
    </form>
  );
}

export default MessageBox;
