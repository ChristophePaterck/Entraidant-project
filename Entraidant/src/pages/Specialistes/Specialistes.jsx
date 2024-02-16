import { useState, useEffect } from "react";
import styles from "./Specialistes.module.scss";
import SpecialistesCard from "../SpecialistesCard/SpecialistesCard";
// import axios from 'axios';
import L from "leaflet";
import "../../assets/styles/index.scss";
import "../../assets/styles/_mixins.scss";

const items = [
  {
    id: 1,
    prenom: "NATHALIE",
    nom: "NOEL",
    libelleCommune: null,
    identificationNationalePP: "0012802252",
    libelleSavoirFaire: null,
    libelleProfession: "Opticien-Lunetier",
    numeroVoie: "64",
    libelleVoie: "COMMERSON",
    libelleTypeVoie: "Rue",
    bureauCedex: "01400 CHATILLON SUR CHALARONNE",
    codePostal: "01400",
    finess: null,
  },
  {
    id: 2,
    prenom: "Chantal",
    nom: "GOARIN",
    libelleCommune: "Belley",
    identificationNationalePP: "0016036360",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: null,
    libelleVoie: "DU CORON",
    libelleTypeVoie: "Zone industrielle",
    bureauCedex: "01300 BELLEY",
    codePostal: "01300",
    finess: "010784502",
  },
  {
    id: 3,
    prenom: "Nathalie",
    nom: "BOUDIER",
    libelleCommune: "Péronnas",
    identificationNationalePP: "0016050874",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: "131",
    libelleVoie: "JEAN MONNET",
    libelleTypeVoie: "Rue",
    bureauCedex: "01960 PERONNAS",
    codePostal: "01960",
    finess: "010789204",
  },
  {
    id: 4,
    prenom: "PHILIPPE",
    nom: "MICHON",
    libelleCommune: null,
    identificationNationalePP: "0016052102",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: "150",
    libelleVoie: "DE CRANGEAT",
    libelleTypeVoie: "Route",
    bureauCedex: "01440 VIRIAT",
    codePostal: "01440",
    finess: null,
  },
  {
    id: 5,
    prenom: "Marianne",
    nom: "THIERY",
    libelleCommune: null,
    identificationNationalePP: "0016055451",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: null,
    libelleVoie: null,
    libelleTypeVoie: null,
    bureauCedex: null,
    codePostal: null,
    finess: null,
  },
  {
    id: 6,
    prenom: "Odile",
    nom: "BLERVAQUE",
    libelleCommune: "Bourg-en-Bresse",
    identificationNationalePP: "0016670515",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: "19",
    libelleVoie: "DE L'HIPPODROME",
    libelleTypeVoie: "Boulevard",
    bureauCedex: "01009 BOURG EN BRESSE CEDEX",
    codePostal: "01009",
    finess: "010789964",
  },
  {
    id: 7,
    prenom: "Florence",
    nom: "BRASSART",
    libelleCommune: null,
    identificationNationalePP: "0016672370",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: null,
    libelleVoie: null,
    libelleTypeVoie: null,
    bureauCedex: null,
    codePostal: null,
    finess: null,
  },
  {
    id: 8,
    prenom: "Myriam",
    nom: "ROCHETTE",
    libelleCommune: "Reyrieux",
    identificationNationalePP: "0016674921",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: null,
    libelleVoie: "VEISSIEUX LE HAUT",
    libelleTypeVoie: "Route",
    bureauCedex: "01600 REYRIEUX",
    codePostal: "01600",
    finess: "010007284",
  },
  {
    id: 9,
    prenom: "Maelle",
    nom: "SAVEY GARET",
    libelleCommune: "Plateau d'Hauteville",
    identificationNationalePP: "0016676272",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: null,
    libelleVoie: "FELIX MANGINI",
    libelleTypeVoie: "Avenue",
    bureauCedex: "01110 HAUTEVILLE LOMPNES",
    codePostal: "01110",
    finess: "010000198",
  },
  {
    id: 10,
    prenom: "Florence",
    nom: "GRASSOT",
    libelleCommune: "Chanay",
    identificationNationalePP: "0016679615",
    libelleSavoirFaire: null,
    libelleProfession: "Infirmier",
    numeroVoie: "7",
    libelleVoie: "DU CHÂTEAU",
    libelleTypeVoie: "Rue",
    bureauCedex: "01420 CHANAY",
    codePostal: "01420",
    finess: "010780476",
  },
];

//coucou

export async function SearchAPI() {
  try {
    // const response = await axios.get(
    // a modifier par l'URL du back ex: localhost:5432/specialistes
    //   'https://production.api-annuaire-sante.fr/professionnel_de_santes',
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDc3Mzg0NjYsImV4cCI6MTcwNzc0MjA2Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoieW9oYW5ucGF2b25lQGdtYWlsLmNvbSJ9.g-bHd73v9QS5M_LAPgNnm0IhKN7QjtGtKU3YN8BxrQDYznWa0UKwKQKoAisCvWKu1okSpPSZts40NA9F7xqSyOFMtorIPkuRWg2VMV9xWFPpjXN9cTNS3qu5HFKpaLlgwaxIPRGpwtw14nuVkKbDMb2svDHZVN3_j8t2KttFMrKb8jGn1bwrJr16hHC1ph4-LIznZO4qqUFaEjRPFDTT5la3ZvqZHjNZOakLLPebtyIN1hprQuL_R7Delyej45lPveiqg54Bg-vdKBLZBOem9Rlp5pnLinmv8tTRGfjjh5vNvmHuY5V3opkqivKoZO86GrclOsByXpupd45Z3oSTEwNy25do7GPNEGnjU2-tVinJGpZ86dPtrO9FbKOowYE0C4XlvlPJOVEI3Gg4cilWZN9DnTrHp7uDM8FEyPKVMfTeQhO0-8cwICrFmvQNEg98tX9WoYpMmqkFaoAsX54gPhPZlQW_2mLn0ltS5rr620hBe3w3-qdo96Gazvz32nAh_t7c3PGAyjrozrkhn273zZlgZRwQx7ROJatnKR5YHv1DhlI4eFr-M4P7yrbvZsPfprGbq7e2pKohtmmbnLTT4O9LjtU_WNQXXNpX5K5sGI2NBf9htgLwEPSGXYzOH9CiQedf8wnQxmUL3mfWerQ7bL1sfE9Byx6JJUSlo92Y6KA'
    //     }
    //   }
    // );
    //en attendant la requete fonctionnelle
    const data = items;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const results = await SearchAPI();
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const buttonActions = {
    Nom: "/page-nom",
    Specialiste: "/page-specialiste",
    "region/ville/departement": "/page-region-ville-departement",
  };

  const handleButtonClick = (buttonName) => {
    const action = buttonActions[buttonName];
    if (action) {
      window.location.href = action;
    }
  };
  useEffect(() => {
    const map = L.map("mapid").setView(
      [48.8566, 2.3522],
      window.innerWidth < 768 ? 12 : 13
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

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
        <button
          className={styles.buttonContainerListes}
          onClick={() => handleButtonClick()}
        >
          Afficher la liste
        </button>
      </div>
      <div id="mapid" className={styles.mapContainer}></div>
      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          <h2>Résultats de la recherche:</h2>
          {/* <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.nom}</li>
            ))}
          </ul> */}
        </div>
      )}

      <SpecialistesCard items={searchResults} />
    </div>
  );
}

export default Specialiste;
