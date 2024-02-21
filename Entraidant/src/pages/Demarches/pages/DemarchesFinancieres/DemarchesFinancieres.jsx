import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./DemarchesFinancieres.module.scss"
import data from "../../../../data/aides.json";

function DemarchesFinancieres() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  const aides = data;

  // Fonction de filtrage des démarches administratives en fonction du terme de recherche et de la catégorie sélectionnée
  const filteredAides = aides.filter((demarche) => {
    return (
      (demarche.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "") &&
      (selectedCategory === "Toutes" || demarche.categorie === selectedCategory)
    );
  });

  // Récupération de toutes les catégories uniques
  const categories = [
    "Toutes",
    ...new Set(aides.map((demarche) => demarche.categorie)),
  ];

  return (
    <>
      <h2 className={styles.demarcheTitle}>Aides</h2>
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
        {filteredAides.map((aide, index) => (
          <div key={index} className={styles.itemCard}>
            <h3>{aide.titre}</h3>
            <p>{aide.resume}</p>
            <p>Catégorie: {aide.categorie}</p>
            <div className="d-flex">
              <div className="Name">
                <NavLink to={`/aide/${aide.id}`}>
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

export default DemarchesFinancieres;
