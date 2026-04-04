import React from 'react'
import Rendersteps from './Rendersteps'


const Index = () => {
  return (
    <div className="text-white flex gap-11">
      <div className='flex flex-col w-11/12'>
        <h1>ADD COURSE</h1>
        <Rendersteps />
      </div>
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">⚡ Course Upload Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024×576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>
            Make Announcements to notify any important notes to all enrolled
            students at once.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Index
