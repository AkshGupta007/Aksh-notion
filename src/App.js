import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Forgotpassword from './Pages/Forgotpassword'
import Updatepassword from './Pages/Updatepassword'
import Verifyemail from './Pages/Verifyemail'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Myprofile from './Pages/Myprofile'
import Privateroute from './components/Privateroute'
import Index from './components/core/Settings/Index'
import Enrolledcourses from "./components/core/Dashboard/Enrolledcourses/Enrolled"
import Indexcart from './components/core/Dashboard/Cart/Index'
import Addcourse from './components/core/Dashboard/Addcourse/Index'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPES } from './account'
import Mycourses from './components/core/Dashboard/Mycourses'
import Editcourse from './components/core/Dashboard/editcourse/Editcourse'
import Categorypage from './Pages/Categorypage'
import CoursePage from './Pages/CoursePage'
import ViewCourse from './Pages/ViewCourse'
import VideoPlayer from './components/core/Dashboard/ViewCourse/VideoPlayer'
import InstructorDashboard from './Pages/InstructorDashboard'
import ContactUs from './Pages/ContactUs'

const App = () => {
  // constants.js
 
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-zinc-950">
      <Navbar />
      {/* <div>
        {console.log("User ka data:", user)}
        {console.log("accounttype:", user?.accounttype)}
        {console.log("INSTRUCTOR value:", ACCOUNT_TYPES.INSTRUCTOR)}
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/update-password/:token" element={<Updatepassword />} />
        <Route path="/verify-email" element={<Verifyemail />} />
        <Route path="about" element={<About />} />
        <Route path="/catalog/:categoryName" element={<Categorypage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/Contact" element={<ContactUs />} />

        <Route
          path="/dashboard"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        >
          <Route path="my-profile" element={<Myprofile />} />
          <Route path="settings" element={<Index />} />
          {user?.accounttype === ACCOUNT_TYPES.USER && (
            <>
              <Route path="enrolled-courses" element={<Enrolledcourses />} />
              <Route path="purchase-history" element={<Myprofile />} />
              <Route path="cart" element={<Indexcart />} />
            </>
          )}

          {user?.accounttype === ACCOUNT_TYPES.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<Addcourse />} />
              <Route path="My-courses" element={<Mycourses />} />
              <Route path="edit-course/:courseId" element={<Editcourse />} />
              <Route path="instructor" element={<InstructorDashboard />} />
            </>
          )}
        </Route>

        <Route
        
          element={
            <Privateroute>
              <ViewCourse />
            </Privateroute>
          }
        >
          { user?.accounttype === ACCOUNT_TYPES.USER &&
            ( 
             <>

              <Route   path="/view-course/courseId/:courseId/sectionId/:sectionId/subSectionId/:subSectionId" element={<VideoPlayer/>}></Route>
             </>
            )

          }
          </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App
