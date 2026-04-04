const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { sendmail } = require("../utils/sendmail");

const otpschema = new schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});
////////////////////////////////////otp sender//////////// pre hook///////////////////

async function sendotpemail(email, otp) {
  try {
    const mailoptions = await sendmail(email, "hello", otp);
    console.log("mail sent");
  } catch (err) {
    console.log("error in sending mail", err);
  }
}

otpschema.pre("save", async function () {
  await sendotpemail(this.email, this.otp);
});

////////////////////////////////////////////////////////////////////////////////////
const Otp = mongoose.model("otp", otpschema);
module.exports = Otp;
