
// eslint-disable-next-line no-unused-vars
import styles from"../../pages/SpecialistesCard/SpecialistesCard.module.scss"

function SpecialistesCard({ items }) {
    const handleClick = () => {
       
    };

    return (
      <div className=" ">
        {items.map((item, index) => (
          <div key={index} className={styles.specialistesCard}>
            <h3>{item.nom}</h3>
            <p>Spécialité: {item.libelleProfession}</p>
            <p>
              Localisation: {item.numeroVoie} {item.libelleVoie},{" "}
              {item.bureauCedex}
            </p>
            <div className="d-flex ">
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
