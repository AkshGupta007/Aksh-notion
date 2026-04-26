// models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    phone: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 Useful for admin panel
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },

    // Optional (good for scaling)
    source: {
      type: String,
      default: "contact-form",
    },
  },
  { timestamps: true }, // adds createdAt & updatedAt
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
