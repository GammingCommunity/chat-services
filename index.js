require('dotenv').config();
const express = require('express');
const { fetch } = require('cross-fetch');
var cors = require('cors');
const app = express();
const checkSession = require('./middleware/checkSession');
const { chatFile, chatMedia ,chatText} = require('./src/services/update_service');
const messageEnum = require('./src/enum/messageEnum');
const chatServices = require('./src/services/chat_service');

app.use(cors({ credentials: true, origin: true }));
const http = require('http').Server(app);
const port = process.env.PORT || 7000;

const io = require('socket.io')(http);

var type = "USER";

io.use((socket, next) => {
    var token = socket.request.headers.token;
    var authCode = socket.request.headers.auth_code == undefined ? false : true;

    if (authCode) {
        type = "SYSTEM";
        next()
    } else {
        type = "USER";
        if (checkSession(token)) {
            next();
        }
    }
})
io.on("connection", async (socket) => {
    var token = socket.request.headers.token;
    console.log("has connected to namespace", socket.nsp.name + type);

    // init all game chat channel
    if (type == "SYSTEM") {
        var gameIDs = await chatServices.getAllGameID(token)
        for (const id of gameIDs) {
            socket.join(id._id)

        }
    }

    socket.on("request-socket-id", () => {

        socket.emit("get-socket-id", socket.id)
        console.log(io.sockets.adapter.rooms);

    })

    socket.on('join-public-game-channel', (id) => {
        socket.join(id);
    })

    socket.on('join-chat-private', (info) => {
        console.log(info)
        socket.join(info.roomID);
    })

    socket.on('chat-private', async (info) => {
        var chatID = info[0].chatID;
        var receiverID = info[1].receiver;
        var messageType = info[1].messageType;
        var text = info[1].text.content;
        var media = info[1].text.media;

        var mediaMessage = {
            messageType: messageType,
            mediaInfo:media
        }

        console.log("Chat private mess" + info);
        // file || image || video || gif || url
        if (messageType == messageEnum.text) {
            chatText(token, receiverID, "private", text).then((v) => {
                socket.broadcast.to(chatID).emit("receive-message-private", text);
            });
        }
        else if (messageType == messageEnum.file) {
            chatFile(token, receiverID, "private", media).then((v) =>{
                socket.broadcast.to(chatID).emit("receive-message-private", mediaMessage);
            })
        }
        else {
            chatMedia(token, receiverID, "private", media).then((v) => {
                socket.broadcast.to(chatID).emit("receive-message-private", mediaMessage);
            })
        }

    })

    socket.on('join-group', (groupID) => {
        socket.join(groupID);
    })

    socket.on('chat-group', async (info) => {
        var groupID = info[0].groupID;
        var messageType = info[0].messageType;
        var media = info[1].media;
        var content = info[1].text.content;

        var mediaMessage = {
            messageType: messageType,
            mediaInfo: media
        }

        // file || image || video || gif || url
        if (messageType == "text") {
            chatText(token, groupID, "room", content).then((v) => {
                socket.to(info[0].groupID).emit("receive-group-message", content);
            })
        }
        else if (messageType == messageEnum.file) {
            chatFile(token, groupID, "room", media).then((v) => {
                socket.to(info[0].groupID).emit("receive-group-message", mediaMessage);
            })
        }
        else {
            chatMedia(token, groupID, "room", media).then((v) => {
                socket.to(info[0].groupID).emit("receive-group-message", mediaMessage);
            })
        }
       
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
    console.log('listening on PORT: ' + port);
    /* mongoose.Promise = global.Promise;
     mongoose.set('useFindAndModify', false);
     mongoose.set('debug', true);
     mongoose.connect(process.env.CONNECTIONS, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (res, err) => {
         console.log('Connected to MongoDB');
     })*/
})