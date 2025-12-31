express=require("express");

app=express();

app.use("/",(req,res)=>
{
    res.send("this is home page");
})

app.use("/login", (req,res)=>{
    res.send("login page");
})

app.listen(7777,()=>{
    console.log("server is listening on port 7777.......");
})