
import { NavLink } from 'react-router-dom';
import styles from "./Demarches.module.scss"; // Assurez-vous que ce chemin est correct

function Demarches() {

  return (
    <div className={` ${styles.container} d-flex justify-content-center mt-30 align-items-center`}>
      <NavLink to="/administratives">
        <div>
          <button className="btn btn-reverse-primary" type="button">
            Demarches administratives
          </button>
        </div>
      </NavLink>

      <NavLink to="/aides">
        <div>
          <button className="btn btn-reverse-primary" type="button">
            Aides financières
          </button>
        </div>
      </NavLink>
    </div>
  );
}

export default Demarches;