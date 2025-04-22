const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res,next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(400).json({message:"token not found"});
    }

    const jwtToken = token.replace("Bearer ", "").trim();

    try {
        console.log("SECRET_KEY:", process.env.SECRET_KEY);
     const decode =  jwt.verify(jwtToken,process.env.SECRET_KEY)    
    
     const userData = await User.findOne({email:decode.email}).select({password:0});
     if(!userData){
        return  res.status(400).json({message:"user not found"});
    }
    
    req.user = userData;
    req.token = jwtToken;
    req.userId = userData._id;
    next();
    
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
}

module.exports = validateToken;