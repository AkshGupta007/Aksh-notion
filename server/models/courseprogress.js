const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseprogessschema=new schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    completedsubsections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subsections'
    }]
});
const CourseProgress = mongoose.model("courseprogress", courseprogessschema);
module.exports=CourseProgress;