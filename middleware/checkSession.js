require('dotenv').config();
const fetch = require('node-fetch');
const env = require('../env');
module.exports = async (token) => {
    // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // header.Add("Access-Control-Allow-Origin", "*")
    //  header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const authUrl = "https://auth-service.glitch.me/auth";

    if (token == (null || undefined)) {
        return false;
    }
    else {
        const response = await fetch(authUrl, {
            'mode': "no-cors",
            headers: {
                "token": token,
                "auth_code": token,
                "secret_key": env.secret_code_jwt
            }
        });

        if (response.status != 200) {
            return false;
        }
        else {
            return true;
        }
    }

}