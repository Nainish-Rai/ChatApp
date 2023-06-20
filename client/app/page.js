"use client";
import { socket } from "./components/socket";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }

    // Redirect to /chat
    router.push(`/${room}`);
  };

  return (
    <main className="h-screen w-full">
      
        <div className="w-full p-5">
          <h1 className="font-bold text-center text-4xl text-gray-100">{`<>CHATROOMS</>`}</h1>
          <div className="border max-w-xl mt-10 mx-auto w-full flex flex-col gap-10 p-4">
            <input
            className="p-4 rounded"
              placeholder="Username..."
              onChange={(e) => setUsername(e.target.value)}
            />

            <select className="p-4 rounded" onChange={(e) => setRoom(e.target.value)}>
              <option>-- Select Room --</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Gwalior">Gwalior</option>
              <option value="Jabalpur">Jabalpur</option>
              <option value="Shujalpur">Shujalpur</option>
              <option value="Lakhnadown">Lakhnadown</option>
            </select>

            <button onClick={joinRoom} className="p-4 bg-gray-100 font-semibold rounded">Join Room</button>
          </div>
        </div>
    </main>
  );
}
