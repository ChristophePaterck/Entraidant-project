import { useState } from "react";
import styles from "./DemarchesAdministratives.module.scss";
import data from "../../../../data/demarchesdata.json";
import { NavLink, useMatch } from "react-router-dom";

function Administratives() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const matchDemarches = useMatch("/administratives")

  const demarches = data;

  // Fonction de filtrage des démarches administratives en fonction du terme de recherche et de la catégorie sélectionnée
  const filteredDemarches = demarches.filter((demarche) => {
    return (
      (demarche.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "") &&
      (selectedCategory === "Toutes" || demarche.categorie === selectedCategory)
    );
  });

  // Récupération de toutes les catégories uniques
  const categories = [
    "Toutes",
    ...new Set(demarches.map((demarche) => demarche.categorie)),
  ];

  return (
    <>
      <h2 className={styles.demarcheTitle}>Démarches Administratives</h2>
      <div className={`${styles.searchBarContainer}`}>
        <form className="d-flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par titre..."
            className={styles.searchTerm}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button className={styles.searchButton} type="submit">
            Valider
          </button>
        </form>
      </div>
      <div className="d-flex flex-column align-items-center mt-30">
        {filteredDemarches.map((demarche, index) => (
          <div key={index} className={styles.itemCard}>
            <h3>{demarche.titre}</h3>
            <p>{demarche.resume}</p>
            <p>Catégorie: {demarche.categorie}</p>
            <div className="d-flex">
              <div className="Name">
                <NavLink to={`/demarche/${demarche.id}`}>
                  <button>+ d'infos</button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Administratives;
