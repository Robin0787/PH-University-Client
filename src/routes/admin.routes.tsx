import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import AcademicDepartment from "../pages/admin/academicManagement/academicDepartment/AcademicDepartment";
import CreateAcademicDepartment from "../pages/admin/academicManagement/academicDepartment/CreateAcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/academicFaculty/AcademicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/CreateAcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/academicSemester/CreateAcademicSemester";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "*",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semesters",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
      {
        name: "Academic Faculties",
        path: "academic-faculties",
        element: <AcademicFaculty />,
      },
      {
        name: "Academic Departments",
        path: "academic-departments",
        element: <AcademicDepartment />,
      },
      {
        name: "Create A. Semesters",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
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
        name: "Create Course",
        path: "create-course",
        element: <CreateAdmin />,
      },
      {
        name: "Offer Course",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
];
