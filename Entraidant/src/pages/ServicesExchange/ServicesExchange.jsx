import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './ServicesExchange_module.scss'; // Import du fichier SCSS


// Fonction pour récupérer les services depuis l'API
export async function fetchServices() {
  try {
    const response = await axios.get('https://entraidant-back.onrender.com/services?limit=10', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

function ServicesExchange() {
  // State pour gérer le filtre et la liste des services
  const [filter, setFilter] = useState('');
  const [services, setServices] = useState([]);
  // Hook pour la navigation
  // Les hooks sont des fonctions spéciales fournies par React pour ajouter des fonctionnalités à un composant fonctionnel.
  // useState est un hook qui permet de déclarer des variables d'état dans un composant fonctionnel. Il renvoie un tableau contenant la valeur de l'état et une fonction pour mettre à jour cette valeur.
  // useEffect est un hook qui permet d'effectuer des effets de bord dans un composant fonctionnel. Il est utilisé pour exécuter du code côté effet de bord, comme des appels à des API, des abonnements à des événements, etc., en réponse à des changements dans le composant.
  const navigate = useNavigate();

  // Effet pour charger les services initiaux lors du montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les services
    const fetchInitialData = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchInitialData();
  }, []); // [] signifie que cet effet ne sera exécuté qu'une fois après le montage initial

  // Fonction pour gérer la saisie dans le champ de recherche
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  };



  const handleButtonClick = (buttonName) => {
    if (buttonName === "Nom") {
      // Naviguer vers la page de modification de service
      navigate("/category");
    } else if (buttonName === "Add") {
      // Naviguer vers la page d'ajout/modification de service
      navigate("/services/:id");
    }
  };


  // Filtrage des services en fonction du filtre
  const filteredServices = services.filter(service => {
    if (!filter) return true; // Si aucun filtre, retourner tous les services
    // Vérifier si la catégorie du service est définie et non nulle, puis vérifier si elle inclut le filtre (insensible à la casse)
    return service.name.toLowerCase().includes(filter.toLowerCase());
  });


  return (
    <div className="service-Exchange">
      <header>
        {/* Boutons de navigation */}
        <button onClick={() => handleButtonClick("Nom")}>categorie et lieux</button>
        <button onClick={() => handleButtonClick("Add")}>ajouter et modifier un service</button>
      </header>
      <main>
        <div>
          {/* Titres et champs de recherche */}
          <h1>Services par popularité</h1>
          <h2>Annonce : Service d'entraide pour les personnes malades ou en difficulté</h2>
          <input
            type="text"
            value={filter}
            onChange={handleSearch}
            placeholder="Filtrer par catégorie..."
          />
          {/* Liste des services filtrés */}
          <ul>
            {filteredServices.slice(0, 10).map(service => (
              <li key={service.id} className={`service-${service.id}`}>
                {/* Affichage des détails du service */}
                <strong>{service.name} :</strong> {service.content}
                {/* Bouton pour modifier le service */}
                <div onClick={() => handleEditService(service.id)}></div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ServicesExchange;
