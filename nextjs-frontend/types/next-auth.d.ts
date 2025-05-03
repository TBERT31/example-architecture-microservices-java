import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    id_token?: string;
    roles?: string[];
    error?: string;
    user: {
        email: string;
        firstName: string;
        lastName: string;
    };
  }

  interface User {
    email: string;
    firstName: string;
    lastName: string;
  }
}

export {};
