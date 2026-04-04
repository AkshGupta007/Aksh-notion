const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Categoryschema=new schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
    
});
const category= mongoose.model('Category', Categoryschema);
module.exports=category;