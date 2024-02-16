import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export async function SearchAPI() {
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
  const [filter, setFilter] = useState('');
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await SearchAPI();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  };


  const filteredServices = services.filter(service => {
    if (!filter) return true;
    return service.category.toLowerCase().includes(filter.toLowerCase());
  });

  const handleEditService = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const buttonActions = {
    "Nom": "/CatégorieetLieu",
    "Add": "/servicesform",
  };

  const handleButtonClick = (buttonName) => {
    const action = buttonActions[buttonName];
    if (action) {
      navigate(action);
    }
  };

  return (
    <div className="service-Exchange">
      <header>
        <button onClick={() => handleButtonClick("Nom")}>categorie et lieux</button>
        <NavLink to="/servicesform">
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
            {filteredServices.slice(0,10).map(service => (
              <li key={service.id} className={`service-${service.id}`}>
                <strong>{service.name} :</strong> {service.content}
                <button onClick={() => handleEditService(service.id)}>Modifier</button>
              </li>
            ))}
          </ul>

        </div>
      </main>
    </div>
  );
}

export default ServicesExchange;
