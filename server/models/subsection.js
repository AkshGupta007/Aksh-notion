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
         
    },
    video:{
        type:String,
          
    },
    description:{
        type:String,
           
    }
});
const subsection= mongoose.model('subsections', subsectionschema);
module.exports=subsection;
