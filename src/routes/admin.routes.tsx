import AdminDashboard from "../pages/admin/AdminDashboard";
import AcademicDepartments from "../pages/admin/academicManagement/academicDepartment/AcademicDepartments";
import CreateAcademicDepartment from "../pages/admin/academicManagement/academicDepartment/CreateAcademicDepartment";
import AcademicFaculties from "../pages/admin/academicManagement/academicFaculty/AcademicFaculties";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/CreateAcademicFaculty";
import AcademicSemesters from "../pages/admin/academicManagement/academicSemester/AcademicSemesters";
import CreateAcademicSemester from "../pages/admin/academicManagement/academicSemester/CreateAcademicSemester";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses";
import RegisteredSemesters from "../pages/admin/semesterRegistration/RegisteredSemesters";
import SemesterRegistration from "../pages/admin/semesterRegistration/SemesterRegistration";
import Admins from "../pages/admin/userManagement/Admins";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import Faculties from "../pages/admin/userManagement/Faculties";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import Students from "../pages/admin/userManagement/Students";

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
        element: <AcademicSemesters />,
      },
      {
        name: "Academic Faculties",
        path: "academic-faculties",
        element: <AcademicFaculties />,
      },
      {
        name: "Academic Departments",
        path: "academic-departments",
        element: <AcademicDepartments />,
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
        name: "Students",
        path: "students",
        element: <Students />,
      },
      {
        name: "Faculties",
        path: "faculties",
        element: <Faculties />,
      },
      {
        name: "Admins",
        path: "admins",
        element: <Admins />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
    ],
  },
];
