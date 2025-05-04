import { getServerSession } from "next-auth";

import { decrypt } from "./encryption";
import { authOptions } from "./authOptions";

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