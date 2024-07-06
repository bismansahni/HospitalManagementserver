import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/config.js'
import authroute from './routes/authentication.js'
import appointment from './routes/appointment.js'
import cors from 'cors';
import multer from 'multer';


dotenv.config();


connectToMongoDB();

const app = express();
const port = process.env.PORT || 5000;

const upload = multer(); 

app.use(cors());  // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/auth',authroute);
app.use('/appointments',appointment);

app.get('/',(req,res)=>{
    res.send("We are in the main server at the hospital management")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  



