const API_AUTH = "https://entraidant-back.onrender.com/login/";

export async function signin(credentials) {
  const response = await fetch(API_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}

// export async function getCurrentUser() {
//   const response = await fetch(`${API_AUTH}/`);
//   return response.json();
  
// }

export async function signout() {
  await fetch(API_AUTH, {
    method: 'DELETE',
  })
}

