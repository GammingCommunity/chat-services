module.exports = {
    chatPrivate: (message) => `mutation($currentID:String!,$friendID:String!){
        chatPrivate(currentUserID:$currentID,friendID:$friendID,input:{
                user:{
                    id:$currentID
                }
                text:${message}
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