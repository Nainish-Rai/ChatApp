"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "../components/socket";

function room() {
  const [connected, setConnected] = useState(socket.connected);
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState(["hii", "jello"]);
  console.log(connected);
  console.log(textValue)
  const params = useParams();
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("fired")
    if (textValue) {
      socket.emit("chat_message", textValue);
      setTextValue("");
    }
  };
  useEffect(() => {
    socket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [socket]);
  return (
    <div>
      <h1>{params.room}</h1>
      <div>
        {messages.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTextValue(e.target.value)} />
        <button type="button" onClick={()=>socket.emit("chat_message", textValue)} className="border">
          Send
        </button>
      </form>
    </div>
  );
}

export default room;
