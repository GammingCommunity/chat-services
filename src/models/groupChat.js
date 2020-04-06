const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const mongoosePaginate = require('mongoose-paginate-v2');

const groupChat = mongoose.Schema({
    roomID: {
        type: ObjectId,
    },
    member: [String],
    messages: [
        {
            id: String,
            text: {
                content:String,
                height:Number,
                width:Number
            },
            createAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now()
    }

})
groupChat.plugin(mongoosePaginate);
module.exports = mongoose.model('roomChat', groupChat);