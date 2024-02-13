import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./loaders/rootLoader.jsx";
import { lazy } from "react";
import App from "./App/App.jsx";
// import Homepage from "./pages/Homepage/Homepage.jsx";
// import Specialistes from "./pages/Specialistes/Specialistes.jsx";
// import AboutUs from "./pages/AboutUs/AboutUs.jsx";
// import Demarches from "./pages/Demarches/Demarches.jsx";
// import ServicesExchange from "./pages/ServicesExchange/ServicesExchange.jsx";
// import Messagerie from "./pages/Messagerie/Messagerie.jsx";
// import SignUp from "./pages/SignUp/SignUp.jsx";
// import SignIn from "./pages/SignIn/SignIn.jsx";
// import Profile from "./pages/Profile/Profile.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

const Homepage = lazy(() => import("./pages/Homepage/Homepage.jsx"));
const Specialistes = lazy(() => import("./pages/Specialistes/Specialistes.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs.jsx"));
const Demarches = lazy(() => import("./pages/Demarches/Demarches.jsx"));
const ServicesExchange = lazy(() => import("./pages/ServicesExchange/ServicesExchange.jsx"));
const Messagerie = lazy(() => import("./pages/Messagerie/Messagerie.jsx"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp.jsx"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: rootLoader,
    children: [
      {
        index: true,
        errorElement: <ErrorPage />,
        element: <Homepage />,
      },
      {
        path: "/specialistes",
        element: <Specialistes />,
      },
      {
        path: "/quisommesnous",
        element: <AboutUs />,
      },
      {
        path: "/demarches",
        element: <Demarches />,
      },
      {
        path: "/services",
        element: <ServicesExchange />,
      },
      {
        path: "/messagerie",
        element: <Messagerie />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
