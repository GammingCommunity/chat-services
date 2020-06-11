const fetch = require("cross-fetch");
const env = require("../env");
const mutation = require("../mutation/mutation");
const getAccountID = require("../util/getUserID");
module.exports = {
    updateAvatar: async (token, url) => {
        var response = await fetch(env.subServiceURL, {
            method: "POST",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify({ query: mutation.editAccount(url) }),
        });
        var result = await response.json();
        var status = result.data.editThisAccount.status;
        if (status == "SUCCESS") {
            return true;
        }
        return false;
    },
    chatText: async (token, id, type,message) => {
        var response = await fetch(env.mainServiceURL, {
            method: "POST",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify({
                query:
                    type == "room"
                        ? mutation.chatRoomText(id, message)
                        : mutation.chatPrivateText(id, message),
            }),
        });
    },
    chatMedia: async (token, id, type, media) => {

        var response = await fetch(env.mainServiceURL, {
            method: "POST",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify({
                query:
                    type == "room"
                        ? mutation.chatRoomMedia(id, media)
                        : mutation.chatPrivateMedia(id, media),
            }),
        });
        var result = await response.json();
        console.log(result);

        var status = result.data.chatPrivate.status;
        if (status == 400) {
            uploader.destroy(media.publicID, function (err, result) {
                console.log(result);
            });
            return false;
        }

        return true;


    },
    chatFile: async (token, id, type, media) => {
        var response = await fetch(env.mainServiceURL, {
            method: "POST",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify({
                query:
                    type == "room"
                        ? mutation.chatRoomFile(id, media)
                        : mutation.chatPrivateFile(id, media),
            }),
        });
        var result = await response.json();
        console.log(result);
        var status = result.data.chatPrivate.status;
        if (status == 400) {
            uploader.destroy(media.publicID, function (err, result) {
                console.log(result);
            });
            return false;
        }

        return true;
    },
    chatGroupText: async (token, receiverID, message) => {

    },

    updateGroup: async (token, roomID, type, media) => {
        var response = await fetch(env.mainServiceURL, {
            method: "POST",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify({
                query:
                    type == "cover"
                        ? mutation.updateGroupCover(roomID, media)
                        : mutation.updateGroupProfile(roomID, media),
            }),
        });
        var result = await response.json();
        console.log(result);
        var status = result.data.changeGroupPhoto.status;
        if (status == 400) {
            uploader.destroy(media.publicID, function (err, result) {
                console.log(result);
            });
            return false;
        }

        return true;
    },
};
