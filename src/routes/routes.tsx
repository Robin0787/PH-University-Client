import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { USER_ROLE } from "../constant/user.roles";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { defaultPaths } from "./default.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(defaultPaths),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={USER_ROLE.ADMIN}>
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role={USER_ROLE.FACULTY}>
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role={USER_ROLE.STUDENT}>
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(studentPaths),
  },
]);

export default router;
