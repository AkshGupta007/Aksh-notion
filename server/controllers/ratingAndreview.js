const ratingandreview= require("../models/ratingandreview");
const course= require("../models/courses");

exports.createreview=async(req,res)=>{
    try{
        const { courseid,rating, review}=req.body;
        const userid=req.user.id;

        /////// check user is enrolled in course or not

        const userenrolled = await course.findOne({_id:courseid,
                                                     studentsenrolled:{
                                                        $elemMatch:{$eq:userid}
                                                     }});

         if(!userenrolled){
            return res.status(403).json({
                success:false,
                message:"user not enrolled in course"
            })
         }          
         
         //////// check if user has already reviewed the course

         const alreadyreviewed= await ratingandreview.findOne({user:userid,course:courseid});

         if(alreadyreviewed){
            return res.status(403).json({
                success:false,
                message:"user has already reviewed the course"
            })
         }
         
         const ratingAndreview= await ratingandreview.create({
            user:userid,
            course:courseid,
            rating,
            review
         })
         /// update in course

         const course= await findbyIdandUpdate({_id:courseid},{
            $push:{
                ratingandreview: ratingAndreview._id
            }},{new:true}
            
         )
         return res.status(200).json({
            success:true,
            message:"review created successfully",
            data:ratingAndreview
         })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error in creating review"
        })
    }
}

exports.getavgrating= async(req,res)=>{
    try{
        const courseid=req.body.courseid;
        ///// aggregrate functions to calculate average rating and total number of reviews

        const results = await ratingandreview.aggregrate([
            {
                $match:{course:mongoose.Types.ObjectId(courseid)}
            },
            {
                $group:{
                    _id:null,
                    Avgrating:{$avg:"$rating"}
                }
            }
        ])
    if(results.length>0){
        return res.status(200).json({
            success:true,
            Avgrating:results[0].Avgrating
        })
     } else{
        return res.status(200).json({
            success:true,
            Avgrating:0
        })
    }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error in getting average rating"
        })
    }}

exports.allreviews= async(req,res)=>{
        try{
            const allreviews= await ratingandreview.find({}).sort({ rating:-1}).populate({
                path:"user",
                select: " Firstname Lastname email"
            }).populate({
                path:"course",
                select:"coursename"
            }).exec();
            return res.status(200).json({
                success:true,
                message:"all reviews fetched successfully",
                data:allreviews
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"error in fetching all reviews"
            })
        }}