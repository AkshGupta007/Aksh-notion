import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const Contactform = () => {

    
const CountryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+81", country: "Japan" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+86", country: "China" },
  { code: "+7", country: "Russia" },
  { code: "+34", country: "Spain" },
  { code: "+55", country: "Brazil" },
  { code: "+27", country: "South Africa" },
  { code: "+82", country: "South Korea" },
  { code: "+971", country: "United Arab Emirates" },
];


    const[loading,setloading]=useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitSuccessful },
    } = useForm();
    const submitcontactform=async(data)=>{
        console.log(data ,"is form dATA")

    }
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstname:"",
                lastname:"",
                email:"",
                message:"",
                phoneno:""}

            )
        }

    },[isSubmitSuccessful,reset])
  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(submitcontactform)}>
        <div className="flex gap-7">
          <div className="flex flex-col w-fit">
            <label htmlFor="firstname" className="text-yellow-300">
              First name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              {...register("firstname", { required: true })}
            />

            {errors.firstname && (
              <span className="text-red-500 text-sm">
                Please enter your name
              </span>
            )}
          </div>

          <div className="flex flex-col w-fit">
            <label htmlFor="lastname" className="text-yellow-300">
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="flex flex-col w-fit">
          <label htmlFor="email" className="text-yellow-300">
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <span className="text-red-500 text-sm">
              Please enter your email
            </span>
          )}
        </div>

        <div className="flex flex-col w-fit">
          <label htmlFor="phoneno" className="text-yellow-300">
            {" "}
            Phone NO.
          </label>

          <div className="flex gap-4 items-center">
            <div className="w-fit ">
              <select
                name="countrycode"
                id="countrycode"
                className="border px-2 py-1 text-black w-16"
                {...register("countrycode", { required: true })}
              >
                {CountryCodes.map((code, index) => {
                  return (
                    <option value={code.code} className="text-black ">
                      {code.code}-{code.country}
                    </option>
                  );
                })}
              </select>
            </div>

            <input
              type="tel"
              name="phoneno"
              id="phoneno"
              className="border px-2 py-1"
              {...register("phoneno", { required: true })}
            />

            {errors.phoneno && (
              <span className="text-red-500 text-sm">enter your number</span>
            )}
          </div>
        </div>

        <div className="flex flex-col w-fit">
          <label htmlFor="message" className="text-yellow-300">
            message
          </label>
          <textarea
            className="w-[500px]"
            id="message"
            name="message"
            rows={10}
            cols={25}
            {...register("message", { required: true })}
          />

          {errors.message && (
            <span className="text-red-500 text-sm">
              Please enter your message
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-yellow-300 text-black mt-4 w-10/12"
        >
          CONTACT US
        </button>
      </form>
    </div>
  );
}

export default Contactform
