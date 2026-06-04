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

      <section className="relative mt-0 bg-cyan-900 py-12 text-white md:h-96">
        <div className="mx-auto flex w-11/12 flex-col items-center justify-center gap-6">
          <h1 className="text-bold mt-4 text-center text-3xl text-red-400 md:mt-16">
            Driving Innovation in Online Education for
            <span className="block text-center"> a Brighter Future</span>
          </h1>

          <p className="max-w-3xl text-center text-sm leading-relaxed text-white/80 sm:text-base">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>

          <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:absolute md:h-64 md:translate-x-6 md:translate-y-72 md:gap-8 lg:gap-20">
            <img
              src={img1}
              className="h-52 w-full rounded-lg object-cover md:h-60 md:object-contain"
              alt="about us 1"
              loading="lazy"
            />
            <img
              src={img2}
              className="h-52 w-full rounded-lg object-cover md:h-60 md:object-contain"
              alt="about us 2"
              loading="lazy"
            />
            <img
              src={img3}
              className="h-52 w-full rounded-lg object-cover md:h-60 md:object-contain"
              loading="lazy"
              alt="about us 1"
            />
          </div>
        </div>
      </section>

      {/*section 2 */}

      <section className="mt-10 md:mt-28">
        <p className="mx-auto w-11/12 pt-10 text-2xl leading-tight text-white sm:text-3xl md:w-8/12 md:text-4xl">
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
        <div className="mx-auto mt-2 flex w-11/12 flex-col items-center justify-evenly gap-8 lg:flex-row">
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
          <img src={img4} className="h-80 w-full max-w-sm rounded-lg object-cover sm:h-96 sm:object-contain" loading="lazy" alt="about us" />
        </div>

        <div className="mx-auto mt-8 flex w-11/12 flex-col items-start justify-evenly gap-8 lg:flex-row">
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

      <section className="mt-12 bg-gray-800 py-7">
        <div className="mx-auto grid w-11/12 grid-cols-2 gap-6 text-center text-white sm:grid-cols-4">
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
