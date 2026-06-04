import React from "react";
import { Link } from "react-router";
import { GrAccessibility } from "react-icons/gr";
import Highlighttext from "../components/core/homepage/Highlighttext";
import CTBUTTON from "../components/core/homepage/CTBUTTON";
import videosrc from "../assests/home-gif.mp4";
import Codeblock from "../components/core/homepage/Codeblock";
import TIMELINESECTION from "../components/core/homepage/TIMELINESECTION";
import Learninglanguage from "../components/core/homepage/Learninglanguage";
import Instructorsection from "../components/core/homepage/Instructorsection";
import ReviewSlider from "../components/core/homepage/ReviewSlider";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <div className="relative mx-auto flex min-h-screen w-[95%] sm:w-11/12 flex-col items-center text-white px-2 sm:px-0">
        {/* SECTION 1 */}
        <div>
          <Link to={"/signup"}>
            <div className="group mx-auto mt-6 sm:mt-10 sm:mt-16 rounded-full bg-zinc-300 p-1 text-xs sm:text-sm font-bold text-red-600 transition-all duration-75 hover:scale-95">
              <div className="flex items-center gap-2 sm:gap-5 rounded-full px-4 sm:px-10 py-2 sm:py-4 transition-all duration-200 group-hover:bg-blue-200">
                <p>BECAME AN INSTRUCTOR</p>
                <GrAccessibility />
              </div>
            </div>
          </Link>
        </div>

        {/* HEADING */}
        <div className="mt-6 sm:mt-8 sm:mt-10 text-center font-bold">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-center text-2xl sm:text-3xl sm:text-4xl font-bold leading-tight text-white">
              EMPOWER YOUR FUTURE WITH
            </h1>
          </motion.div>
          <Highlighttext text={"CODING SKILLS"} />
        </div>

        {/* SUBHEADING */}
        <div className="px-2 sm:px-0">
          <p className="mx-auto mt-4 w-full max-w-3xl text-center text-sm sm:text-base sm:text-lg leading-relaxed text-gray-300">
            StudyNotion is a fully functional ed-tech platform that enables
            users to create, consume, and rate educational content. The platform
            is built using the MERN stack, which includes ReactJS, NodeJS,
            MongoDB, and ExpressJS
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8 w-full sm:w-auto px-4 sm:px-0">
          <CTBUTTON active={true} linkto={"/signup"}>
            LEARN MORE
          </CTBUTTON>
          <CTBUTTON linkto={"/contact"} active={false}>
            BOOK A DEMO
          </CTBUTTON>
        </div>

        {/* VIDEO */}
        <div className="mt-6 w-full max-w-[95%] sm:max-w-[700px] overflow-hidden rounded-xl mb-0">
          <video
            muted
            autoPlay
            loop
            className="aspect-video w-full object-cover"
          >
            <source src={videosrc} type="video/mp4" />
          </video>
        </div>

        {/* CODE SECTION 1 */}
        <div className="mt-6 sm:mt-10 lg:mt-16 w-full">
          <Codeblock
            positions={"flex-col lg:flex-row"}
            heading={
              <div className="text-2xl sm:text-3xl sm:text-4xl font-semibold leading-tight">
                Unlock your
                <Highlighttext text={"CODING POTENTIAL"} />
                with our online courses.
              </div>
            }
            subheading={
              <p className="text-base sm:text-lg text-gray-300">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </p>
            }
            ct1={{ active: true, linkto: "/signup", text: "TRY IT YOURSELF" }}
            ct2={{ active: false, linkto: "/login", text: "LEARN MORE" }}
            code={
              ' <!DOCTYPE html>\n <html lang="en">\n <head>\n      <meta http-equiv="X-UA-Compatible" content="IE=edge">\n     <meta name="viewport" content="width=device-width, initial-scale=1.0">\n     <title>Document</title>\n </head>\n <body>\n  </body>\n </html>'
            }
          />
        </div>

        {/* CODE SECTION 2 */}
        <div className="w-full mt-6 sm:mt-0">
          <Codeblock
            positions={"flex-col-reverse lg:flex-row-reverse"}
            heading={
              <div className="text-2xl sm:text-3xl sm:text-4xl font-semibold leading-tight">
                START
                <Highlighttext text={"CODING IN SECONDS"} />
              </div>
            }
            subheading={
              <p className="text-base sm:text-lg text-gray-300">
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

      {/* SECTION 2 */}
      <div className="bg-white text-zinc-800">
        <div className="home_bg min-h-[120px] sm:min-h-[170px]">
          <div className="mx-auto flex w-11/12 flex-col items-center gap-5 py-6 sm:py-0">
            <div className="hidden h-[50px] sm:block"></div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-7 w-full sm:w-auto px-4 sm:px-0">
              <CTBUTTON active={true} linkto={"/signup"}>
                EXPLORE FULL CATALOG
              </CTBUTTON>
              <CTBUTTON active={false} linkto={"/signup"}>
                LEARN MORE
              </CTBUTTON>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[95%] sm:w-11/12 mx-auto justify-between items-center gap-2 px-2 sm:px-0">
          <div className="mb-8 sm:mb-10 mt-10 sm:mt-16 md:mt-[95px] flex flex-col gap-6 md:flex-row md:gap-5">
            <div className="mt-4 w-full text-2xl sm:text-3xl sm:text-4xl font-bold leading-tight md:w-[45%]">
              <p>Get the skills you need for</p>
              <Highlighttext text={" a Job that is In demand"} />
            </div>

            <div className="flex w-full flex-col items-start md:w-[40%]">
              <p className="text-sm sm:text-base">
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

      {/* SECTION 3 */}
      <div className="w-[95%] sm:w-11/12 flex mx-auto flex-col items-center justify-between gap-6 sm:gap-8 text-white px-2 sm:px-0">
        <Instructorsection />

        <h2 className="mt-6 sm:mt-8 text-center text-2xl sm:text-3xl sm:text-4xl font-extrabold leading-tight">
          REVIEWS FROM OTHER LEARNERS
        </h2>

        <ReviewSlider />
      </div>

      <div className="h-6 sm:h-0"></div>
    </div>
  );
};

export default Home;
