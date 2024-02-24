import styles from "./Homepage.module.scss"; // Importation des styles spécifiques pour la page d'accueil
import files from "../../../public/img/files.svg";
import question from "../../../public/img/question-mark.svg";
import services from "../../../public/img/services.svg";
import chat from "../../../public/img/chat.svg";
import healthcare from "../../../public/img/healthcare.svg";
import { NavLink } from "react-router-dom"; // Importation de NavLink pour gérer les liens de navigation

function Homepage() {
  return (
    <>
      <nav className="mt-30">
        <div
          className={`${styles.containerCardXs} d-flex justify-content-center space-between mb-20`}
        >
          {/* Liens vers différentes sections */}
          <NavLink
            to="/demarches"
            className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex justify-content-center align-items-center`}
          >
            <h4 className="ml-15">Démarches</h4>
            <p>Trouvez les démarches et aides qui correpondent à votre situation.</p>
          </NavLink>
          <NavLink
            to="/specialistes"
            className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex justify-content-center align-items-center`}
          >
            <h4 className="ml-15">Spécialistes</h4>
            <p >Trouvez un spécialiste prêt de chez vous.</p>
          </NavLink>
          <NavLink
            to="/services"
            className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex justify-content-center align-items-center`}
          >
            <h4 className="ml-15"> Services</h4>
            <p>Proposez ou recevez de l'aide gratuitement.</p>
          </NavLink>
          <NavLink
            to="/messagerie"
            className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex justify-content-center align-items-center`}
          >
            <h4 className="ml-15">Messagerie</h4>
            <p>On parle de tout et ça fait du bien.</p>
          </NavLink>
          <NavLink
            to="/quisommesnous"
            className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex justify-content-center align-items-center`}
          >
            <h4 className="ml-15">Qui sommes Nous</h4>
            <p>Pour en savoir plus sur cette plateforme.</p>
          </NavLink>
        </div>
      </nav>
      {/* Conteneur principal */}
      <div className={`${styles.mainContainerXs} ${styles.mainContainer}  `}>
        {/* Contenu principal */}
        <div className="d-flex">
          {/* Texte d'accueil */}
          <div className={`align-items-center ${styles.homepageText}`}>
            <div>
              <h1>Entraidant</h1>
            </div>
            Bienvenue sur Entraidant, un havre virtuel dédié à tisser des liens
            solides et à fournir une assistance inestimable à ceux qui
            traversent des défis physiques, moteurs ou mentaux.
            <p>
              Notre plateforme offre un espace bienveillant où la communauté se
              rassemble pour partager son soutien, son expérience et ses
              ressources.
            </p>{" "}
            <p>
              Que vous soyez en quête de conseils pratiques, d'encouragements
              chaleureux ou simplement d'une oreille attentive, Entraidant est
              là pour vous accompagner à chaque étape de votre parcours.
              Ensemble, nous pouvons surmonter les obstacles et construire un
              avenir plus inclusif et solidaire.
            </p>
            Rejoignez-nous dès aujourd'hui et découvrez la force de l'entraide !
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
