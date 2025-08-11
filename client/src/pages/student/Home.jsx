import React from 'react'
import Hero from '../../componenets/student/Hero'
import Companies from '../../componenets/student/Companies'
import CoursesSection from '../../componenets/student/CoursesSection'
import Testimonial from '../../componenets/student/Testimonial'
import CallToAction from '../../componenets/student/CallToAction'
import Footer from '../../componenets/student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <Testimonial/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home
