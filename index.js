const express = require('express');
const axios = require('axios');
var cors = require('cors');
const app = express();
app.use(cors());
const http = require('http').Server(app);
const mongodb= require('mongodb');
require('dotenv').config();
mongodb.connect(process.env.CONNECTIONS,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
},(err,result)=>{
    if (result) console.log("Connected to MongoDB");
    else console.log("Has error");
    
});

const port = process.env.PORT || 7000;
const io = require('socket.io')(http);

let listUser=[];


io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
    /*io.of('/').clients((error, clients) => {
        if (error) throw error;
        console.log(clients);
      });*/
    // get socket_id 
    socket.on("requestID",()=>{
        console.log("has called requst id");
        socket.emit('receiveID',socket.id);
    })
    
    socket.on('join',(info)=>{

        listUser.push(info);
        console.log("list user join",listUser);
       // socket.emit('userOnline',newList = [...new Set(listUser)]);
        //socket.emit('userOnline',{roomID:socket.id})
    });
    
    socket.on('requestListID',()=>{
        console.log("has called request List ID");
        socket.emit('receiveList',listUser);
    })

    socket.on("getuserOnline",()=>{
        socket.emit('userOnline',{roomID:socket.id})
    })
    socket.on("set_private_chat",(data)=>{
        console.log("my socket want connect",data.socket_id);
        //console.log(listUser);
        //socket.to(data.socket_id).emit("chat_private","")
        console.log("socketID",listUser)
        
    })
    socket.on("sent", (msg) => {
        console.log("sent data: ",msg)
        
    })
    socket.on("receive",(msg)=>{
        console.log("receive data: ",msg)
    })

    socket.on('disconnect', () => {

        socket.disconnect();
        //let s= listUser.find(e=>e.socketID ===socket.id);
        listUser.splice(listUser.findIndex(e=>e.socketID ===socket.id),1);
        socket.emit('receiveList',listUser);
        console.log(socket.id+ ' disconnected')
    })
})
   
http.listen(port, () => {
    console.log('listening on *:' + port);
})