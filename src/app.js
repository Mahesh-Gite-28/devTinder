express=require("express");
const {auth,userauth} = require("./middlewares/auth");

app=express();

app.use("/admin",
    auth
)

app.get("/user",userauth,(req,res)=>{
    res.send("user data send");
})

app.get("/admin/getAllData",(req,res)=>{
    //authentication
    res.send("data is  sent");
})

app.get("/admin/deleteUser",(req,res)=>
{
    res.send("delete a user");
})

app.listen(7777,()=>{
    console.log("server is listening on port 7777.......");
})

