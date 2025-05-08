const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser = require('body-parser')
const NoteModel=require("./modals/notedata");

const app=express();
const port=3000;
const mongoUrl="mongodb://127.0.0.1:27017/calender";
// here you can use your mongo atlas url too

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port , ()=>{

    console.log(`server is listening on ${port}`);
});

async function main(){

  await mongoose.connect(mongoUrl);
}
main()
 .then(()=>{

    console.log("data base connected sucessfully");
 })
.catch((err)=>{

  console.log(err);
  
});

// routes to add a dummy data

// const dummyNotes=require("./dummyData/data");

// app.post("/adddummy", async(req, res)=>{
  
//   await NoteModel.insertMany(dummyNotes);
//   res.json([...dummyNotes]);
// });

// routes to add notes

app.post("/addnote", (req, res)=>{

  let formData=req.body;
  let newData=NoteModel({...formData});

  newData.save().then((response)=>{

    if(response){

      return res.status(200).json({ message: 'Note added successfully!' });
    }

  }).catch((err)=>{

    return err;
  });

});

// routes to view particular notes

app.post("/viewnotes", async(req, res)=>{

  let {formattedDate}=req.body;
  
  await NoteModel.find({date:formattedDate}).then((response)=>{

    if(response!=undefined){
      
      res.json([...response]);
    }
    else{

      res.json([]);
    }

  }).catch((err)=>{

    console.log(err);
  });

});

// routes to get all notes

app.get("/allnotes", (req, res)=>{

  NoteModel.find({})
  .then((data)=>{

      res.json(data);
  })
  .catch((err)=>{

      console.log(err);
  })
  
});

