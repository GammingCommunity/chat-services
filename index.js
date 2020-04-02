require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const groupChat = require('./src/models/groupChat');
const {chatPrivate} = require('./src/query/query')
const {fetch} = require('cross-fetch');
var cors = require('cors');
const app = express();
app.use(cors({ credentials: true, origin: true }));

const http = require('http').Server(app);
const port = process.env.PORT || 7000;

const io = require('socket.io')(http);

io.on("connection", (socket) => {

    console.log("has connected to namespace", socket.nsp.name);

    socket.on("request-socket-id", () => {

        socket.emit("get-socket-id", socket.id)
    })

    socket.on('join-chat-private', (info) => {
        socket.join(info.roomID);
    })

    /*
       info:{
            "roomID":""
            "type":"text or media"
            "text":""
            "user":{
                "id":"ab"
            }

        }
    */
    socket.on('chat-private', (info) => {
        var chatQuery = chatPrivate("hello");
        console.log("Chat private mess" + info);

        fetch("https://gmgraphql.glitch.me/graphql",{
            method:'POST',
            headers:{
                "token":""
            },
            body:JSON.stringify({
                chatQuery,
                variables:{currentID:"43",friendID:"44"}
            })
        })

        socket.broadcast.to(info[0].roomID).emit("message-private", [{
            "roomID": info[0].roomID,
        },
        { "user": { "id": info[1].user.id }, "text": info[1].text }]


        );
        //chatPrivate.updateOne()

    })

    socket.on('join-group', (groupID) => {
        socket.join(groupID);
    })
    socket.on('chat-group', (info) => {
        console.log(info[1].text);

        io.to(info[0].groupID).emit("group-message", info);

    })


    socket.on('disconnect', () => {
        socket.disconnect();
        //let s= listUser.find(e=>e.socketID ===socket.id);
        //listUser.splice(listUser.findIndex(e => e.socketID === socket.id), 1);
        //socket.emit('receiveList', listUser);
        console.log(socket.id + ' disconnected')
    })
})

http.listen(port, () => {
    console.log('listening on *:' + port);
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.set('debug', true);
    mongoose.connect(process.env.CONNECTIONS, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (res, err) => {
        console.log('Connected to MongoDB');
    })
})