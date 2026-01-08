express=require("express");

const User=require("./Models/User"); 

const bcrypt=require("bcrypt");

const cookieParser=require("cookie-parser")

const validateSignUpData=require("./utils/validation");

const jwt=require("jsonwebtoken");

const {connectDB}=require("./config/database");

const userauth=require("./middlewares/auth");

app=express();

app.use(cookieParser());//helps to read the cookie

app.use(express.json());//inbuild middleware of express to read data in the body 

app.delete("/delete",async(req,res)=>{
    try
    {
        await User.findByIdAndDelete(req.body);
        res.send("delete user successfully");
    }
    catch(err)
    {
        res.status(404).send("user not found");
    }
})

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    // create document instance
    const user = new User(req.body);

    // hash password using schema method
    user.password = await user.gethash();

    // save to DB
    await user.save();

    res.status(201).send("data saved successfully");
  } catch (err) {
    res.status(400).send("Error Msg: " + err.message);
  }
});


app.post("/login" ,async (req,res)=>{
    try{

        const {emailID,password}=req.body;

        const user=await User.findOne({emailID:emailID});

        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPassvalid=await user.comparePassword(password);

        if(isPassvalid){

            //create JWT token 
            const token=await user.getjwt();

            //insert token into cookie and send to client 

            res.cookie("token",token, {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});

            res.send("login successfull")
        }
        else{
            res.send("password is not correct");
        }

    }catch(err)
    {
        res.status(400).send("Error:" + err.message);
    }

})

app.get("/profile",userauth,async (req,res)=>{

    const user=req.user;

    res.send(user);

})


app.post("/sendConnectionRequest",userauth,async (req,res)=>{

    console.log("sending connection request");

    res.send("connection request sent");
})

connectDB().then(()=>{
    console.log("Database connection estabilished....");
    app.listen(7777,()=>{
    console.log("server is listening on port 7777.......");
})
}).catch((err)=>{
    console.error("Database cannot be connected");
})






