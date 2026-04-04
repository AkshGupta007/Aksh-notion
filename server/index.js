const express = require('express');
const app=express();

const database=require('./connections/database');

const userRoutes=require('./routes/user');
const courseRoutes=require('./routes/course');
const profileRoutes=require('./routes/profile');
// const paymentRoutes=require('..../routes/payment'l);




const cookieparser=require('cookie-parser');
const cors=require('cors');

const {cloudinaryconfig}=require('./connections/cloudinary');

const fileupload=require('express-fileupload');

const dotenv=require('dotenv');

dotenv.config();

database.connect();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

app.use('/api/user',userRoutes);
app.use('/api/course',courseRoutes);
app.use('/api/profile',profileRoutes);
// app.use('/api/payment',paymentRoutes);

cloudinaryconfig();

app.get('/',(req,res)=>{
    res.send("welcome to study notion");
});
app.listen(4000,()=>{
    console.log("server is running on port 4000");
})