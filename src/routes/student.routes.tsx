import CreateStudent from "../pages/admin/CreateStudent";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "*",
    element: <StudentDashboard />,
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
];
