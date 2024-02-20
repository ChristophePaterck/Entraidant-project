import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ServiceForm() {
  const { serviceId } = useParams(); // Récupère l'ID du service depuis l'URL
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`https://entraidant-back.onrender.com/servicesform/:serviceId`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };
    fetchService();
  }, [serviceId]);

  if (!service) {
    return <div>Loading</div>;
  }






}  
export default ServiceForm;



