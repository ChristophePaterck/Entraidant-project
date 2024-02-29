import styles from "./HeaderMenu.module.scss"
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";

function HeaderMenu() {
const { user, signout } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <ul className={`${styles.MenuContainer} card p-20`}>
          <NavLink to="profil">
            <li>Profile</li>
          </NavLink>

          <NavLink to="/">
            <li onClick={() => signout()}>Déconnexion</li>
          </NavLink>
        </ul>
      ) : (
        <ul className={`${styles.MenuContainer} card p-20`}>
          <NavLink to="signin">
            <li>Connexion</li>
          </NavLink>

          <NavLink to="/signup">
            <li>Inscription</li>
          </NavLink>
        </ul>
      )}
    </>
  );
}

export default HeaderMenu;