const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://nainishchat.up.railway.app/", "https://nainishchat.up.railway.app/Bhopal","https://nainishchat.up.railway.app/Gwalior","https://nainishchat.up.railway.app/Shujalpur","https://nainishchat.up.railway.app/Jabalpur" ,"https://nainishchat.up.railway.app/Lakhnadown"] ,
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatroom = "";
let allUsers = [];
let chatRoomUsers = [];
let myUsername = ""

io.on("connection", (socket) => {
  console.log("user connected on", socket.id);
  socket.emit("user_id",socket.id)

  socket.on("join_room", (data) => {
    const { username, room } = data;
    myUsername = username  //getting data from join_room when the button is clicked
    socket.join(room); // joining the room using "room" id
    socket.emit("user_detail",myUsername)
    chatroom = room; // setting room into variable for convineience
    allUsers.push({ id: socket.id, username, room }); // adding connected users to all users
    chatRoomUsers = allUsers.filter((user) => user.room === room); //filtering chatroom users
    socket.to(room).emit("chatroom_users", chatRoomUsers); // emitting .to(room) only
    socket.on("chat_message", (data) => {  //recieving chat_message and emmiting back to only .to(room)
      io.to(room).emit("chat_message", data);
    });

    let _createdtime_ = Date.now();
    socket.to(room).emit("joined_data", {
      message: `${username} has joined the room`,
      username: username,
      _createdtime_,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(4000, () => "Server is running on port 4000");
