// URL de l'API d'authentification
const API_AUTH = "https://entraidant-back.onrender.com/login/";

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

// export async function getCurrentUser() {
//   const response = await fetch(`${API_AUTH}/`);
//   return response.json();

// }


// Fonction pour se déconnecter de l'API d'authentification
export async function signout() {
  // Envoie une requête DELETE à l'URL de l'API d'authentification pour se déconnecter
  await fetch(API_AUTH, {
    method: "DELETE", // Méthode de la requête : DELETE
  });
}

