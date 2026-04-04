import React from 'react'
import Highlighttext from './homepage/Highlighttext';
import CTBUTTON from './homepage/CTBUTTON';
import clsx from 'clsx';

const Gridsection = () => {

    

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Studynotion curriculum is designed to be easier to understand and aligned with industry requirements.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion leverages interactive tools, projects, and mentorship to ensure practical, hands-on learning experiences.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Earn recognized certifications that validate your skills and help you stand out in the job market.",
  },
  {
    order: 4,
    heading: "Racing Auto-Grading",
    description:
      "Automated grading systems provide instant feedback, helping learners improve faster and track progress effectively.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion prepares learners with job-ready skills, bridging the gap between education and employment.",
  },
];



    
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 mt-14 w-11/12'>
        {
            LearningGridArray.map((card,index)=>{
                return (
                  <div
                    key={index}
                    className={clsx(
                      "p-6 lg:h-[250px]",
                      index === 0 && "lg:col-span-2",
                      card.order === 3 && "lg:col-start-2",
                      card.order === -1
                        ? "bg-transparent"
                        : card.order % 2 === 1
                          ? "bg-zinc-600"
                          : "bg-gray-900",
                    )}
                  >
                    {card.order < 0 ? (
                      <div className="w-[90%] flex flex-col ">
                        <h1 className='text-white'> {card.heading}</h1>
                        <Highlighttext text={card.highlightText} />
                        <p className='text-white'>{card.description}</p>
                        <CTBUTTON active={true} linkto={card.BtnLink}>
                          Learn more
                        </CTBUTTON>
                      </div>
                    ) : (
                      <div className="text-white">
                        <h1>{card.heading}</h1>
                        <p>{card.description}</p>
                      </div>
                    )}
                  </div>
                );
            })
        }
      
    </div>
  )
}

export default Gridsection
