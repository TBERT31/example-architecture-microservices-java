import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "next-auth/jwt";
import type { Account, Session } from "next-auth";
import { encrypt } from "@/utils/encryption";

export const authOptions = {
    providers: [
        KeycloakProvider({
          clientId: `${process.env.DEMO_FRONTEND_CLIENT_ID}`,
          clientSecret: `${process.env.DEMO_FRONTEND_CLIENT_SECRET}`,
          issuer: `${process.env.AUTH_ISSUER}`,
        }),
    ],

    callbacks: {
        async jwt({
            token,
            account,
        }: {
        token: JWT & { decoded?: any; access_token?: string; refresh_token?: string; expires_at?: number; error?: string; id_token?: string };
        account?: Account | null;
        }): Promise<JWT> {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
        
            if (account) {
                // account is only available the first time this callback is called on a new session (after the user signs in)
                token.decoded = jwtDecode(account.access_token!);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
            } else if (nowTimeStamp < token.expires_at!) {
                // token has not expired yet, return it
                return token;
            } else {
                // token is expired, try to refresh it
                console.log("Token has expired. Will refresh...")
                try {
                    const refreshedToken = await refreshAccessToken(token);
                    console.log("Token is refreshed.")
                    return refreshedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
        },
        async session({
            session,
            token,
        }: {
        session: Session & {
            access_token?: string;
            id_token?: string;
            roles?: string[];
            error?: string;
        };
        token: JWT & {
            decoded?: { realm_access?: { roles?: string[] } };
            access_token?: string;
            id_token?: string;
            error?: string;
        };
        }): Promise<Session> {
            // Send properties to the client
            session.access_token = encrypt(token.access_token!); // see utils/sessionTokenAccessor.js
            session.id_token = encrypt(token.id_token!);  // see utils/sessionTokenAccessor.js
            session.roles = token.decoded!.realm_access!.roles;
            session.error = token.error;      
            return session;
        },
    },
}

async function refreshAccessToken(token: JWT) {
    if (!token.refresh_token || typeof token.refresh_token !== "string") {
        throw new Error("Missing or invalid refresh token");
    }

    const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DEMO_FRONTEND_CLIENT_ID!,
        client_secret: process.env.DEMO_FRONTEND_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    });
    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;
  
    return {
      ...token,
      access_token: refreshToken.access_token,
      decoded: jwtDecode(refreshToken.access_token),
      id_token: refreshToken.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
      refresh_token: refreshToken.refresh_token,
    };
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };