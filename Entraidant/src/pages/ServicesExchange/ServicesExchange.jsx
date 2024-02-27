import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./ServicesExchange.module.scss"; // Import du fichier SCSS
import Loading from "../../components/Loading/Loading.jsx";

// Fonction pour récupérer les services depuis l'API
export async function fetchServices() {
  try {
    const response = await axios.get(
      "https://entraidant-back.onrender.com/services?limit=20",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("reponse du fetch des service", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

function ServicesExchange() {
  // State pour gérer le filtre et la liste des services
  const [filter, setFilter] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  // Hook pour la navigation
  // Les hooks sont des fonctions spéciales fournies par React pour ajouter des fonctionnalités à un composant fonctionnel.
  // useState est un hook qui permet de déclarer des variables d'état dans un composant fonctionnel. Il renvoie un tableau contenant la valeur de l'état et une fonction pour mettre à jour cette valeur.
  // useEffect est un hook qui permet d'effectuer des effets de bord dans un composant fonctionnel. Il est utilisé pour exécuter du code côté effet de bord, comme des appels à des API, des abonnements à des événements, etc., en réponse à des changements dans le composant.


  // Effet pour charger les services initiaux lors du montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les services
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally{
           setLoading(false);
      }
    };
    fetchInitialData();
  }, []); // [] signifie que cet effet ne sera exécuté qu'une fois après le montage initial

  // Fonction pour gérer la saisie dans le champ de recherche
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  };

  // Filtrage des services en fonction du filtre
  const filteredServices = services.filter((service) => {
    if (!filter) return true; // Si aucun filtre, retourner tous les services
    // Vérifier si la catégorie du service est définie et non nulle, puis vérifier si elle inclut le filtre (insensible à la casse)
    return service.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* Titres et champs de recherche */}
          <h1 className={`${styles.serviceTitle} mt-15 mb-20`}>
            Services proposés
          </h1>

          <div>
            <div className={styles.searchBarContainer}>
              <input
                className={styles.searchTerm}
                type="text"
                value={filter}
                onChange={handleSearch}
                placeholder="Rechercher un service..."
              />
            </div>
            {/* Boutons de navigation */}
            {/* <button onClick={() => handleButtonClick("Nom")}>
          categorie et lieux
        </button> */}
            <div className="d-flex justify-content-center">
              <NavLink aria-label="services et creation " to="/service/create">
                <button>Proposer un service</button>
              </NavLink>
            </div>
            {/* Liste des services filtrés */}
            <ul className="d-flex flex-column align-items-center mt-30">
              {filteredServices.map((service) => (
                <li
                  key={service.id}
                  className={`${styles.itemCard} d-flex flex-column`}
                >
                  {/* Affichage des détails du service */}
                  <h4 className="mb-10">{service.name} :</h4>
                  <p>{service.content}</p>
                  <div>
                    <NavLink aria-label="services sélectionner" to={`/services/${service.id}`}>
                      <button>voir +</button>
                    </NavLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ServicesExchange;
