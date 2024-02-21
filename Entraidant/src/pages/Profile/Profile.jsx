import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { AuthContext } from "../../context/AuthContext.jsx";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user)
  const [isLoading, setIsLoading] = useState(true);

  // Utiliser useEffect pour détecter les changements dans les données utilisateur
  useEffect(() => {
    // Vérifier si l'utilisateur est défini
    if (user) {
      setIsLoading(false); // Mettre à jour l'état isLoading à false une fois que les données utilisateur sont disponibles
    }
  }, [user]);

  // Afficher un indicateur de chargement tant que les données utilisateur sont en cours de chargement
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Afficher les données de l'utilisateur
  return (
    <div className="flex-fill d-flex justify-content-center align-items-center">
      <div className={`${styles.profilecontainer} card p-20`}>
        <h3 className="mb-20">Page de profile</h3>
        <ul>
          <li>Username : {user.username}</li>
          <li>Prénom : {user.firstname}</li>
          <li>Nom : {user.lastname}</li>
          <li>Email : {user.email}</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
