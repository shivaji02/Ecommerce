const mongoose = require("mongoose");

const messageSchema =new mongoose.Schema({
content:{
    type:String,
    required:true
},
type:{
    type:String,
    enum:['text','image','file'],
    required:true
}
},{timestamps:true});

const messageModel = mongoose.model('Message',messageSchema);

module.exports = messageModel;


// content: { type: String, required: true },
// type: { type: String, enum: ['text', 'image'], required: true },
// timestamp: { type: Date, default: Date.now },