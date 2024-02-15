import { useRouteError } from "react-router-dom";

function ErrorPage() {
  // Utilisation du hook useRouteError pour obtenir les détails de l'erreur
  const error = useRouteError();

  return (
    <>
      {/* Titre de la page d'erreur */}
      <h2>ErrorPage</h2>
      {/* Affichage du message d'erreur */}
      <p>{error.statusText}</p>
    </>
  );
}

export default ErrorPage;
