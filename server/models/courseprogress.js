const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseprogessschema=new schema({
    courseid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    completedsections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subsection'
    }]
});
const courseprogress= mongoose.model('courseprogress', courseprogessschema);
module.exports=courseprogress;