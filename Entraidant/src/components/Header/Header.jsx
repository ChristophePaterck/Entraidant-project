import { useContext, useState } from "react";
import styles from "./Header.module.scss";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu.jsx";
import logo from "../../../public/img/logoEntraidant.png";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { user, signout } = useContext(AuthContext);
  return (
    <header
      className={`${styles.header} ${styles.headerXs} d-flex flex-row align-items-center space-between`}
    >
      <NavLink to="/">
        <img src={logo} alt="Entraidant logo" />
      </NavLink>

      <div className=" ">
        <h1>Entraidant</h1>
      </div>
      {user ? (
        <div>
          <NavLink to="/profil" className={styles.headerListXs}>
            <button className="btn btn-primary mr-15">
              <span>Profile</span>
            </button>
          </NavLink>

          <button className="btn btn-primary mr-15" onClick={() => signout()}>
            <span>Déconnexion</span>
          </button>
        </div>
      ) : (
        <div>
          <NavLink to="/signin" className={styles.headerListXs}>
            <button className="btn btn-primary mr-15">
              <span>Connexion</span>
            </button>
          </NavLink>
          <NavLink to="/signup" className={styles.headerListXs}>
            <button className="btn btn-primary mr-15">
              <span>Inscription</span>
            </button>
          </NavLink>
        </div>
      )}

      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars mr-15 ${styles.burgerMenuXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc">
            <HeaderMenu />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
