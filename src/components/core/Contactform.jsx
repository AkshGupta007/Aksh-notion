import React from 'react'
import { useState } from 'react'
import { IoLogoWechat } from "react-icons/io5";
import { MdOutlineDoorBack } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import ReviewSlider from '../core/homepage/ReviewSlider';
import { sendcontactusquery } from '../../Services/StudentFeaturesApi';


const ContactUs = () => {

      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const validate = () => {
        let newErrors = {};

        if (!formData.firstName) newErrors.firstName = "First name required";
        if (!formData.lastName) newErrors.lastName = "Last name required";
        if (!formData.email) newErrors.email = "Email required";
        if (!formData.message) newErrors.message = "Message required";

        return newErrors;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        console.log("Form Submitted:", formData);

        const response = await sendcontactusquery(formData);
        console.log("API Response:", response);



        // reset
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      };
  return (
    <div className='flex flex-col min-h-screen mb-3'>
      <div className="h-screen flex items-center justify-around ">
     

        <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
          <div className="w-full max-w-3xl border border-gray-700 rounded-xl p-8 bg-[#020617] shadow-xl">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-white mb-2">
              Got a Idea? We’ve got the skills. Let’s team up
            </h2>
            <p className="text-gray-400 mb-8">
              Tell us more about yourself and what you’re got in mind.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First + Last Name */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm text-gray-400">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 rounded-md bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div className="w-1/2">
                  <label className="text-sm text-gray-400">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 rounded-md bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-md bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-400">Phone Number</label>
                <div className="flex gap-3 mt-1">
                  <select className="p-3 rounded-md bg-[#0f172a] text-white border border-gray-700">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>

                  <input
                    type="text"
                    name="phone"
                    placeholder="12345 67890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-gray-400">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-md bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
                />
                {errors.message && (
                  <p className="text-red-400 text-sm">{errors.message}</p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <ReviewSlider/>
    </div>
  );
}

export default ContactUs
