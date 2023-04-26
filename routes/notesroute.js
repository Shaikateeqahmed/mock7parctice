const express = require("express");
const { NoteModel } = require("../modules/notemodel");
const note = express.Router();


note.get("/",async(req,res)=>{
    try {
        let note = await NoteModel.find();
        res.json(note);
    } catch (error) {
        console.log(error);
    }
})

note.post("/create",async(req,res)=>{
    let {name,author,type,content} =req.body;
    try {
        let note = new NoteModel({name,author,type,content,UserID:req.body.UserID});
        await note.save();
        res.json("Note successfully saved!");
    } catch (error) {
        console.log(error);
    }
})

note.patch("/update/:id",async(req,res)=>{
    let payload = req.body;
    let ID = req.params.id;
    try {
        let note = await NoteModel.find({"_id":ID});
        let id_of_note = note[0].UserID;
        let id_of_req = req.body.UserID;
        console.log(note,id_of_note,id_of_req);
        if(id_of_note===id_of_req){
            await NoteModel.findByIdAndUpdate({_id:ID},payload);
            res.json(`Note of a Content:- ${note[0].content} Change to ${payload.content}`);
        }else{
            res.json(`U are not Authorized!`);
        }
    } catch (error) {
        console.log(error);
    }
})

note.delete("/delete/:id",async(req,res)=>{
    let ID = req.params.id;
    try {
        let note = await NoteModel.find({"_id":ID});
        let id_of_note = note[0].UserID;
        let id_of_req = req.body.UserID;
        console.log(note,id_of_note,id_of_req);
        if(id_of_note===id_of_req){
            await NoteModel.findByIdAndDelete({_id:ID});
            res.json(`Note of a Content:- ${note[0].content} Deleted`);
        }else{
            res.json(`U are not Authorized!`);
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports={note};