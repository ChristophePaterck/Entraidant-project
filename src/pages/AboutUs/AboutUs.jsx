import styles from "./AboutUs.module.scss";

function AboutUs() {
  return (
    <div>
      {/* Div conteneur avec des styles personnalisés */}
      <div className={styles.ultimateContainer}>
        <div className={styles.container}>
          {/* Div de contenu avec des styles personnalisés */}
          <div className={styles.content}>
            {/* En-tête */}
            <h1>Qui sommes-nous ?</h1>
            {/* Paragraphe décrivant le but de la plateforme */}
            <p>
              Bienvenue sur Entraidant, un havre virtuel dédié à tisser des
              liens solides et à fournir une assistance inestimable à ceux qui
              traversent des défis physiques, moteurs ou mentaux. Notre
              plateforme offre un espace bienveillant où la communauté se
              rassemble pour partager son soutien, son expérience et ses
              ressources. Que vous soyez en quête de conseils pratiques,
              d'encouragements chaleureux ou simplement d'une oreille attentive,
              Entraidant est là pour vous accompagner à chaque étape de votre
              parcours. Ensemble, nous pouvons surmonter les obstacles et
              construire un avenir plus inclusif et solidaire. Rejoignez-nous
              dès aujourd'hui et découvrez la force de l'entraide !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
