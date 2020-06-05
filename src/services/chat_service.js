const { fetch} = require('cross-fetch');
const env = require('../../env');
const queries = require('../query/query');
module.exports = {
    getAllGameID: async () => {
        var response = await fetch("https://gmgraphql.glitch.me/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "auth_code":env.auth_code
            },
            body: JSON.stringify({
                query: queries.getAllGameChannelID
            })
        });
        var result = await response.json();
        return result.data.getListGame;
        
    }
}