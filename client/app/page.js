'use client'
import { socket } from "./components/socket"
import { useState , useEffect } from "react"
import {useRouter} from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [username,setUsername] = useState("")
  const [room,setRoom] = useState("")

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }

    // Redirect to /chat
    router.push(`/${room}`)
  };


  return (
   <main >
     <div>
      <div >
        <h1>{`<>DevRooms</>`}</h1>
        <input placeholder='Username...' onChange={(e)=>setUsername(e.target.value)} />

        <select onChange={(e)=>setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button onClick={joinRoom}>Join Room</button>
      </div>
     
    </div>
   </main>
  )
}
