import { getCurrentUser } from "../apis/auth.jsx";

export async function rootLoader() {
  return getCurrentUser();
}
