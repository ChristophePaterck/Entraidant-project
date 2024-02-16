import { useState, useEffect, useRef } from 'react';
import styles from "./Specialistes.module.scss";
import SpecialistesCard from "../SpecialistesCard/SpecialistesCard";
import axios from 'axios';
import L from 'leaflet';
import '../../assets/styles/index.scss';
import '../../assets/styles/_mixins.scss';



// Définissez les options de votre icône personnalisée



const customIconOptions = {
  iconUrl: 'img/icone.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
};





function addMarkersToMap(map, items) {
  items.forEach(item => {
    if (item.latitude && item.longitude) {
      L.marker([item.latitude, item.longitude]).addTo(map);
    }
  });
}



export async function SearchAPI() {

  try {
    const response = await axios.get(
      // a modifier par l'URL du back ex: localhost:5432/specialistes
      'https://entraidant-back.onrender.com/specialist',
      {
        headers: {
          'Content-Type': 'application/json',

        }
      }
    );
    //en attendant la requete fonctionnelle
    const data = response.data;
    console.log("youpi");
    // pour quand on arrivera à utiliser l'API
    // console.log(response.data['hydra:member']);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


function Specialiste() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showList, setShowList] = useState(false);


  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const results = await SearchAPI();
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleShowList = () => {
    setShowList(true); // Afficher la liste lorsque le bouton est cliqué
  };



  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const buttonActions = {
    "Nom": "/page-nom",
    "Specialiste": "/page-specialiste",
    "region/ville/departement": "/page-region-ville-departement"
  };

  const handleButtonClick = async (buttonName) => {
    try {
      let results;
      if (buttonName === "Nom" || buttonName === "Specialiste" || buttonName === "region/ville/departement") {
        // Si vous souhaitez exécuter une action spécifique pour chaque bouton, vous pouvez utiliser la logique ci-dessous
        const action = buttonActions[buttonName];
        if (action) {
          window.location.href = action;
        }
      } else {
        // Si le bouton est destiné à récupérer des résultats via l'API, appelez SearchAPI
        results = await SearchAPI();
        setSearchResults(results);
        // Après avoir récupéré les résultats, ajoutez les marqueurs à la carte
        addMarkersToMap(mapRef.current, results);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Créez une référence mutable pour stocker l'instance de la carte Leaflet
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await SearchAPI();
        setSearchResults(results);

        if (!mapRef.current) {
          // Créez une icône personnalisée pour les marqueurs
          const customIcon = L.icon(customIconOptions);

          // Initialisez la carte Leaflet et définissez sa vue
          mapRef.current = L.map('mapid').setView([48.8566, 2.3522], window.innerWidth < 768 ? 12 : 13);

          // Ajoutez une couche de tuiles OpenStreetMap à la carte
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(mapRef.current);

          // Ajoutez un gestionnaire d'événements pour le clic sur la carte
          mapRef.current.on('click', function (event) {
            const { lat, lng } = event.latlng;
            addMarkerToMap(mapRef.current, lat, lng, customIcon); // Passer customIcon comme argument
          });
        }
        const addMarkerToMap = (map, lat, lng, customIcon) => {
          L.marker([lat, lng], { icon: customIcon }).addTo(map);
        };


        // Ajoutez des marqueurs initiaux à la carte en utilisant les données initiales
        addMarkersToMap(mapRef.current, results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData(); // Appeler la fonction fetchData ici pour récupérer les données
  }, []);

  const filterResults = () => {
    return searchResults.filter(result =>
      result.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };



  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Rechercher..."
            className={styles.searchTerm}
          />

          <button className={styles.searchButton} type="submit">
            Valider
          </button>
        </form>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={() => handleButtonClick("Nom")}>Nom</button>
        <button onClick={() => handleButtonClick("Specialiste")}>
          Spécialiste
        </button>
        <button onClick={() => handleButtonClick("region/ville/departement")}>
          Région/Ville/Département
        </button>
      </div>

      <div className={styles.buttonContainerListe}>
       
      </div>
      <div id="mapid" className={styles.mapContainer}></div>

      {showList && ( // Vérifiez la condition showList
        <div className={styles.searchResults}> {/* Ajoutez className à la balise div */}
          <h2>Résultats de la recherche:</h2>
          <ul>
          {filterResults().map((result, index) => (
              <li key={index}>{result.firstname} {result.lastname}</li>
            ))}
          </ul>
        </div>
      )}

    <SpecialistesCard items={filterResults()} />
    </div> 
  )
  }
export default Specialiste;
