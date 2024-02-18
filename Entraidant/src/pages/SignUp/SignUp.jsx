import styles from "./SignUp.module.scss"; // Importation des styles spécifiques pour la page d'inscription
import { useForm } from "react-hook-form"; // Importation de la fonction useForm pour gérer les formulaires dans React
import * as yup from "yup"; // Importation de yup pour la validation du formulaire
import { yupResolver } from "@hookform/resolvers/yup"; // Importation de yupResolver pour intégrer yup avec react-hook-form
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour la navigation programmée dans React
import { createUser } from "../../apis/users.jsx"; // Importation de la fonction createUser depuis le fichier d'API users.jsx

function SignUp() {
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation entre les pages

  // Schéma de validation du formulaire avec yup
  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Le nom d'utilisateur est requis")
      .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères"),
    firstname: yup
      .string()
      .required("Le prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastname: yup
      .string()
      .required("Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: yup
      .string()
      .required("L'email est requis")
      .email("L'email doit être valide"),
    password: yup
      .string()
      .required("Le mot de passe est requis")
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
  });

  // Initialisation des valeurs par défaut du formulaire
  const initialValues = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const submit = handleSubmit(async (user) => {
    console.log(user);
    // Affichage des données de l'utilisateur dans la console
    try {
      clearErrors(); // Efface les erreurs précédentes
      await createUser(user); // Appel de la fonction de création d'utilisateur avec les informations du formulaire
      navigate("/signin"); // Redirection vers la page de connexion après l'inscription réussie
    } catch (error) {
      setError("generic", {
        type: "generic",
        message: error.message,
      }); // Affichage des erreurs génériques en cas de problème lors de l'inscription
    }
  });
  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <form
        onSubmit={submit}
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-10">Inscription</h2>
        <div className="mb-10 d-flex flex-column ">
          <label className="label" htmlFor="username">
            Nom d'utilisateur
          </label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <p className="form-error">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column ">
          <label className="label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="input"
            type="text"
            name="firstname"
            id="firstname"
            {...register("firstname")}
          />
          {errors.firstname && (
            <p className="form-error">{errors.firstname.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column ">
          <label className="label" htmlFor="lastname">
            Nom
          </label>
          <input
            className="input"
            type="text"
            name="lastname"
            id="lastname"
            {...register("lastname")}
          />
          {errors.lastname && (
            <p className="form-error">{errors.lastname.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="text"
            name="email"
            id="email"
            {...register("email")}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label className="label" htmlFor="confirmPassword">
            Confirmation password
          </label>
          <input
            className="input"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword && (
            <div className="mb-10">
              <p className="form-error">{errors.confirmPassword.message}</p>
            </div>
          )}
        </div>
        {errors.generic && (
          <div className="mb-10">
            <p className="form-error">{errors.generic.message}</p>
          </div>
        )}
        <div>
          <button disabled={isSubmitting} className="btn btn-primary mt-30">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
