import React, { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [token, setToken] = useState(null);

  // 🔹 Fetch all courses (for now using dummy data)
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // 🔹 Function to calculate avg rating of a course
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    let totalRating = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return totalRating / course.courseRatings.length;
  };

  // 🔹 Function to calculate chapter duration
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // 🔹 Function to calculate total course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // 🔹 Function to calculate no. of lectures
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // 🔹 Fetch enrolled courses (dummy for now)
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };

  // 🔹 Store Clerk Token when user logs in
  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const t = await getToken();
        console.log("🔑 Clerk Token:", t);
        setToken(t);
      }
    };
    fetchToken();
  }, [user, getToken]);

  // 🔹 Example: Call backend API securely with Clerk token
  const publishCourse = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/educator/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Clerk token sent here
        },
        body: JSON.stringify({ courseName: "New Course" }),
      });

      const data = await res.json();
      console.log("📡 Publish API response:", data);
      return data;
    } catch (err) {
      console.error("❌ Error publishing course:", err);
    }
  };

  // 🔹 Fetch courses on mount
  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    user,
    token,
    currency,
    navigate,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
    publishCourse, // ✅ available to call anywhere in app
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
