import { useRouteError } from "react-router-dom";
import logo from "../../../public/img/psyko.png";


function ErrorPage() {
  // Utilisation du hook useRouteError pour obtenir les détails de l'erreur
  const error = useRouteError();
  console.error(error);
  return (
    <>
      {/* Titre de la page d'erreur */}
      <img src={logo} alt="psyko" />
      {/* Affichage du message d'erreur */}
    </>
  );
}

export default ErrorPage;
