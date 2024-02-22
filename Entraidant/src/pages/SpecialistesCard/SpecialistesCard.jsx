/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-unused-vars
import styles from "../../pages/SpecialistesCard/SpecialistesCard.module.scss"

function SpecialistesCard({ items, mapRef, handleLocationClick }) {
  const handleClick = () => {
    // Gérer le clic
  };  

  return (
    <div className={styles.specialistesContainer}>
      {items.map((item, index) => (
        <div key={index} className={styles.specialistesCard}>
          <h3>{item.nom}</h3>
          <p>{item.firstname} {item.lastname}</p>
          <p>Spécialité: {item.profession}</p>
          <p>Localisation : {item.street_number} {item.street_type} {item.street_name} {item.office_postal_address} {item.contact} </p>



          


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
              <button onClick={() => handleLocationClick(item.latitude, item.longitude)}>
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
