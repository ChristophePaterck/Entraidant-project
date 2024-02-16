// Import de la fonction createBrowserRouter depuis la bibliothèque react-router-dom
import { createBrowserRouter } from "react-router-dom";
// Import de la fonction lazy depuis la bibliothèque react
import { lazy } from "react";
// Import des composants nécessaires depuis leurs emplacements respectifs
import App from "./App/App.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import ServiceForm from'./pages/ServicesExchange/ServiceForm.jsx'


// import { rootLoader } from "./loaders/rootLoader.jsx";

// Utilisation de lazy loading pour charger les composants de manière dynamique
// Cela permet de ne pas charger tous les modules lors de la première connexion au site

// Composant de la page d'accueil
const Homepage = lazy(() => import("./pages/Homepage/Homepage.jsx"));
// Composant de la page des spécialistes
const Specialistes = lazy(() =>
  import("./pages/Specialistes/Specialistes.jsx")
);
// Composant de la page "À propos de nous"
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs.jsx"));
// Composant de la page des démarches
const Demarches = lazy(() => import("./pages/Demarches/Demarches.jsx"));
// Composant de la page d'échange de services
const ServicesExchange = lazy(() =>
  import("./pages/ServicesExchange/ServicesExchange.jsx")
);
// Composant de la page de messagerie
const Messagerie = lazy(() => import("./pages/Messagerie/Messagerie.jsx"));
// Composant de la page d'inscription
const SignUp = lazy(() => import("./pages/SignUp/SignUp.jsx"));
// Composant de la page de connexion
const SignIn = lazy(() => import("./pages/SignIn/SignIn.jsx"));
// Composant de la page de profil utilisateur
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));

<<<<<<< HEAD
//color
//router permettant la navigation sur le site 
=======
// Configuration du router pour la navigation sur le site
>>>>>>> 1e80929d36400729aa77755e2e93948f565116cd
export const router = createBrowserRouter([
  {
    path: "/", // Chemin racine
    element: <App />, // Élément racine de l'application
    children: [
      // Enfants de l'élément racine
      {
        index: true, // Indique que cette route est la page d'accueil
        errorElement: <ErrorPage />, // Composant à afficher en cas d'erreur
        element: <Homepage />, // Composant de la page d'accueil
      },
      {
        path: "/specialistes", // Chemin vers la page des spécialistes
        element: <Specialistes />, // Composant de la page des spécialistes
      },
      {
        path: "/quisommesnous", // Chemin vers la page "À propos de nous"
        element: <AboutUs />, // Composant de la page "À propos de nous"
      },
      {
        path: "/demarches", // Chemin vers la page des démarches
        element: <Demarches />, // Composant de la page des démarches
      },
    
      {
        path: "/services", // Chemin vers la page d'échange de services
        element: <ServicesExchange />, // Composant de la page d'échange de services
      },
      {
        path: "/messagerie", // Chemin vers la page de messagerie
        element: <Messagerie />, // Composant de la page de messagerie
      },
      {
        path: "/servicesform",
        element:<ServiceForm/>
      },
      {
        path: "/signup", // Chemin vers la page d'inscription
        element: <SignUp />, // Composant de la page d'inscription
      },
      {
        path: "/signin", // Chemin vers la page de connexion
        element: <SignIn />, // Composant de la page de connexion
      },
      {
        path: "/profile", // Chemin vers la page de profil utilisateur
        element: <Profile />, // Composant de la page de profil utilisateur
      },
    ],
  },
]);
