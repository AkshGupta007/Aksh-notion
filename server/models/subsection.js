const schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const { type } = require('os');

const subsectionschema=new schema({
    title:{
        type:String,
        required:true
    },
    timeduration:{
        type:Number,
          required:true
    },
    video:{
        type:String,
           required:true
    },
    description:{
        type:String,
           required:true
    }
});
const subsection= mongoose.model('subsections', subsectionschema);
module.exports=subsection;
