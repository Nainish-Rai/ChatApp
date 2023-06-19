const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io')

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

const io = new Server (server,{
  cors : {
    origin:"http://localhost:4000",
    methods:['GET','POST']
  }
})

const CHAT_BOT = 'ChatBot'
let chatroom = ''
let allUsers = []
let chatRoomUsers = []

io.on('connection',(socket)=>{
  console.log('user connected on', socket.id)
  

  socket.on('join_room',(data)=>{
    const {username,room} = data
    socket.join(room)
    chatroom = room
    allUsers.push({id:socket.id,username,room})
    chatRoomUsers = allUsers.filter((user)=>user.room===room)
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers); 
    
    
    socket.on('chat_message',(msg)=>{
      console.log("message:" , msg)
      io.to(room).emit('chat_message',msg)
  
    })

   
    let _createdtime_ = Date.now()
    socket.to(room).emit('recieve_message',{
      message:`${username} has joined the room`,
      username: CHAT_BOT,
      _createdtime_
    })
  })

})

app.get('/', (req, res) => {
    res.send('Hello world');
  });

server.listen(4000, () => 'Server is running on port 4000');