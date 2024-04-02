import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/myCourses/MyCourses";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "*",
    element: <FacultyDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "My Courses",
        path: "my-courses",
        element: <MyCourses />,
      },
    ],
  },
];
