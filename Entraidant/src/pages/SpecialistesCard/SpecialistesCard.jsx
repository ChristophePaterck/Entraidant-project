
// eslint-disable-next-line no-unused-vars
import styles from "../../pages/SpecialistesCard/SpecialistesCard.module.scss"

function SpecialistesCard({ items }) {
  const handleClick = () => {

  };

  return (
    <div className={styles.specialistesContainer}> {/* Utilisez la classe CSS du conteneur */}
      {items.map((item, index) => (
        <div key={index} className={styles.specialistesCard}> {/* Utilisez la classe CSS de la carte */}
          <h3>{item.nom}</h3>
          <p>{item.firstname} {item.lastname}</p>
          <p>Spécialité: {item.profession}</p>
          <p>Localisation: {item.address}</p>
          <div className="d-flex button-container">
            <div className="Name">
              <button onClick={() => handleClick("/nom-page")}>
                Voir profil
              </button>
            </div>

            <div className="specialiste">
              <button onClick={() => handleClick("/specialite-page")}>
                En savoir plus
              </button>
            </div>

            <div className="location">
              <button onClick={() => handleClick("/localisation-page")}>
                Voir sur la carte
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecialistesCard;