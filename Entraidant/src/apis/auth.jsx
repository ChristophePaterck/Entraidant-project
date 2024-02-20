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
   const token = localStorage.getItem('token');
   console.log(token);

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
        "Authorization": `Bearer ${token}`,
      },
    });
   if (response.ok) {
     // Extraire les données JSON de la réponse
     const userData = await response.json();
     // Retourner les informations spécifiques de l'utilisateur (par exemple, son nom et son email)
     return {
       username: userData.username,
       email: userData.email,
       firstname: userData.firstname,
       lastname: userData.lastname
       // Ajoutez d'autres propriétés en fonction de ce que vous récupérez du profil utilisateur
     };
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

// Fonction pour se déconnecter de l'API d'authentification
// export async function signout() {
//   // Envoie une requête DELETE à l'URL de l'API d'authentification pour se déconnecter
//   await fetch(API_AUTH, {
//     method: "DELETE", // Méthode de la requête : DELETE
//   });
// }
