const ChatPrivate = require('../models/chatPrivate');

module.exports = () => {
    //condition 1: sender is current User
    return ChatPrivate.findOneAndUpdate(
        { $and: [{ "currentUser.id": currentUserID }, { $and: [{ "friend.id": friendID }] }] }, { $push: { messages: input } }
    ).then(async (v) => {

        console.log("Here" + v);
        // condition 2: sender is guest.
        if (v == null) {
            return ChatPrivate.findOneAndUpdate(
                { $and: [{ "friend.id": currentUserID }, { $and: [{ "currentUser.id": friendID }] }] }, { $push: { messages: input } }
            )
                .then(async (value) => {
                    // mean conversation is not avaiable... notify user to craete new 
                    if (value == null) {
                        return onError('fail', "Conversation is not avaialbe !")
                    }
                    // console.log(value);

                    else {
                        const now = new Date().toISOString();
                        const newMessage = {
                            message: input.text,
                            senderID: friendID,
                            sendDate: now,
                        }
                        pubsub.publish(RECIEVE_MESSAGE, {
                            recieveNewMessage: newMessage
                        })
                        return onSuccess("Add messages success!")
                    }

                }).catch((err) => {
                    console.log(err);
                })
        }
        else return onSuccess("Add messages success!")

    }).catch(async (err) => {

        return onError('fail', "Add messages failed!")

    });
}
