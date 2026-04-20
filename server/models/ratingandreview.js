const mongoose = require('mongoose');
const schema = mongoose.Schema;
 const ratingandreviewschema=new schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
    },
    rating:{
        type:Number,
    },
    review:{
        type:String,
          }

 })

 const ratingandrewview=mongoose.model("RatingAndReview",ratingandreviewschema);
 module.exports=ratingandrewview;