const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
const port=3000;
const mongoUrl="mongodb://127.0.0.1:27017/calender";
// here you can use your mongo atlas url too

app.use(cors());

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



