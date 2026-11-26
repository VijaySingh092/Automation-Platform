import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'

// login controller
export const login = async(req, res)=>{
    try{
        const {token:firebaseToken} = req.body    // extract the token property and store it in a variable called firebaseToken.   equivalent to --->  const firebaseToken = req.body.token

        // Check whether the token exists
        if(!firebaseToken){
            return res.status(400).json({
                message:"firebaseToken not found"
            })
        }

        // Verify Firebase ID token
        //  getAuth(app) Gets the authentication service associated with your initialized Firebase Admin app
        // .verifyIdToken(firebaseToken) Firebase Admin verifies the ID token
        //  If verification succeeds, Firebase returns decoded user information.
        // Firebase verifies that the Firebase ID token was genuinely issued by Firebase and belongs to a valid, authenticated user in your Firebase project
        const decoded = await getAuth(app).verifyIdToken(firebaseToken)


        // Find or create the user in MongoDB
        const user = await User.findOneAndUpdate(
            {firebaseUid:decoded.uid},      // Searches MongoDB for a user whose firebaseUid matches the UID received from Firebase
            {
                $set:{                 // Updates these fields if the user already exists also works when creating a new document, but only if upsert: true is enabled.
                    name:decoded.name,
                    email:decoded.email,
                    profilePicture:decoded.picture               
                },
                $setOnInsert:{          // Sets firebaseUid only when a new document is inserted. It does not modify this field when updating an existing user. $setOnInsert works only when MongoDB inserts a new document.
                    firebaseUid:decoded.uid
                }
            },
            {
                upsert:true,   // upsert tells MongoDB whether it should create a new document if no matching document is found during an update operation.  $setOnInsert will not execute without upsert: true
                returnDocument:"after"  // Returns the document after the update.
            }
        )

        // generate JWT token
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,
            {expiresIn:"7d"}) // controls when the JWT becomes invalid

        // Store JWT in an HTTP-only cookie
        res.cookie("token",token,{
            httpOnly:true,  // Prevents JavaScript from accessing the cookie
            secure:false,  // When true, sends the cookie only over HTTPS
            sameSite:"strict",  // Controls cross-site cookie requests
            maxAge:7*60*60*1000  // controls how long the browser keeps the cookie
        })

        // Send response
        // If everything succeeds:
        // HTTP status 200 is returned.
        // The JWT cookie is sent to the browser.
        // The MongoDB user document is returned as JSON.
        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json({message:`login error ${error}`})
    }
}


// logout controller
export const logout = async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({message:"logout successful"})
    }catch(error){
        return res.status(500).json({message:`logut erro : ${error}`})
    }
}