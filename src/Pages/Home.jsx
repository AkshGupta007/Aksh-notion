import React from 'react'
import { Link } from 'react-router'
import { GrAccessibility } from "react-icons/gr";
import Highlighttext from '../components/core/homepage/Highlighttext';
import CTBUTTON from '../components/core/homepage/CTBUTTON';
import videosrc from '../assests/obito.mp4'
import Codeblock from '../components/core/homepage/Codeblock';
import TIMELINESECTION from '../components/core/homepage/TIMELINESECTION';
import Learninglanguage from '../components/core/homepage/Learninglanguage';
import Instructorsection from '../components/core/homepage/Instructorsection';
import ReviewSlider from '../components/core/homepage/ReviewSlider';
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import target from '../assests/homepage 1.jpg'





const Home = () => {

  return (
    <div>
      <div className=" relative  mx-auto min-h-screen w-11/12 flex flex-col items-center text-white ">
        {/*section1*/}
        <div>
          <Link to={"/signup"}>
            <div
              className="group mt-16 p-1 mx-auto rounded-full bg-zinc-300 text-red-600 font-bold 
         transition-all duration-75 transform  hover:scale-75 gap-4"
            >
              <div className="flex flex-row items-center gap-5 rounded-full px-10 py-4 transition-all duration-200 group-hover:bg-blue-200  ">
                <p> BECAME AN INSTRUCTOR </p>
                <GrAccessibility />
              </div>
            </div>
          </Link>
        </div>
        <div className="font-bold text-4xl mt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white text-center">
              EMPOWER YOUR FUTURE WITH
            </h1>
          </motion.div>
          <Highlighttext text={"CODING SKILLS"} />
        </div>
        <div>
          <p className="mt-4 w-[90%] text-center text-lg text-gray-300">
            StudyNotion is a fully functional ed-tech platform that enables
            users to create, consume, and rate educational content. The platform
            is built using the MERN stack, which includes ReactJS, NodeJS,
            MongoDB, and ExpressJS
          </p>
        </div>

        <div className="flex mt-5 gap-8">
          <CTBUTTON active={true} linkto={"/signup"}>
            LEARN MORE
          </CTBUTTON>

          <CTBUTTON linkto={"/contact"} active={false}>
            BOOK A DEMO
          </CTBUTTON>
        </div>

        <div className="mt-6 w-[700px] h-[300px]">
          <video muted autoPlay loop>
            <source src={videosrc} type="video/mp4" />
          </video>
        </div>

        {/* CODE SECTION 1 */}

        <div className="mt-44">
          <Codeblock
            positions={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <Highlighttext text={"CODING POTENTIAL"} />
                with our online courses.
              </div>
            }
            subheading={
              <p className="text-lg text-gray-300">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </p>
            }
            ct1={{
              active: true,
              linkto: "/signup",
              text: `TRY IT YOURSELF ->}`,
            }}
            ct2={{ active: false, linkto: "/login", text: "LEARN MORE" }}
            code={
              ' <!DOCTYPE html>\n <html lang="en">\n <head>\n      <meta http-equiv="X-UA-Compatible" content="IE=edge">\n     <meta name="viewport" content="width=device-width, initial-scale=1.0">\n     <title>Document</title>\n </head>\n <body>\n  </body>\n </html>'
            }
          />
        </div>
        {/* CODE SECTION 2 */}
        <div className="">
          <Codeblock
            positions={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                START
                <Highlighttext text={"CODING IN SECONDS"} />
              </div>
            }
            subheading={
              <p className="text-lg text-gray-300">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </p>
            }
            ct1={{ active: true, linkto: "/signup", text: "CONTINUE LESSONS" }}
            ct2={{ active: false, linkto: "/login", text: "LEARN MORE" }}
            code={
              ' <!DOCTYPE html>\n <html lang="en">\n <head>\n      <meta http-equiv="X-UA-Compatible" content="IE=edge">\n     <meta name="viewport" content="width=device-width, initial-scale=1.0">\n     <title>Document</title>\n </head>\n <body>\n  </body>\n </html>'
            }
          />
        </div>
      </div>

      {/*SECTION 2 */}

      <div className="bg-white text-zinc-800">
        <div className="home_bg h-[170px] ">
          <div className=" w-11/12 flex flex-col items-center gap-5 mx-auto  ">
            <div className="h-[50px]"></div>

            <div className="flex flex-row gap-7 justify-center">
              <CTBUTTON active={true} linkto={"/signup"}>
                EXPLORE FULL CATALOG
              </CTBUTTON>

              <CTBUTTON active={false} linkto={"/signup"}>
                LEARN MORE
              </CTBUTTON>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-11/12 mx-auto justify-between items-center gap-2">
          <div className="flex  gap-5 mb-10 mt-[95px]">
            <div className="text-4xl mt-4 w-[45%] font-bold">
              <p>Get the skills you need for</p>
              <Highlighttext text={" a Job that is In demand"} />
            </div>

            <div className="flex flex-col w-[40%] items-start   ">
              <p className="text-16px ">
                {" "}
                The Modern StudyNotion is the dictates its own terms. today to
                be an competetive specialist require more than professional
                skills.
              </p>
              <div className="mt-5">
                <CTBUTTON active={true} linkto={"/signup"}>
                  <div>Learn More</div>
                </CTBUTTON>
              </div>
            </div>
          </div>
          <TIMELINESECTION />

          <Learninglanguage />
        </div>
      </div>

      {/*section 3*/}

      <div className="w-11/12 flex mx-auto flex-col items-center justify-between gap-8  text-white  ">
        <Instructorsection />

        <h2 className="mt-8 font-extrabold text-4xl">
          {" "}
          REVIEWS FROM OTHER LEARNERS{" "}
        </h2>

        <ReviewSlider />
      </div>

      <div></div>
    </div>
  );
}

export default Home
