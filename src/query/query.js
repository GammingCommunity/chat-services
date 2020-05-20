module.exports = {
    chatPrivate: (messageType,text) => `mutation($friendID:String!){
        chatPrivate(friendID:$friendID,input:{
                messageType:${messageType}
                text:{
                    content:${text.content}
                    height:${text.height},
                    width:${text.width}
                }
            }){
                status
                success
                message
            }
    }`,
    chatGroup:(messageType,currentID,text,roomID) => `
        mutation{
            chatRoom(roomID:"${roomID},messages:{
                messageType:${messageType},
                id:"${currentID}",
                text:{
                    content:${text.content}
                    height:${text.height},
                    width:${text.width}
                }
            }){
                status
                success
                message
            }
        }
    
    `
         
}