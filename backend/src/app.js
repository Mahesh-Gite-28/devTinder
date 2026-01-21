express=require("express");

const cors = require("cors");

const cookieParser=require("cookie-parser");

const {connectDB}=require("./config/database");


app=express();

app.use(
  cors({
    origin: "http://localhost:5173",//frontend link 
    credentials: true,
  })
);

app.use(cookieParser());//helps to read the cookie

app.use(express.json());//inbuild middleware of express to read data in the body 


const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB().then(()=>{
    console.log("Database connection estabilished....");
    app.listen(7777,()=>{
    console.log("server is listening on port 7777.......");
})
}).catch((err)=>{
    console.error("Database cannot be connected");
})






