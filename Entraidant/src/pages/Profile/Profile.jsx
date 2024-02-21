import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { AuthContext } from "../../context/AuthContext.jsx";

function Profile() {
  const { user, updateUser } = useContext(AuthContext); // Ajoutez une fonction `updateUser` du contexte pour mettre à jour l'utilisateur
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Ajoutez un état pour suivre si l'utilisateur est en train de modifier son profil
  const [formData, setFormData] = useState({
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyez les données modifiées à la base de données
    updateUser(formData); // Supposons que cette fonction est fournie par le contexte AuthContext
    setEditing(false); // Passez l'état d'édition à false une fois les modifications soumises
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (editing) {
    return (
      <div className="d-flex flex-fill justify-content-center align-items-center">
        <div className={`${styles.profileContainer} card p-20`}>
          <h3 className="mb-20">Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.editingFormProfile}>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.editingFormProfile}>
              <label>Prénom:</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.editingFormProfile}>
              <label>Nom:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.editingFormProfile}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="mt-30" type="submit">
                Enregistrer
              </button>
              <button
                className="mt-30"
                type="button"
                onClick={() => setEditing(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-fill justify-content-center align-items-center">
      <div className={`${styles.profileContainer} card p-20`}>
        <h3 className="mb-20">Profile</h3>
        <ul className="">
          <li>
            Username : <span>{user.username}</span>
          </li>
          <li>
            Prénom : <span>{user.firstname}</span>
          </li>

          <li>
            Nom : <span>{user.lastname}</span>
          </li>

          <li>
            Email : <span>{user.email}</span>
          </li>
        </ul>
        <div className="d-flex justify-content-center">
          <button className="mt-30" onClick={() => setEditing(true)}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
