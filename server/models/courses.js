const mongoose = require('mongoose');
const { type } = require('os');

const CourseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    courseDescription: { type: String },
    price: { type: Number, default: 0 },
    thumbnail: { type:String },
    instructor: { 
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
             },
    coursecontent:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Section'
           
    }],
    ratingandreview:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RatingAndReview'
    }],
      Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        
      },

      tags:[
        {type:String}
      ],

      studentsenrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
      }]
      ,
      instructions:[{
        type:String
      }],
      whatYouWillLearn:{
        type:String
      },
      status:{
        type:String,
        enum:["draft","published"],
        default:"draft"
      }
});

const Course= mongoose.model('Course', CourseSchema);
module.exports=Course;