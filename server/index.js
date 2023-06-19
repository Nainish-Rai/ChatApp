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

io.on('connection',(socket)=>{
  console.log('user connected on', socket.id)

})
app.get('/', (req, res) => {
    res.send('Hello world');
  });

server.listen(4000, () => 'Server is running on port 4000');