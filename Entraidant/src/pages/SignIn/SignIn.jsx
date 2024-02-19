import styles from "./SignIn.module.scss"; // Importation des styles spécifiques pour la page de connexion
import { useForm } from "react-hook-form"; // Importation de la fonction useForm pour gérer les formulaires dans React
import * as yup from "yup"; // Importation de yup pour la validation du formulaire
import { yupResolver } from "@hookform/resolvers/yup"; // Importation de yupResolver pour intégrer yup avec react-hook-form
import { signin } from "../../apis/auth.jsx"; // Importation de la fonction signin depuis le fichier d'API auth.jsx
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour la navigation programmée dans React

function Signin() {
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation entre les pages

  // Schéma de validation du formulaire avec yup
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("L'email est requis")
      .email("L'email doit être valide"),
    password: yup
      .string()
      .required("Le mot de passe est requis")
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  });

  // Initialisation des valeurs par défaut du formulaire
  const initialValues = {
    email: "",
    password: "",
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
    console.log(credentials);
    try {
      clearErrors(); // Efface les erreurs précédentes
      const user = await signin(credentials); // Appel de la fonction de connexion avec les informations du formulaire
      navigate("/profil"); // Redirection vers la page de profil après la connexion réussie
    } catch (error) {
      setError("generic", { type: "generic", message: error.message }); // Affichage des erreurs génériques en cas de problème de connexion
    }
  });

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      {/* Formulaire de connexion */}
      <form
        onSubmit={submit} // Appel de la fonction de soumission du formulaire
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-10">Connexion</h2>
        {/* Champ email */}
        <div className="mb-10 d-flex flex-column">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="text"
            name="email"
            id="email"
            {...register("email")} // Enregistrement du champ email avec la fonction register de react-hook-form
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}{" "}
          {/* Affichage des erreurs email */}
        </div>
        {/* Champ mot de passe */}
        <div className="mb-10 d-flex flex-column">
          <label className="label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            {...register("password")} // Enregistrement du champ mot de passe avec la fonction register de react-hook-form
          />
          {errors.password && (
            <div className="mb-10">
              <p className="form-error">{errors.password.message}</p>
              {/* Affichage des erreurs mot de passe */}
            </div>
          )}
        </div>
        {/* Affichage des erreurs génériques */}
        {errors.generic && (
          <p className="form-error"> {errors.generic.message}</p>
        )}
        {/* Bouton de soumission du formulaire */}
        <div>
          <button disabled={isSubmitting} className="btn btn-primary">
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
