const checkType = require('../../util/checkType');

module.exports = {
  chatPrivateText: () => `
    mutation{

    
    }`,
  chatRoomText: () => `
    mutation{

    
    }`,
  
  chatRoomFile: (roomID, media, fileExt) => `
    mutation{
      chatRoom(roomID:"${roomID}",messages:{
        messageType:file
        text:{
            content:"${media.url}.${media.format}"
             fileInfo:{
                fileName:"${media.name}"
                fileSize:"${media.size / 100000 > 1
                  ? media.size / (1024 * 1024) + " Mb"
                  : media.size / 1024 + " Kb"}"
                publicID:"${media.publicID}"

            }
        }
      }){
        status 
        success
      }
    }`,
  chatPrivateFile: (friendID, media, fileExt) =>
    `mutation{
      chatPrivate(friendID:"${friendID}",input:{
        messageType:file
        text:{
            content:"${media.url}.${media.format}"
             fileInfo:{
                fileName:"${media.name}"
                fileSize:"${media.size / 100000 > 1
      ? media.size / (1024 * 1024) + " Mb"
      : media.size / 1024 + " Kb"}"
                publicID:"${media.publicID}"

            }
        }
      }){
        status
        success
      }
    }
  `,
  chatRoomMedia: (roomID, media) => `
    mutation{
      chatRoom(roomID:"${roomID}",messages:{
        messageType:${media.format == "gif" ? "gif" : checkType(media.format) ? "image" : "video"}
          text:{
            content:"${media.url}"
            fileInfo:{
                fileName:"${media.name}.${media.format}"
                fileSize:"${media.size / 100000 > 1
      ? media.size / (1024 * 1024) + " Mb"
      : media.size / 1024 + " Kb"}"
                publicID:"${media.publicID}"
                height:${media.height}
                width:${media.width}
            }
        }
      }){
        status
        success
      }
    }`,
  chatPrivateMedia: (friendID, media) =>
    `mutation{
      chatPrivate(friendID:"${friendID}",input:{
        messageType:${media.format == "gif" ? "gif" : checkType(media.format) ? "image" : "video"}
        text:{
          content:"${media.url}"
           fileInfo:{
                fileName:"${media.name}.${media.format}"
                fileSize:"${media.size / 100000 > 1
      ? media.size / (1024 * 1024) + " Mb"
      : media.size / 1024 + " Kb"}"
                publicID:"${media.publicID}"
                height:${media.height}
                width:${media.width}
            }

        }
      }){
        status
        success
      }
    }
  `,
  updateGroupCover: (roomID, media) =>
    `mutation{
        changeGroupPhoto(groupID:"${roomID}",type:cover,url:"${media.url}"){
            status
            success
          }
      }
    `
  ,
  updateGroupProfile: (roomID, media) =>
    `mutation{
        changeGroupPhoto(groupID:"${roomID}",type:profile,url:"${media.url}"){
            status
            success
          }
      }
    `
}