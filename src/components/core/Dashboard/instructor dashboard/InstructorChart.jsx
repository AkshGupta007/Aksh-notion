import React from 'react'
import { Pie } from "react-chartjs-2";
import { Chart , registerables } from "chart.js/auto";
import clsx from "clsx";
Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currentView, setCurrentView] = React.useState("students"); // "students" or "earnings"

  const getRandomColors = (numcolor) => {
    let colors = [];

    for (let i = 0; i < numcolor; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Chart data for students enrolled
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // Chart data for income generated
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated), // use consistent field name
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  return(
    <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-white mb-4">
            VISUALIZE
        </h1>
        <div className='flex gap-4 pb-4'>
            <button onClick={() => setCurrentView("students") } className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium",
                currentView === "students" ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
            )}>Students Enrolled</button>
            <button onClick={() => setCurrentView("earnings") } className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium",
                currentView === "earnings" ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
            )}>Income Generated</button>
        </div>

        <Pie 
        data={currentView === "students" ? chartDataForStudents : chartDataForIncome}
        options={{ responsive: true }}
        />
    </div>
  );
};

export default InstructorChart
