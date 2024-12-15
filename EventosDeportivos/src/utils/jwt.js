const jwt = require("jsonwebtoken");

const createToken = (info) =>{

    const data = {
        user_name: info.username,
        user_password:info.password
    };

    return jwt.sign(data, process.env.SECRET_KEY_JWT,{expiresIn:"1h"});
}

module.exports = {createToken}