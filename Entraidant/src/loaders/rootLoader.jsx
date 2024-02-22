import { getCurrentUser } from "../apis/auth.jsx";

export async function rootLoader() {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return currentUser;
}
