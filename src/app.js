express=require("express");

app=express();

app.use("/user",
       
[
(req,res,next)=>{
    next();
},
(req,res,next)=>{
    res.send("this is first response");
    next();
}],
(req,res,next)=>{
    console.log("i am third handler");
    // next();
    // res.send("i am third route handler");
}

)


app.listen(7777,()=>{
    console.log("server is listening on port 7777.......");
})

