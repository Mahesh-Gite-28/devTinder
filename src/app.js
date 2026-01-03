express=require("express");
const {auth,userauth} = require("./middlewares/auth");

app=express();

app.get("/admin/getUserData",(req,res)=>{
    try{
        throw new Error("error occured");
    }catch(err)
    {
        res.status(500).send("something wrong");
    }
})


app.use((err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
})

app.listen(7777,()=>{
    console.log("server is listening on port 7777.......");
})

