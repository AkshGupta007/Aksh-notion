import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchCategories, fetchPageCategories } from '../Services/CourseApi';
import CourseSwipper from '../components/Coursepage/CourseSwipper';
import CourseCard from '../components/Coursepage/Coursecard';
const Categorypage = () => {

    const{categoryName}=useParams();

    const[categoryPagedetails,setcategorypagedetails]=useState("");
    const[categoryid,setcategoryid]=useState(null);
    const[categorydetails,setcategorydetails]=useState("")

    useEffect( ()=>{
       const fetxh=async()=>{
         const res=await fetchCategories();
             const decodedName = decodeURIComponent(categoryName);
             console.log("decoded",decodedName);

             const categorydetail= res.find(
               (ct) => ct.name === decodedName,
             );
             setcategorydetails(categorydetail);

              console.log("category",categorydetail);

        setcategoryid(categorydetail?._id);
       };

       fetxh()

   
    },[categoryName])


    useEffect(()=>{
       const fetxh= async ()=>{
        try{
                 console.log("categoryidddddd", categoryid);
            const response=await fetchPageCategories(categoryid);
        

            setcategorypagedetails(response);

        }catch(error)
        {console.error()};
        
        };

        fetxh();
    },[categoryid])

  return (
    <div className="h-full text-white bg-black px-6 py-8">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <p>Home</p>
          <span>/</span>
          <p>Catalog</p>
          <span>/</span>
          <p className="text-yellow-400 font-semibold">{categoryName}</p>
        </div>

        <h1 className="text-3xl font-bold mt-3">{categorydetails?.name}</h1>

        <p className="text-gray-400 mt-2 max-w-2xl">
          {categorydetails?.description}
        </p>
      </div>

      {/**SECTION 1 */}

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          COURSES TO GET YOU STARTED
        </h2>

        <div className="flex gap-6 text-sm mb-6">
          <button className="text-yellow-400 border-b-2 border-yellow-400 pb-1">
            Most Popular
          </button>
          <button className="text-gray-400 hover:text-white">New</button>
        </div>

        <div className='px-96'>
          <CourseSwipper
            course={categoryPagedetails?.selectedcategory?.courses}
          />
        </div>
      </div>

      {/* section2  different category*/}

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Top Courses in {categoryPagedetails?.selectedcategory?.name}
        </h2>

        <CourseSwipper
          course={categoryPagedetails?.differentcategories?.courses}
        />
      </div>

      {/* section3   most selling */}

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Bought Together
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryPagedetails?.mostselling?.map((course, index) => {
            return <CourseCard key={index} course={course} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Categorypage
