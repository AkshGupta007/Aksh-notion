const mongoose = require('mongoose');
const { type } = require('os');

const CourseSchema = new mongoose.Schema({
    coursename: { type: String, required: true },
    coursedescription: { type: String },
    price: { type: Number, default: 0 },
    thumbnail: { type:String },
    instructor: { 
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
             },
    coursecontent:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'section'
           
    }],
    ratingandreview:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ratingandreview'
    }],
      Category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        
      }],

      studentsenrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
      }]
});

const Course= mongoose.model('Course', CourseSchema);
module.exports=Course;