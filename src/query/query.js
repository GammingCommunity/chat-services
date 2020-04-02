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
    }`
         
}