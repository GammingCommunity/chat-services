const { fetch} = require('cross-fetch');
const env = require('../config/env');
const {getAllGameChannelID} = require('../query/query');
module.exports = {
    getAllGameID: async (token) => {
        return fetch(env.mainURL, {
            method: 'POST',
            headers: {
                "token": token
            },
            body: JSON.stringify({
                query: getAllGameChannelID
            })
        }).then((v) => {
            console.log("data ",v);
            
        })
    }
}