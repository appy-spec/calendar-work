const mongoose=require("mongoose");

const Noteschema=new mongoose.Schema({

    mood:String,
    note:String,
    date:{type:String, required:true},
    temp:Number
});

const NoteModel=mongoose.model("Notedata", Noteschema);

module.exports=NoteModel;

