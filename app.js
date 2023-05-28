// Server side script - 

const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const Room = require("./room");

const app = express();

app.use(express.static(path.join(__dirname,"public")))

const server = http.createServer(app);

const io = new Server(server);
const room = new Room();


io.on("connection",async(socket)=>{
    console.log("Connection established again! 👋🏻");
    const roomId = await room.joinRoom();
    // join room 
    // console.log(data);
    socket.join(roomId);
   
    const user = roomId.user;
    
   socket.emit("room-id",{roomId,user});

    socket.on("send-message",({message,user})=> {
        
        console.log("Message -> ",message);
       
        socket.to(roomId).emit("recieve-message",message);
    })

    socket.on("disconnect",()=>{
        //leeave room
        room.leaveRoom(roomId);
        console.log("Disconnected from socket ✂️");
    })

})

server.on("error", (err) => {
  console.log("Error opening server");
});

server.listen(8001, () => {
  console.log("Server working on port 8001 🚀");
});