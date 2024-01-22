import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const defaultPaths = [
  {
    name: "Home",
    index: true,
    element: <Home />,
  },
  {
    name: "About",
    path: "about",
    element: <About />,
  },
  {
    name: "Contact",
    path: "contact",
    element: <Contact />,
  },
  {
    name: "Login",
    path: "login",
    element: <Login />,
  },
  {
    name: "Register",
    path: "register",
    element: <Register />,
  },
];
