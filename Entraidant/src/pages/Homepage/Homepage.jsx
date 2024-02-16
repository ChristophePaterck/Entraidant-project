import styles from "./Homepage.module.scss"; // Importation des styles spécifiques pour la page d'accueil
import accueil from "../../../public/img/accueil.png"; // Importation de l'image d'accueil
import files from "../../../public/img/files.svg";
import services from "../../../public/img/services.svg";
import chat from "../../../public/img/chat.svg";
import healthcare from "../../../public/img/healthcare.svg"
import { NavLink } from "react-router-dom"; // Importation de NavLink pour gérer les liens de navigation

function Homepage() {
  return (
    <div
      className={` ${styles.mainContainerXs} d-flex flex-column p-20 justify-content-center`}
    >
      {/* Conteneur principal */}
      <div
        className={` ${styles.containerCardXs} d-flex justify-content-center space-between mb-20`}
      >
        {/* Liens vers différentes sections */}
        <NavLink
          to="/demarches"
          className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex flex-column align-items-center justify-content-center`}
        >
          <img src={files} alt="logo de document" className="mb-20" />
          <h4>Démarches</h4>
        </NavLink>
        <NavLink
          to="/specialistes"
          className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex flex-column align-items-center justify-content-center`}
        >
          <img
            src={healthcare}
            alt="logo deux mains tiennent un coeur"
            className="mb-20"
          />
          <h4>Spécialistes</h4>
        </NavLink>
        <NavLink
          to="/services"
          className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex flex-column align-items-center justify-content-center`}
        >
          <img
            src={services}
            alt="logo deux mains tiennent un coeur"
            className="mb-20"
          />
          <h4>Services</h4>
        </NavLink>
        <NavLink
          to="/messagerie"
          className={`${styles.homepageLink} ${styles.cardXs} mt-30 d-flex flex-column align-items-center justify-content-center`}
        >
          <img src={chat} alt="logo messagerie" className="mb-20" />
          <h4>Messagerie</h4>
        </NavLink>
      </div>
      {/* Contenu principal */}
      <div className="d-flex">
        {/* Image d'accueil */}
        <img
          className={`${styles.homepageImg} ${styles.homepageImgXs}`}
          src={accueil}
          alt="image représentant deux mains tatouées jointes"
        />
        {/* Texte d'accueil */}
        <div className={`align-items-center ${styles.homepageText}`}>
          Bienvenue sur Entraidant, un havre virtuel dédié à tisser des liens
          solides et à fournir une assistance inestimable à ceux qui traversent
          des défis physiques, moteurs ou mentaux.
          <p>
            Notre plateforme offre un espace bienveillant où la communauté se
            rassemble pour partager son soutien, son expérience et ses
            ressources.
          </p>{" "}
          <p>
            Que vous soyez en quête de conseils pratiques, d'encouragements
            chaleureux ou simplement d'une oreille attentive, Entraidant est là
            pour vous accompagner à chaque étape de votre parcours. Ensemble,
            nous pouvons surmonter les obstacles et construire un avenir plus
            inclusif et solidaire.
          </p>
          Rejoignez-nous dès aujourd'hui et découvrez la force de l'entraide !
        </div>
      </div>
    </div>
  );
}

export default Homepage;
