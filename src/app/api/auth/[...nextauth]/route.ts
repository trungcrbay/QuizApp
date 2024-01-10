import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NO_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "trungcrbay" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8081/api/v1/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const userInfo = await res.json();

        // If no error and we have userInfo data, return it
        if (userInfo && userInfo.DT) {
          return userInfo.DT as any;
        }
        // Return null if user data could not be retrieved
        else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    jwt({ token, trigger, user, account, profile }) {
      console.log("profile: ",profile) //contain main data user github
      console.log("account: ",account) //contain data user github
      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.access_token = user.access_token;
        //@ts-ignore
        token.refresh_token = user.refresh_token;
        token.email = user.email;
        //@ts-ignore
        token.role=  user.role;
      }
      return token;
    },
    session({ session, user, token }) {
      if (token) {
        //@ts-ignore
        session.access_token = token.access_token;
        //@ts-ignore
        session.refresh_token = token.refresh_token;
        session.role = token.role;

      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
