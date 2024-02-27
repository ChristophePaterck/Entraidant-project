import styles from "./AddService.module.scss"; // Importation des styles spécifiques pour la page d'inscription
import { useForm } from "react-hook-form"; // Importation de la fonction useForm pour gérer les formulaires dans React
import * as yup from "yup"; // Importation de yup pour la validation du formulaire
import { yupResolver } from "@hookform/resolvers/yup"; // Importation de yupResolver pour intégrer yup avec react-hook-form
import { NavLink, useNavigate } from "react-router-dom"; // Importation de useNavigate pour la navigation programmée dans React
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useContext, useState } from "react";

function AddService() {
  const { user } = useContext(AuthContext);
   const [isNewServiceConfirmed, setIsNewServiceConfirmed] =
     useState(false);

  // Schéma de validation du formulaire avec yup
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Le nom du service est requis")
      .min(5, "Le nom  doit contenir au moins 5 caractères"),
    content: yup
      .string()
      .required("Vous devez décrire le service proposé")
      .min(15, "La description doit contenir au moins 15 caractères"),
    location: yup
      .string()
      .required("La localisation est requise")
      .min(5, "la localisation doit contenir au moins 5 caractères"),
  });

  // Initialisation des valeurs par défaut du formulaire
  const initialValues = {
    name: "",
    content: "",
    location: "",
  };

  // Utilisation de useForm avec le schéma de validation
  const {
    handleSubmit, // Fonction pour gérer la soumission du formulaire
    register, // Fonction pour enregistrer les champs du formulaire
    formState: { errors, isSubmitting }, // État du formulaire contenant les erreurs et l'état de soumission
    setError, // Fonction pour définir les erreurs de formulaire
    clearErrors, // Fonction pour effacer les erreurs de formulaire
  } = useForm({
    initialValues, // Valeurs initiales du formulaire
    resolver: yupResolver(validationSchema), // Utilisation de yupResolver pour intégrer yup avec react-hook-form
  });

  // Fonction de soumission du formulaire
  const submit = handleSubmit(async (credentials) => {
    const token = localStorage.getItem("token");
    const userId = user.id;
    console.log("id de l'utilisateur modifiant le service", userId);
    // Affichage des données de l'utilisateur dans la console
    credentials.user_id = userId;
    credentials.date = new Date();
    credentials.tag_id = 5;
    console.log(credentials.tag_id)
    try {
      clearErrors(); // Efface les erreurs précédentes
      const response = await fetch(
        "https://entraidant-back.onrender.com/services",
        {
          method: "POST", // Méthode de la requête : POST
          headers: {
            "Content-Type": "application/json", // Type de contenu de la requête : JSON
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credentials), // Corps de la requête : informations d'identification au format JSON
        }
      );

      // Attend la réponse de l'API et la traite comme une réponse JSON
      const body = await response.json();
      console.log("le body de la requete de modification deu service", body);
      // Si la réponse du serveur est "ok" (statut HTTP 200), retourne le corps de la réponse
      if (response.ok) {
        console.log(body);
        setIsNewServiceConfirmed(true)
        return body;
      } else {
        // Si la réponse contient des données JSON, lance une exception avec ce corps
        if (body) {
          throw body;
        } else {
          // Sinon, lance une nouvelle instance de l'erreur avec un message par défaut
          throw new Error("Oops une erreur est survenue");
        }
      } // Appel de la fonction de création d'utilisateur avec les informations du formulaire
    } catch (error) {
      let errorMessage = "Une erreur est survenue lors de la requête";
      if (error instanceof Error) {
        errorMessage = error.message;
        if (error.name) {
          errorMessage += ` (${error.name})`;
        }
        if (error.stack) {
          console.error(error.stack);
        }
      }
      setError("generic", {
        type: "generic",
        message: errorMessage,
      }); // Affichage des erreurs génériques en cas de problème lors de l'inscription
    }
  });
  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      {isNewServiceConfirmed ? (
        <div
          className={`${styles.confirmAddForm} d-flex flex-column mt-15 text-success`}
        >
          <h3>Merci !</h3>
          <p>Service Ajouté avec succès </p>
          <NavLink aria-label="services" to="/services" className="d-flex justify-content-center">
            <button className="btn mt-15"> Retour au service</button>
          </NavLink>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className={`${styles.form} d-flex flex-column card p-20`}
        >
          <h2 className="mb-10">Service proposé</h2>
          <div className="mb-10 d-flex flex-column ">
            <label className="label" htmlFor="name">
              Nom du service
            </label>
            <input
              className="input"
              type="text"
              name="name"
              id="name"
              {...register("name")}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="mb-10 d-flex flex-column ">
            <label className="label" htmlFor="content">
              Description
            </label>
            <textarea
              className="input"
              type="text"
              name="content"
              id="content"
              {...register("content")}
            />
            {errors.content && (
              <p className="form-error">{errors.content.message}</p>
            )}
          </div>
          <div className="mb-10 d-flex flex-column ">
            <label className="label" htmlFor="location">
              Localisation
            </label>
            <input
              className="input"
              type="text"
              name="location"
              id="location"
              {...register("location")}
            />
            {errors.location && (
              <p className="form-error">{errors.location.message}</p>
            )}
          </div>

          {errors.generic && (
            <div className="mb-10">
              <p className="form-error">{errors.generic.message}</p>
            </div>
          )}
          <div>
            <button
              disabled={isSubmitting}
              className="btn btn-reverse-primary mt-30"
            >
              Ajouter
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddService;
