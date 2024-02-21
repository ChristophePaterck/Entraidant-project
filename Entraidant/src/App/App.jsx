import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import styles from "./App.module.scss";
// import Homepage from "../pages/Homepage/Homepage.jsx";
import { Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import AuthProvider from "../components/AuthProvider/AuthProvider.jsx";

function App() {
  // const user = useLoaderData();
  // console.log(user);

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
