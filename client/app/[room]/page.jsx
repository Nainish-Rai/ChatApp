"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "../components/socket";
import "./page.css";
import MessageComponent from "../components/MessageComponent";

function room({ userDetails }) {
  const [connected, setConnected] = useState(socket.connected);
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [joinData, setJoinData] = useState(null);
  const [user, setUser] = useState("");
  console.log(user);
  const [activeUsers, setActiveUsers] = useState([]);
  const nameInputStyles = {
    background: "transparent",
    color: "#999",
    border: 0,
    borderBottom: "1px solid #666",
    borderRadius: 0,
    fontSize: "3rem",
    fontWeight: 500,
    boxShadow: "none !important",
  };

  const params = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fired");
    if (textValue) {
      socket.emit("chat_message", {
        text: textValue,
        sender: user,
      });
      setTextValue("");
      e.target.value = "";
    }
  };
  useEffect(() => {
    socket.on("chat_message", (msg) => {
      setMessages((prev) => [msg, ...prev]);
      console.log(msg);
    });
    socket.on("joined_data", (data) => {
      setJoinData(data);
    });
    socket.on("user_detail", (data) => {
      console.log(data);
      data != "" && setUser(data);
    });
    socket.on("chatroom_users", (data) => {
      setActiveUsers(data);
    });
  }, [socket]);

  return (
    <main className="w-full h-screen bg-[#343a3f] flex">
      <div className="p-4 hidden sm:block m-2 border px-16">
        <h2 className="font-semibold text-gray-300">Active Users</h2>
        <div>
          {activeUsers.map((item, index) => {
            return (
              <div className="text-gray-50 my-2" key={index}>
                {item.username}
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-full p-5 h-screen max-w-5xl flex flex-col justify-between mx-12">
        <h1 className=" text-center font-bold text-4xl text-[#999]">
          ChatRoom :{" "}
          <span className="text-[#d8d8d8]  capitalize">
            {params.room}
          </span>
        </h1>
        {joinData && (
          <p className="text-gray-100">{joinData.username} ki GC me entry</p>
        )}
        <div className=" overflow-y-scroll  h-full  px-8 flex flex-col-reverse chat-area">
          {messages.map((item, index) => {
            return (
              <MessageComponent
                key={index}
                text={item.text}
                sender={item.sender}
              />
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center focus:border-none w-full"
        >
          <input
            className=" focus:outline-none w-[75%]"
            style={nameInputStyles}
            type="text"
            value={textValue}
            autoFocus={true}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white p-3 mx-6 px-6 border border-white/10 w-[15%] "
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

export default room;
