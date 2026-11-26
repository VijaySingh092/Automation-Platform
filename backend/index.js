import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
dotenv.config()
import cors from "cors"
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cookieParser())  // Parses cookies sent by the browser and makes them accessible through req.cookies

app.use(express.json())  // Express parses the incoming JSON and makes it available as a JavaScript object

app.use(cors({
    origin:"http://localhost:5173",  // Specifies which frontend origin is allowed
    credentials: true   // allows cross-origin credential handling, including cookies
}))

app.use("/api/auth",authRouter)  // Registering authentication routes

app.listen(port, ()=>{
    connectDb()
    console.log(`server is running on port : ${port}`)
})