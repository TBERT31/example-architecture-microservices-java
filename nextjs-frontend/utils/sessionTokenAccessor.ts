import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { decrypt } from "./encryption";

export async function getAccessToken() {

  const session = await getServerSession(authOptions);  
  if (session?.access_token) {
    return decrypt(session.access_token);
  }
  return null;
}

export async function getIdToken() {

  const session = await getServerSession(authOptions);  
  if (session?.id_token) {
    return decrypt(session.id_token);
  }
  return null;
}