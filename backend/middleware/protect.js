import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protect = async(req,res,next)=>{
    try{
        const token = req.cookies.token  // Extract JWT
        if(!token){
            return res.status(401).json({message:"Unauthorized"})  // If no token exists, return 401 Unauthorized
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET) // Verify JWT  returns the payload data that was included when creating the JWT, along with automatically generated claims such as iat and exp

        // Find user in MongoDB
        const user = await User.findById(decoded.userId)
        if(!user){
             return res.status(401).json({message:"Unauthorized"})
        }
        req.user = user   // Assigns the user document to property named user inside the Express request object (req)
        next()   // The user has successfully passed authentication. Continue to the next middleware or controller
    }catch(error){
         return res.status(500).json({message:`protect error ${error}`})
    }
}

export default protect