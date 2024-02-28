import styles from "./ServiceDetail.module.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import { NavLink } from "react-router-dom";

function ServiceForm() {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Récupère l'ID du service depuis l'URL
  console.log("id du service ", id);
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false); // État pour suivre si l'utilisateur est en train de modifier
  const [isModificationConfirmed, setIsModificationConfirmed] = useState(false);

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
      setIsModificationConfirmed(true);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  if (!service) {
    return <Loading />;
  }

  const isCurrentUserOwner = user.id === service.user_id;

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      {isModificationConfirmed ? (
        <div className={styles.confirmEditForm}>
          <h3>Merci !</h3>
          <p>Votre modification a été prise en compte </p>
          <NavLink to="/services" className="d-flex justify-content-center">
            <button className="btn mt-15"> Retour au service</button>
          </NavLink>
        </div>
      ) : (
        <div className={`${styles.form} d-flex flex-column card p-20`}>
          <h3 className="mb-20">{service.name}</h3>

          {/* Affichage des informations du service */}
          <div>
            <h4>Description</h4>
            <p>{service.content}</p>
            <h4>Localisation</h4>
            <p>{service.location}</p>
            <h4>Contact</h4>
            <p>{service.user.email}</p>
            {isCurrentUserOwner ? (
              <div className="d-flex justify-content-center">
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <a href={`mailto:${service.user.email}`}>
                  <button className="mr-15 btn btn-reverse-primary mt-15">
                    Contacter
                  </button>
                </a>
                <NavLink to="/services">
                  <button className="btn btn-reverse-primary mt-15">
                    Retour
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Bouton de modification (affiché uniquement si l'utilisateur est le propriétaire du service) */}
          {isCurrentUserOwner && !isEditing && (
            <div className="d-flex justify-content-center ">
              <button
                className="mr-15  mt-15 btn btn-reverse-primary"
                onClick={() => setIsEditing(true)}
              >
                Modifier
              </button>
              <NavLink to="/services" aria-label="Annuler la modification">
                <button className="mt-15 btn btn-primary">Annuler</button>
              </NavLink>
            </div>
          )}

          {/* Formulaire d'édition (affiché uniquement si l'utilisateur est le propriétaire du service et que le formulaire est en mode édition) */}
          {isEditing && isCurrentUserOwner && (
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
              <div className="d-flex justify-content-center">
                <button
                  className="mt-15 btn  btn-reverse-primary"
                  type="submit"
                >
                  Enregistrer
                </button>
                <button
                  className="btn btn-primary mt-15 ml-10"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default ServiceForm;
