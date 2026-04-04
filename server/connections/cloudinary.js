const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');
dotenv.config();

exports.cloudinaryconfig=()=>{
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: 735189431633345,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}
console.log(cloudinary.config());