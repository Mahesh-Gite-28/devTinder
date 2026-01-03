const auth=(req,res,next)=>
{
    console.log("admin auth checked");
    const token="xyz";
    const isauth= token==="xyz";
    if(isauth){
        next();
    }
    else
    {
        res.status(401).send("unauthorized response");
    }
}


const userauth=(req,res,next)=>
{
    console.log("admin auth checked");
    const token="xyyz";
    const isauth= token==="xyz";
    if(isauth){
        next();
    }
    else
    {
        res.status(401).send("unauthorized response");
    }
}

module.exports={auth,userauth};


