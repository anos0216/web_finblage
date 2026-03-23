import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // --- FETCH USER FROM YOUR DATABASE ---
        // For now, returning a mock user
        if (
          credentials.email === "user@example.com" &&
          credentials.password === "password"
        ) {
          return {
            id: "1",
            name: "Finblage User",
            email: "user@example.com",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
          };
        }

        return null; // or throw new Error("Invalid credentials")
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/account");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup")) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
});
