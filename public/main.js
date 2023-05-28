// Client side script - 

const messageBox = document.querySelector("#messages");
const textBox = document.querySelector("input");
const sendButton = document.querySelector("button");
const roomIdText = document.querySelector(".room-id");


function createMessages(text,ownMessage = false) {
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message";
    const subMessageElement = document.createElement('div');
    subMessageElement.className =  "px-4 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
    if(ownMessage) {
        subMessageElement.className += " float-right bg-blue-800 text-white";
    }
    subMessageElement.innerText = text;
    messageElement.appendChild(subMessageElement);
    messageBox.appendChild(messageElement);

}

const socket = io();

socket.on("room-id",({roomId,user})=> {
    console.log(roomId);
    roomIdText.innerText = roomId.user;
})
socket.on("connection",(socket)=> {
    console.log("Connected");
    console.log(socket.id);

})

socket.on('connect',()=> {
    console.log("Connection is established.")
})

socket.on("recieve-message",(message)=> {
   
  console.log("message on client-side ->",message)
   createMessages(message);

})

sendButton.addEventListener("click",()=> {
    console.log("clicked");
    if(textBox.value != ""){
        socket.emit("send-message",{message:textBox.value,user:"John deo"});
        createMessages(textBox.value,true);
        textBox.value = ""
    }
})

