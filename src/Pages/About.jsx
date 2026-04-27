import React from 'react'

import Gridsection from '../components/core/Gridsection';
import Contactform from '../components/core/Contactform';
import img1 from "../assests/about us 1.jpg"
import img2 from "../assests/about us2.jpg"
import img3 from "../assests/about us 3.jpg"
import img4 from "../assests/about us4.jpg"
const About = () => {

    const datastrip = [
      {
        count: "5K",
        title: "ACTIVE STUDENTS",
      },
      {
        count: "10+",
        title: "MENTORS",
      },
      {
        count: "200+",
        title: "COURSES",
      },
      {
        count: "50+",
        title: "REWARDS",
      },
    ];
  return (
    <div className="min-h-screen ">
      {/* section 1 */}

      <section className="text-white  mt-0  relative h-96 bg-cyan-900">
        <div className="w-11/12 flex flex-col  gap-8 justify-center items-center mx-auto">
          <h1 className="text-bold text-3xl mt-16 text-red-400 ">
            Driving Innovation in Online Education for
            <span className="block text-center"> a Brighter Future</span>
          </h1>

          <p className=" text-center w-7/12 h-3 pb-3">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>

          <div className="flex gap-20 h-64 absolute translate-x-6 translate-y-72">
            <img
              src={img1}
              className="w-80 h-60 object-contain"
              alt="about us 1"
              loading="lazy"
            />
            <img
              src={img2}
              className="w-80 h-60 object-contain"
              alt="about us 2"
              loading="lazy"
            />
            <img
              src={img3}
              className="w-80 h-60 object-contain"
              loading="lazy"
              alt="about us 1"
            />
          </div>
        </div>
      </section>

      {/*section 2 */}

      <section className="mt-28">
        <p className="text-white text-4xl w-8/12 mx-auto pt-10">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform{" "}
          <span className="text-blue-600">combines technology</span>,{" "}
          <span className="text-orange-600">expertise</span>, and community to
          create{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-900 bg-clip-text text-transparent">
            an unparalleled educational experience.
          </span>
        </p>
      </section>

      <section className=" mt-20">
        <div className="flex items-center justify-evenly mt-2">
          <div className="flex flex-col max-w-lg">
            <h1
              className="bg-gradient-to-l from-red-700 via-red-800 to-red-950 
           bg-clip-text text-transparent text-3xl font-bold mb-4"
            >
              Our founding story
            </h1>
            <p className="text-white mb-4">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="text-white">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <img src={img4} className="w-80 h-96 object-contain" loading="lazy" alt="about us" />
        </div>

        <div className="flex items-center justify-evenly mt-8 ml-8">
          <div className="gap-10">
            <h1
              className="bg-gradient-to-l from-yellow-300  to-yellow-900 
        bg-clip-text text-transparent text-3xl font-bold mb-4"
            >``
              Our Vision
            </h1>
            <p className="text-white max-w-md ">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>

          <div className="">
            <h1
              className="bg-gradient-to-l from-blue-300 to-blue-700
          bg-clip-text text-transparent text-3xl font-bold mb-4"
            >
              Our Mission
            </h1>

            <p className="text-white max-w-md  ">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/**section4 */}

      <section className="bg-gray-800 h-32 mt-12">
        <div className="flex items-center justify-evenly text-white pt-7">
          {datastrip.map((item, index) => {
            return (
              <div key={index} className="">
                <h1 className="font-bold text-2xl">{item.count}</h1>
                <h2 className="text-zinc-400">{item.title}</h2>
              </div>
            );
          })}
        </div>
      </section>

      {/**grid sectionnnnn */}

      <section>
        <Gridsection />
      </section>

      <section>
        <Contactform />
      </section>
    </div>
  );
}

export default About
