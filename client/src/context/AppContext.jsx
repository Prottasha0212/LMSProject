

import React, { createContext, useState, useEffect, use } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate();

  const [allCourses,setAllCourses]=useState([]);
  const [isEducator,setIsEducator]=useState(true);
  const [enrolledCourses,setEnrolledCourses] = useState([])

  //fetch all courses from the server
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  }
// function to calculate avg rating of crs
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0){
      return 0;
    }
    let totalRating=0
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return (totalRating / course.courseRatings.length);
  };

  //function calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time=0
    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000, { units: ["h","m"]});
    
  };

  //function to calc course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter)=> chapter.chapterContent.map(
      (lecture)=>time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //function calc to no of lectures in the course
  const calculateNoOfLectures =(course)=>{
    let totalLectures = 0;
    course.courseContent.forEach(chapter=>{
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }
  //fetch enrolled crses
  const fetchUserEnrolledCourses=async ()=>{
    setEnrolledCourses(dummyCourses)
  }


  // useEffect to fetch all courses on component mount
useEffect(() =>{
  fetchAllCourses();
},[]);

  const value = {
    user,
    setUser,
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,

  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
