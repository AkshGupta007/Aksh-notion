import React from 'react'
import { useState } from 'react'
import { IoLogoWechat } from "react-icons/io5";
import { MdOutlineDoorBack } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import ReviewSlider from '../components/core/homepage/ReviewSlider';
import { sendcontactusquery } from '../Services/StudentFeaturesApi';
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
    <div className='mb-3 flex min-h-screen flex-col'>
      <div className="mx-auto mb-16 flex w-11/12 flex-col items-stretch justify-around gap-8 py-8 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-6 rounded-lg bg-zinc-800 p-6 text-white shadow-lg sm:p-10 lg:max-w-sm">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <IoLogoWechat className="text-4xl text-green-400" />
              <h1 className="text-3xl">Chat on us</h1>
            </div>
            <p className="underline">Our friendly team is here to help</p>
            <p></p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <MdOutlineDoorBack className="text-4xl text-green-400" />
              <h1 className="text-3xl">Visit us</h1>
            </div>
            <p className="underline">We are located at 123 Main Street</p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaPhoneAlt className="text-4xl text-green-400" />
              <h1 className="text-3xl">Call us</h1>
            </div>
            <p className="underline">You can reach us at 88006-96298</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-[#020617] lg:p-6">
          <div className="w-full max-w-3xl rounded-xl border border-gray-700 bg-[#020617] p-5 shadow-xl sm:p-8">
            {/* Heading */}
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              Got a Idea? We’ve got the skills. Let’s team up
            </h2>
            <p className="text-gray-400 mb-8">
              Tell us more about yourself and what you’re got in mind.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First + Last Name */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full sm:w-1/2">
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

                <div className="w-full sm:w-1/2">
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
                <div className="mt-1 flex gap-3">
                  <select className="w-24 rounded-md border border-gray-700 bg-[#0f172a] p-3 text-white">
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
