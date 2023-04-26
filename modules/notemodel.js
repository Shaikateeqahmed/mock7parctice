const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    name:String,
    author: String,
    type:String,
    content : String,
    UserID : String
})

const NoteModel = mongoose.model("note",noteSchema);

module.exports={NoteModel};