const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sectionschema=new schema({
    sectionname:{
        type:String,
           required:true
    },
    subsections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subsections'
    }]
});

module.exports=mongoose.model('section', sectionschema);