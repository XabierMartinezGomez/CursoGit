const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const checkToken = async(req, res, next) =>{
    try {
        
        if(!req.headers["authorization"]){
            return res.json({msg:'Error 401: Necesito token'});
        }
        const token = req.headers["authorization"];

        let data;
        const tokenVe = token.split(" ")[1];

        data = jwt.verify(tokenVe, process.env.SECRET_KEY_JWT);

        const user = await User.findOne({'username' : data.user_name});

        req.user = user;
        
        next();
    } catch (error) {
        
    }
};
module.exports = {checkToken};