import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { signin as login, signout as logout } from "../../apis/auth.jsx";
import { useState } from "react";

function AuthProvider({ children }) {
  const initialUser = useLoaderData();
  console.log(initialUser);
  const [user, setUser] = useState(initialUser);

  async function signin(credentials) {
     const data = await login(credentials);
    const newUser = data.data.user
    setUser(newUser);
    console.log("Données utilisateur mises à jour :", newUser);
    if (newUser.status === "success" && newUser.token) {
      console.log("Token d'authentification reçu :", newUser.token);
      // Stocker le token dans le localStorage
      localStorage.setItem("token", newUser.token);

      // navigate("/profil"); // Redirection vers la page de profil après la connexion réussie
    } else {
      // Gérer les erreurs de connexion
      console.log("une erreur est survenue");
    }
    setUser(newUser);
     console.log("Données utilisateur mises à jour :", newUser);
  }

  async function signout() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
