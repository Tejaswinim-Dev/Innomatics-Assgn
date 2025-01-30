import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/user.route.js'
import dotenv from 'dotenv'

const app = express();

dotenv.config();

//Middlewares
app.use(cors());// Enable cross-origin requests
app.use(express.json()); 

app.use('/api/auth',router)



mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB is connected successfully")
}).catch((err)=>{
    console.log("DB connection failed:",err.message)
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is started on port ${process.env.PORT}`)
})