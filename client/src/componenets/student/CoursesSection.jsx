import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {

  const {allCourses} = useContext(AppContext);
  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated courses across various categories.
      From coding and design to <br/> business and personal development,
      our courses are crafted to help you achieve your learning goals.
      </p>

      <div className='grid grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4' >
        {allCourses.slice(0, 4).map((course,index) => <CourseCard key={index} course={course} />)}
      </div>



      <Link to={'/CoursesList'} onClick={()=> scrollTo(0,0)}
      className='text-gray-500 border border-gray-6000/60 px-10 py-3 rounded'>Show all courses</Link>
    </div>
  )
}

export default CourseSection
