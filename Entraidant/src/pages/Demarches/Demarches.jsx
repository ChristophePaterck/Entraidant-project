
import { NavLink, Outlet } from 'react-router-dom';
import styles from "./Demarches.module.scss"; // Assurez-vous que ce chemin est correct

function Demarches() {

  return (
    <div className="d-flex flex-column flex-fill">
      <div
        className={` ${styles.container} d-flex justify-content-center mt-30 align-items-center`}
      >
        <NavLink aria-label='administratives' to="administratives">
          <div>
            <button className="btn btn-reverse-primary" type="button">
              Demarches administratives
            </button>
          </div>
        </NavLink>

        <NavLink aria-label='aides' to="aides">
          <div>
            <button className="btn btn-reverse-primary" type="button">
              Aides financières
            </button>
          </div>
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Demarches;