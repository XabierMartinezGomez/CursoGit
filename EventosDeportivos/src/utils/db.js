const moongose = require('mongoose');

const connectDB = async() => {
    try{
        const db = await moongose.connect(process.env.DB_URL)
        const {name, host}= db.connection;
        console.log(`Nombre de la bd ${name} y el servidor ${host}`);

    }catch(error){
        console.log(error);
    }
};

module.exports = connectDB;