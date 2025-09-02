import React from 'react'
import { Route, Routes , useMatch } from 'react-router-dom';
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollments from './pages/student/MyEnrollments';
import WatchCourses from './pages/student/WatchCourses';
import Loading from './componenets/student/Loading';
import Educator from './pages/educator/Educator';
import DashBoard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourses from './pages/educator/MyCourses';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Navbar from './componenets/student/Navbar';
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';
import AboutUs from "./pages/student/AboutUs";
import ContactUs from "./pages/student/ContactUs";
import PrivacyPolicy from "./pages/student/PrivacyPolicy";
import EditCourse from "./pages/educator/EditCourse";

const App =() =>{

  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer/>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/courseslist' element={<CoursesList/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/watchcourses/:courseId' element={<WatchCourses/>} />
        <Route path='/loading/:path' element={<Loading/>} />
        <Route path='/educator' element={<Educator/>}>
           <Route path='dashboard' element={<DashBoard/>}/>
           <Route path="/educator" element={<DashBoard />} />
           <Route path='add-course' element={<AddCourse/>}/>
           <Route path="edit-course/:courseId" element={<EditCourse />} /> 
           <Route path='my-courses' element={<MyCourses/>}/>
           <Route path='student-enrolled'element={<StudentsEnrolled/>}/>
           
        



        </Route>
      </Routes>
    </div>
  )
}

export default App


