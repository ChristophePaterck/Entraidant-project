import { getCurrentUser } from "../apis/auth.jsx";

export async function rootLoader() {
  // console.log(getCurrentUser())
  return getCurrentUser();
}
