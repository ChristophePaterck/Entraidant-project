// URL de l'API pour créer un nouvel utilisateur
const API_USERS = "https://entraidant-back.onrender.com/login/signup";

// Fonction pour créer un nouvel utilisateur
export async function createUser(newUser) {
  // Envoie une requête POST à l'API pour créer un nouvel utilisateur avec les informations fournies
  const response = await fetch(API_USERS, {
    method: "POST", // Méthode de la requête : POST
    headers: {
      "Content-Type": "application/json", // Type de contenu de la requête : JSON
    },
    body: JSON.stringify(newUser), // Corps de la requête : nouvel utilisateur au format JSON
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
      throw new Error("Error api createUser");
    }
  }
}
