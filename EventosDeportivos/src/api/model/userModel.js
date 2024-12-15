const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String, require:true},
    password: {type:String, require:true, unique:true},
},{
    collection: "users"
}
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;