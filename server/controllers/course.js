const course=require('../models/courses');
const user = require('../models/users');
const Category=require('../models/Category');
const {uploadimagetocloudinary}=require('../utils/imageuploader');

exports.createcourse= async(req,res)=>{
    try{
        //fetch data
        const{coursename,coursedescription,price,Categoryid}=req.body;
        const thumbnail=req.files.thumbnailimage;

        //validate
        if(!coursename || !coursedescription || !price || !Categoryid || !thumbnail){
            console.log(thumbnail);
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            
            })

        }
        // instructor details
        const userid=req.user.id;
        const instructordetails= await user.findById(userid);
        if(!instructordetails){
            return res.status(404).json({
                success:false,
                message:"instructor not found"
            })
        }

        // tag validation
        const tagvaliation = await Category.findById(Categoryid);
        if(!tagvaliation){
            return res.status(404).json({
                success:false,
                message:"category not found"
            })
        }

        // image upload to cloudinary
        const thumbnailimage= await uploadimagetocloudinary(thumbnail,process.env.CLOUDINARY_FOLDER_NAME);


        ////// entry in database

        const coursedetail= await course.create({
            coursename,
            coursedescription,
            price,
            thumbnail:thumbnailimage.secure_url,
            instructor:instructordetails._id,
            Category:tagvaliation._id
        })
        return res.status(200).json({
            success:true,
            message:"course created successfully",
            coursedetail
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in creating course",
            error:error.message
        })
    }
}

exports.getallcourses= async(req,res)=>{
    const details= await course.find({}).populate("instructor").populate("category").populate("ratingandreview");
    return res.status(200).json({
        success:true,
        details
    })
}

exports.getcoursedetails=async(req,res)=>{
    try{
        const{courseid}=req.body;
        const details= await course.findById(courseid).populate({
            path:"instructor",
            populate:{
                path:"additionaldetails"
            }
        }).populate("Category").populate({
            path:"coursecontent",
            populate:{
                path:"subsections"
            }
        }).exec();
        if(!details){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

        return res.status(200).json({
            success:true,
            details,
            message:"course details fetched successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in fetching course details",
            error:error.message
        })

    }
}