import React from 'react'
import Highlighttext from './Highlighttext'

import hp1 from "../../../assests/homepage 1.jpg"
import hp2 from "../../../assests/homepage 2.jpg"
import hp3 from "../../../assests/homepage 3.jpg"
const Learninglanguage = () => {
  return (
    <div className="mt-32 mb-2">
      <div className="flex flex-col gap-5">
        <div className="text-4xl text-center font-semibold underline decoration-yellow-400 underline-offset-8">
          <Highlighttext text={"KNOWLEDGE IS KEY TO SUCCESS"} />
        </div>

        <div className="text-center mx-auto text-zinc-700 text-base mt-3 font-medium w-[60%]">
          <p className="text-base  font-medium text-black leading-relaxed">
            Knowledge is the foundation of growth and the key to unlocking new
            opportunities. At StudyNotion, we believe learning should be
            accessible, practical, and empowering. Our platform is designed to
            help you gain knowledge that truly matters in the real world. Go
            beyond theory and understand concepts with clarity and purpose.
            Build skills that not only educate but also transform your thinking.
            Learn from structured courses crafted to simplify complex ideas.
            Stay curious, keep exploring, and never stop asking questions.
            Knowledge gained today becomes the strength you rely on tomorrow.
            Turn your learning into action and your action into success. With
            StudyNotion, every step forward is a step toward a smarter future.
          </p>
        </div>

        <div className="flex flex-row items-center justify-center mt-10">
          <img src={hp2} className="object-contain w-[30%] h-60" alt='text'></img>

          <img src={hp3} className="object-contain w-[30%] h-60 " alt='text'></img>

          <img src={hp1} className="object-contain w-[30%] h-60 ml-4"  alt='text'></img>
        </div>
      </div>
    </div>
  );
}

export default Learninglanguage
