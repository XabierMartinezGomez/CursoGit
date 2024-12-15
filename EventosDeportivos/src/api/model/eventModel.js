const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type:String, require:true},
    description: {type:String, require:true},
    date: {type:Date},
    place: {type:String, require: true},
    sport: {type:String, default:''},
    organicer:{type:String, default: ""},
},{
    collection: "events"
}
);

const Events = mongoose.model("events", eventSchema);
module.exports = Events;