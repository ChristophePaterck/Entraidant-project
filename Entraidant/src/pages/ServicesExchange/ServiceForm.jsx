import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ServiceForm() {
  const { serviceId } = useParams(); // Récupère l'ID du service depuis l'URL
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`https://entraidant-back.onrender.com/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleSubmit = async (updatedService) => {
    try {
      await axios.patch(`https://entraidant-back.onrender.com/services/${serviceId}`, updatedService);
      // Une fois que la mise à jour est réussie, vous pouvez naviguer vers une autre page ou effectuer d'autres actions nécessaires.
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setService({ ...service, [name]: value });
  };

  if (!service) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>Modifier le service {service.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="name" value={service.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={service.description} onChange={handleChange} />
        </label>
        {/* Autres champs du formulaire */}
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}

export default ServiceForm;
