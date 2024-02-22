import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import {
  signin as login,
  signout as logout,
  updateUserApi,
} from "../../apis/auth.jsx"; // Importez la fonction updateUser depuis vos API
import { useState } from "react";

function AuthProvider({ children }) {
  const initialUser = useLoaderData();
  // console.log(initialUser);
  const [user, setUser] = useState(initialUser);

  async function signin(credentials) {
    try {
      const data = await login(credentials);
      const newUser = data.data.user;
      setUser(newUser);
      console.log("Données utilisateur mises à jour :", newUser);
      if (newUser.status === "success" && newUser.token) {
        console.log("Token d'authentification reçu :", newUser.token);
        // Stocker le token dans le localStorage
      //   localStorage.setItem("token", newUser.token);
      } else {
        // Gérer les erreurs de connexion
        // console.log("une erreur est survenue");
        return data;
      }
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la connexion :", error);
      throw error; // Propager l'erreur
    }
  }

  async function signout() {
    await logout();
    setUser(null);
  }

  async function updateUser(updatedData) {
    try {
      // Envoyer les données mises à jour à la base de données
      const updatedUser = await updateUserApi(user.id, updatedData); // Supposons que updateUserApi accepte l'ID de l'utilisateur et les données mises à jour
      setUser(updatedUser); // Mettre à jour l'utilisateur dans le contexte avec les nouvelles données
      // console.log("Données utilisateur mises à jour :", updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
