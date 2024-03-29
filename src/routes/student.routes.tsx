import StudentDashboard from "../pages/student/StudentDashboard";
import EnrolledCourses from "../pages/student/enrolledCourses/EnrolledCourses";
import MyOfferedCourses from "../pages/student/myOfferedCourses/MyOfferedCourses";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "*",
    element: <StudentDashboard />,
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <MyOfferedCourses />,
      },
      {
        name: "Enrolled Courses",
        path: "enrolled-courses",
        element: <EnrolledCourses />,
      },
    ],
  },
];
