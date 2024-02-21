// URL de l'API d'authentification
const API_AUTH = "https://entraidant-back.onrender.com/login";

// Fonction pour se connecter à l'API d'authentification
export async function signin(credentials) {
  // Envoie une requête POST à l'API d'authentification avec les informations d'identification fournies
  const response = await fetch(API_AUTH, {
    method: "POST", // Méthode de la requête : POST
    headers: {
      "Content-Type": "application/json", // Type de contenu de la requête : JSON
    },
    body: JSON.stringify(credentials), // Corps de la requête : informations d'identification au format JSON
  });

  // Attend la réponse de l'API et la traite comme une réponse JSON
  const body = await response.json();

  // Si la réponse du serveur est "ok" (statut HTTP 200), retourne le corps de la réponse
  if (response.ok) {
    console.log(body);
    return body;
  } else {
    // Si la réponse contient des données JSON, lance une exception avec ce corps
    if (body) {
      throw body;
    } else {
      // Sinon, lance une nouvelle instance de l'erreur avec un message par défaut
      throw new Error("Oops une erreur est survenue");
    }
  }
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  //  console.log(token);

  if (!token) {
    console.log(
      "Aucun token d'authentification trouvé. Aucun utilisateur connecté."
    );
    return null;
  }
  try {
    const response = await fetch(`${API_AUTH}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      // Extraire les données JSON de la réponse
      const data = await response.json();
      const userData = data.data.user;
      console.log(userData);
      // Retourner les informations spécifiques de l'utilisateur (par exemple, son nom et son email)
      return userData;
      // Ajoutez d'autres propriétés en fonction de ce que vous récupérez du profil utilisateur
    } else {
      // Si la requête a échoué, l'API peut fournir des informations sur l'erreur
      console.error(
        "Erreur lors de la récupération du profil utilisateur:",
        response.statusText
      );
      return null; // Ou une autre valeur appropriée pour indiquer une erreur
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil utilisateur:",
      error.message
    );
    return;
  }
}

export async function signout() {
  // Envoie une requête DELETE à l'URL de l'API d'authentification pour se déconnecter
  await fetch(API_AUTH, {
    method: "DELETE", // Méthode de la requête : DELETE
  });
   document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



export async function updateUserApi(userId, updatedData) {
  const token = localStorage.getItem("token");

  // Vérifie si un token d'authentification est présent
  if (!token) {
    console.error("Aucun token d'authentification trouvé.");
    return null;
  }

  try {
    // Envoie une requête PUT à l'API pour mettre à jour les informations de l'utilisateur
    const response = await fetch(`${API_AUTH}/profile`, {
      method: "PUT", // Méthode de la requête : PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData), // Corps de la requête : données mises à jour au format JSON
    });

    // Vérifie si la requête a réussi
    if (response.ok) {
      // Attend la réponse de l'API et la traite comme une réponse JSON
      const data = await response.json();
      const updatedUser = data.data.user;
      console.log("Informations utilisateur mises à jour :", updatedUser);
      return updatedUser; // Retourne les données mises à jour de l'utilisateur
    } else {
      // Si la requête a échoué, l'API peut fournir des informations sur l'erreur
      console.error("Erreur lors de la mise à jour des informations utilisateur :", response.statusText);
      return null; // Ou une autre valeur appropriée pour indiquer une erreur
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des informations utilisateur :", error.message);
    return null;
  }
}
