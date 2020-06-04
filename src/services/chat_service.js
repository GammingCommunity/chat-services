const { fetch} = require('cross-fetch');
const env = require('../config/env');
const {getAllGameChannelID} = require('../query/query');
module.exports = {
    getAllGameID: async (token) => {
        var response = await fetch("https://gmgraphql.glitch.me/graphql", {
            method: 'POST',
            headers: {
                "token": token
            },
            body: JSON.stringify({
                query: getAllGameChannelID
            })
        });
        var result = await response.json();
        console.log(result);
        
    }
}