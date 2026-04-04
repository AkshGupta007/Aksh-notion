const cloudinary= require('cloudinary').v2;

exports.uploadimagetocloudinary= async(File,folder,height,quality)=>{
   const option={folder};
   if(height){
    option.height=height;
   }
   if(quality){
    option.quality=quality;
   }
   option.resource_type="auto";

  return await cloudinary.uploader.upload(File.tempFilePath,option);
};