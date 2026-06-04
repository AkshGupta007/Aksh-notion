import React from 'react'
import Highlighttext from './Highlighttext'

import hp1 from "../../../assests/homepage 1.jpg"
import hp2 from "../../../assests/homepage 2.jpg"
import hp3 from "../../../assests/homepage 3.jpg"
const Learninglanguage = () => {
  return (
    <div className="mb-2 mt-20 sm:mt-32">
      <div className="flex flex-col gap-5">
        <div className="text-center text-3xl font-semibold underline decoration-yellow-400 underline-offset-8 sm:text-4xl">
          <Highlighttext text={"KNOWLEDGE IS KEY TO SUCCESS"} />
        </div>

        <div className="mx-auto mt-3 w-full max-w-3xl text-center text-base font-medium text-zinc-700">
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <img src={hp2} className="h-56 w-full rounded-lg object-cover sm:h-60" alt='text'></img>

          <img src={hp3} className="h-56 w-full rounded-lg object-cover sm:h-60" alt='text'></img>

          <img src={hp1} className="h-56 w-full rounded-lg object-cover sm:h-60"  alt='text'></img>
        </div>
      </div>
    </div>
  );
}

export default Learninglanguage
