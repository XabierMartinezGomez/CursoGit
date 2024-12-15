const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const {createToken} = require("../../utils/jwt");

const add = async(req, res) => {

    const errors = [];

    if (!req.body.username || typeof req.body.username !== 'string' || req.body.username.trim().length === 0) {
        errors.push('El nombre es obligatorio y debe ser un texto no vacío.');
    }
    
    if (!req.body.password || typeof req.body.password !== 'string' || req.body.password.trim().length === 0) {
        errors.push('La contraseña es obligatoria y debe ser un texto no vacío.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const data = {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
    };
    const newUser = new User(data);
    const createdUser = await newUser.save();
    res.json(createdUser);
};

const logIn = async(req, res)=>{
    try {

        const {username, password} = req.body;

        const userDB = await User.findOne({username});

        if(!userDB){
            return res.json({message:"No existe"});
        }
        
        const same = await bcrypt.compare(password, userDB.password);
        
        if(!same){
            return res.json({message: 'Contraseña incorrecta'})
        }

        return res.json({message: 'Log in exitoso',
            token: createToken(userDB)
        })
    } catch (error) {
        
    }
}

const profile = async(req, res) => {
    try {

        const user = await User.findOne({'username' : req.user.username});

        res.json({succes:true, listado : user})

    } catch (error) {
        console.log(error);
    }
};

module.exports = {add, logIn, profile};