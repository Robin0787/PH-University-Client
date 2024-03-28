import StudentDashboard from "../pages/student/StudentDashboard";
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
    ],
  },
];
