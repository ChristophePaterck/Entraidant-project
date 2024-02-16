import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Demarches_module.scss'; // Assurez-vous que ce chemin est correct

function Demarches() {
  // const navigateTo = useNavigate();

  // const redirectToAnotherPage = () => {
  //   navigateTo("/autre-page");
  // };

  return (
    <div className="container">
      <NavLink to="/administratives">
        <div className="button-container">
          <button type="button">Demarches administratives</button>
        </div>
      </NavLink>

      <NavLink to="/aides">
        <div className="button-container">
          <button type="button">Aide financière</button>
        </div>
      </NavLink>
    </div>
  );
}

export default Demarches;