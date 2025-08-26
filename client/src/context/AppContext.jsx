// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import humanizeDuration from "humanize-duration";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext(null);

// export const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const currency = import.meta.env.VITE_CURRENCY;
//   const navigate = useNavigate();

//   const { getToken } = useAuth();
//   const { user } = useUser();

//   const [allCourses, setAllCourses] = useState([]);
//   const [isEducator, setIsEducator] = useState(false);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [token, setToken] = useState(null);
//   const [userData, setUserData] = useState(null);

//   // 🔹 Fetch all courses
//   const fetchAllCourses = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/course/all");
//       if (data.success) {
//         setAllCourses(data.courses);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching courses:", error);
//       toast.error("Error fetching courses");
//     }
//   };

//   // 🔹 Fetch user data
//   const fetchUserData = async () => {
//     if (user?.publicMetadata?.role === "educator") {
//       setIsEducator(true);
//     }

//     try {
//       const freshToken = await getToken();
//       setToken(freshToken); // ✅ save token globally

//       const { data } = await axios.get(backendUrl + "/api/user/data", {
//         headers: { Authorization: `Bearer ${freshToken}` },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching user data:", error);
//       toast.error("Error fetching user data");
//     }
//   };

//   // 🔹 Calculate avg rating
//   const calculateRating = (course) => {
//     if (!course.courseRatings || course.courseRatings.length === 0) return 0;
//     let totalRating = course.courseRatings.reduce(
//       (sum, r) => sum + r.rating,
//       0
//     );
//     return Math.floor(totalRating / course.courseRatings.length); // ✅ fixed
//   };

//   // 🔹 Calculate chapter time
//   const calculateChapterTime = (chapter) => {
//     let time = 0;
//     chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration));
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   // 🔹 Calculate total course duration
//   const calculateCourseDuration = (course) => {
//     let time = 0;
//     course.courseContent.forEach((chapter) =>
//       chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration))
//     );
//     return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
//   };

//   // 🔹 Count lectures
//   const calculateNoOfLectures = (course) => {
//     let totalLectures = 0;
//     course.courseContent.forEach((chapter) => {
//       if (Array.isArray(chapter.chapterContent)) {
//         totalLectures += chapter.chapterContent.length;
//       }
//     });
//     return totalLectures;
//   };

//   // 🔹 Fetch enrolled courses
//   const fetchUserEnrolledCourses = async () => {
//     try {
//       const freshToken = await getToken();
//       const { data } = await axios.get(
//         backendUrl + "/api/user/enrolled-courses",
//         { headers: { Authorization: `Bearer ${freshToken}` } }
//       );

//       if (data.success) {
//         setEnrolledCourses(data.enrolledCourses.reverse());
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching enrolled courses:", error);
//       toast.error("Error fetching enrolled courses");
//     }
//   };

//   // 🔹 Run once for courses
//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   // 🔹 When user logs in
//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//       fetchUserEnrolledCourses();
//     }
//   }, [user]);

//   // 🔹 Example publish function
//   const publishCourse = async () => {
//     if (!token) {
//       console.warn("⚠ No token available yet");
//       return;
//     }

//     try {
//       const res = await fetch(backendUrl + "/api/educator/publish", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ courseName: "New Course" }),
//       });

//       const data = await res.json();
//       console.log("📡 Publish API response:", data);
//       return data;
//     } catch (err) {
//       console.error("❌ Error publishing course:", err);
//     }
//   };

//   const value = {
//     user,
//     token,
//     currency,
//     navigate,
//     allCourses,
//     calculateRating,
//     isEducator,
//     setIsEducator,
//     calculateChapterTime,
//     calculateCourseDuration,
//     calculateNoOfLectures,
//     enrolledCourses,
//     fetchUserEnrolledCourses,
//     publishCourse,
//     backendUrl,
//     userData,
//     setUserData,
//     getToken,
//     fetchAllCourses,
//   };

//   return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
// };

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetch All Courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");

      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch UserData
  const fetchUserData = async () => {
    if (user.publicMetadata.role === "educator") {
      setIsEducator(true);
    }

    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Functions to calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  // Function to Calculate Course Chapter Time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to Calculate Course Duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate no of Lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  //Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/user/enrolled-courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logTaken = async () => {
    console.log(await getToken());
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      logTaken();
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  }, [user]);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoOfLectures,
    calculateChapterTime,
    calculateCourseDuration,
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl,
    userData,
    setUserData,
    getToken,
    fetchAllCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};