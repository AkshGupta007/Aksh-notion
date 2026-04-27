const express = require('express');
const app=express();



const dotenv = require("dotenv");
dotenv.config();


const database = require("./connections/database");
database.connect();

const { cloudinaryconfig } = require("./connections/cloudinary");
cloudinaryconfig();



const userRoutes=require('./routes/user');
const courseRoutes=require('./routes/course');
const profileRoutes=require('./routes/profile');
const paymentRoutes=require('./routes/payment');




const cookieparser=require('cookie-parser');
const cors=require('cors');


const fileupload=require('express-fileupload');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",

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
app.use('/api/payment',paymentRoutes);



app.get('/',(req,res)=>{
    res.send("welcome to study notion");
});
app.listen(process.env.PORT || 4000,()=>{
    console.log("server is running on port " + (process.env.PORT || 4000));
        console.log(
          "origin is",
          process.env.FRONTEND_URL || "http://localhost:3000",
        );
})