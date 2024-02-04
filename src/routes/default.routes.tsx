import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

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
