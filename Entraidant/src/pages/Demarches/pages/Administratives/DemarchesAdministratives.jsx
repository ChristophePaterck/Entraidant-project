import styles from "./DemarchesAdministratives.module.scss";
function Administratives() {
  return (
    <>
      <h2 className={styles.demarcheTitle}>Démarches Admistratives</h2>
      <div className={`${styles.searchBarContainer}`}>
        <form className="d-flex">
          <input
            type="text"
            // value=""
            // onChange=""
            placeholder="Rechercher..."
            className={styles.searchTerm}
          />

          <button className={styles.searchButton} type="submit">
            Valider
          </button>
        </form>
      </div>
      <div className="d-flex flex-column align-items-center mt-30">
        <div className={styles.itemCard}>
          <h3>Titre</h3>
          <p>Résumé </p>
          <div className=" ">
            <div className="Name">
              <button >
                + d'infos
              </button>
            </div>
          </div>
        </div>
        <div className={styles.itemCard}>
          <h3>Titre</h3>
          <p>Résumé </p>
          <div className="d-flex ">
            <div className="Name">
              <button >
                + d'infos
              </button>
            </div>
          </div>
        </div>
        <div className={styles.itemCard}>
          <h3>Titre</h3>
          <p>Résumé </p>
          <div className="d-flex ">
            <div className="Name">
              <button>
                + d'infos
              </button>
            </div>
          </div>
        </div>
        <div className={styles.itemCard}>
          <h3>Titre</h3>
          <p>Résumé </p>
          <div className="d-flex ">
            <div className="Name">
              <button >
                + d'infos
              </button>
            </div>
          </div>
        </div>
        <div className={styles.itemCard}>
          <h3>Titre</h3>
          <p>Résumé </p>
          <div className="d-flex ">
            <div className="Name">
              <button >
                + d'infos
              </button>
            </div>
          </div>
        </div>
        <div className={styles.itemCard}>
          <h3>Titre</h3>
          <p>Résumé </p>
          <div className="d-flex ">
            <div className="Name">
              <button >
                + d'infos
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Administratives;
