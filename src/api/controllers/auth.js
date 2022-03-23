const login =(req,reply)=>{
    console.log(req.body);
    const{email,password}=req.body;
    reply.send("successfully logged")
}

module.exports={login}