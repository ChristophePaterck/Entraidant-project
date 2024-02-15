import styles from "./HeaderMenu.module.scss"
import { NavLink } from "react-router-dom";

function HeaderMenu() {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <NavLink to="signin">
        <li>connexion</li>
      </NavLink>

      <NavLink to="/signup">
        {" "}
        <li>inscription</li>
      </NavLink>
    </ul>
  );
}

export default HeaderMenu;