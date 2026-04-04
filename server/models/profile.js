const mongoose = require('mongoose');
const { type } = require('os');
const schema = mongoose.Schema;
const ProfileSchema = new schema({
  gender: {
    type: String,
    default: null,
  },
  dob: {
    type: Date,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },
  contact: {
    type: Number,
    default: null,
  },
});
const profile= mongoose.model('Profile', ProfileSchema);
module.exports=profile;