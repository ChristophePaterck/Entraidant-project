import styles from "./ServiceDetail.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ServiceForm() {
  const { id } = useParams(); // Récupère l'ID du service depuis l'URL
  console.log("id du service ", id);
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false); // État pour suivre si l'utilisateur est en train de modifier

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `https://entraidant-back.onrender.com/services/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setService(response.data);
        // Initialiser le formulaire avec les données du service
        setFormData({
          name: response.data.name,
          content: response.data.content,
          location: response.data.location,
        });
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchService();
  }, [id]);

  // Fonction pour mettre à jour les champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour soumettre les données modifiées à la base de données
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log(formData);
    try {
      const response = await axios.patch(
        `https://entraidant-back.onrender.com/services/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Service updated successfully:", response.data);
      // Mettre à jour l'état du service avec les nouvelles données
      setService(response.data);
      setIsEditing(false); // Passer l'état d'édition à false une fois les modifications soumises
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  if (!service) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <div className={`${styles.form} d-flex flex-column card p-20`}>
        <h3 className="mb-20">{service.name}</h3>
        {isEditing ? (
          <form onSubmit={handleSubmit} className={styles.editingFormService}>
            <div className="mb-20 d-flex flex-column ">
              <label className="mb-10" htmlFor="content">
                Description:
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-20 d-flex flex-column">
              <label className="mb-10" htmlFor="location">
                Localisation:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button className="mt-15" type="submit">
                Enregistrer
              </button>
              <button
                className="mt-15 ml-10"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h4>description</h4>
            <p>{service.content}</p>
            <h4>Localisation</h4>
            <p>{service.location}</p>
            <div>
              <button className="mt-15" onClick={() => setIsEditing(true)}>
                Modifier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceForm;
