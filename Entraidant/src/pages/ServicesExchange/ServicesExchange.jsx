import { useState, } from 'react'; // importe usehistory pour naviguer entre les url 
import '../../assets/styles/index.scss';
import '../../assets/styles/_mixins.scss';
import { NavLink } from 'react-router-dom';

function ServicesExchange() {
  // eslint-disable-next-line no-unused-vars
  const [services, setServices] = useState([

    { id: 1, category: "Compagnie et visites à domicile", description: "Nous offrons des visites à domicile ou des appels téléphoniques réguliers pour tenir compagnie aux personnes âgées ou isolées." },
    { id: 2, category: "Aide au jardinage et au bricolage", description: "Nous proposons de l'aide pour entretenir les jardins, les maisons ou pour effectuer des réparations légères." },
    { id: 3, category: "Accompagnement aux rendez-vous médicaux", description: "Des bénévoles sont disponibles pour accompagner les personnes malades ou âgées à leurs rendez-vous médicaux pour les soutenir et les rassurer." },
  ]);



  const handleEditService = (serviceId) => {
    // Rediriger vers la page de formulaire pour modifier le service avec l'ID du service

    history.push(`/services/${serviceId}`);//Cette ligne utilise l'objet history fourni par useHistory() pour effectuer la redirection. La méthode push est utilisée pour ajouter une nouvelle entrée dans l'historique de navigation, ce qui entraîne la navigation vers une nouvelle URL. Dans ce cas, l'URL spécifiée est /edit-service/${serviceId}, où ${serviceId} est l'identifiant unique du service à modifier. Cela signifie que l'utilisateur sera redirigé vers la page de formulaire de modification du service avec l'ID spécifié dans l'URL.
  };





  const [filter, setFilter] = useState(''); // initialisation du filtre avec la valeur ('') donc aucune valeur

  const handleSearch = (event) => {  // methode qui appelle un event et qui va filtré la valeur de l"event
    setFilter(event.target.value);// filtre de event et resort la value de l'event 
  };

  const filteredServices = services.filter(service => {    // condifition et mise en place du filtre
    if (!filter) return true;
    return service.category.toLowerCase().includes(filter.toLowerCase()); // si le resultat vaut true alors ce dernier est retourner avec un tolowercase
  });


  const buttonActions = {
    "Nom": "/CatégorieetLieu",
    "Add": "/servicesform", // redieection vers la page form


    // button pour la redirection vers une url quand on clique dessus 
  };

  const handleButtonClick = (buttonName) => {
    const action = buttonActions[buttonName];
    if (action) {
      window.location.href = action;    //Cette fonction handleButtonClick prend le nom d'un bouton en entrée. Elle recherche ensuite dans l'objet buttonActions l'action associée à ce nom de bouton. Si une action est trouvée, la fonction redirige l'utilisateur vers l'URL correspondante en utilisant window.location.href.
    }
  };


  return ( // on retourne tout la semanatique(jsx)
    <div className="service-Exchange">
      <header>
        <button onClick={() => handleButtonClick("Nom")}>categorie et lieux</button>
        <NavLink to="/serviceform">
          <button onClick={() => handleButtonClick("Add")}>ajouter et modifier un service</button>
        </NavLink>

      </header>
      <main>
        <div>
          <h1>Services par popularité</h1>
          <h2>Annonce : Service d'entraide pour les personnes malades ou en difficulté</h2>
          <input
            type="text"
            value={filter}
            onChange={handleSearch}
            placeholder="Filtrer par catégorie..."
          />
          <ul>
            {filteredServices.map(service => (
              <li key={service.id} className={`service-${service.id}`}>
                <strong>{service.category} :</strong>  {service.description}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ServicesExchange;


