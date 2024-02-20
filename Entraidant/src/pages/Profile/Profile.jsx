import { useState } from "react";
import styles from "./Profile.module.scss";

function Profile() {
  const [username, setUsername] = useState("JohnDoe");
  const [firstname, setFirstname] = useState("John");
  const [lastname, setLastname] = useState("Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstname,
          lastname,
          email,
        }),
      });
      if (response.ok) {
        setIsEditing(false);
        // Gérer les cas de succès, comme afficher un message de confirmation
      } else {
        // Gérer les cas d'erreur
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex-fill d-flex justify-content-center align-items-center">
      <div className={`${styles.profileContainer} card p-20`}>
        <ul>
          <li>
            <strong>Username :</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              username
            )}
          </li>
          <li>
            <strong>Firstname:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            ) : (
              firstname
            )}
          </li>
          <li>
            <strong>Lastname:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            ) : (
              lastname
            )}
          </li>
          <li>
            <strong>Email :</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              email
            )}
          </li>
        </ul>
        <div>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
