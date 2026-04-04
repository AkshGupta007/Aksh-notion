const mongoose = require('mongoose');
const { type } = require('os');
const schema = mongoose.Schema;

const userschema=new schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{type:String,required:true,unique:true},

    password:{type:String,required:true},
    accounttype:{
        type: String,
        enum:['admin','user','instructor'],
        default:'user'  
    },
    additionaldetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:true,
    },
    token:{type:String},
    tokenexpiry:{type:Date},
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const user= mongoose.model('User', userschema);
module.exports=user;