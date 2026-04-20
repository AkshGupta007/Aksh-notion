const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sectionschema=new schema({
    sectionName:{
        type:String,
           required:true
    },
    subsections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subsections'
    }]
});

const Section=mongoose.model('Section', sectionschema);
module.exports=Section;