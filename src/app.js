express=require("express");

const User=require("./Models/User"); 

const bcrypt=require("bcrypt");

const cookieParser=require("cookie-parser")

const validateSignUpData=require("./utils/validation");

const jwt=require("jsonwebtoken");

const {connectDB}=require("./config/database");

const userauth=require("./middlewares/auth");

console.log(typeof userauth);

console.log("i am mahesh");

app=express();

app.use(cookieParser());//helps to read the cookie

app.use(express.json());//inbuild middleware of express to read data in the body 

app.delete("/delete",async (req,res)=>{
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

app.post("/signup",async (req,res)=>{
  try {
    //validation
     validateSignUpData(req);

     //encryption
    const {firstName,lastName,emailID,password}=req.body;

    const hashpass=await bcrypt.hash(password,10);//password encryption

    //create + save 
    await User.create(

        {firstName:firstName,
         lastName:lastName,
         emailID:emailID,
         password:hashpass
        }
    );
    res.status(201).send("data saved successfully");
} catch (err) {
    res.status(400).send("Error Msg: "+err.message);
}

})

app.post("/login" ,async (req,res)=>{
    try{

        const {emailID,password}=req.body;

        const user=await User.findOne({emailID:emailID});

        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPassvalid=await bcrypt.compare(password,user.password);

        if(isPassvalid){

            //create JWT token 
            const token=await jwt.sign({_id:user._id},"Devtinder$790",{expiresIn:'7d'});

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






