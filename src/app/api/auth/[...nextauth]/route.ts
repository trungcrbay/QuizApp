import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { sendRequest } from "@/utils/api";

interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}
interface JWT {
  access_token: string;
  refresh_token: string;
  // user: IUser;
}

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
        // const res = await fetch("http://localhost:8081/api/v1/login", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   }),
        //   headers: { "Content-Type": "application/json" },          
        // });


        const res = await sendRequest<IBackendRes<JWT>>({
          url: `http://localhost:8081/api/v1/login`,
          method: "POST",
          body: {
            email: credentials?.email,
            password: credentials?.password,
          },
        })
        // const userInfo = await res.json();
        const password = credentials?.password;
        console.log("passsowrod: ",credentials?.password);
        // If no error and we have userInfo data, return it
        if (res && res.DT) {
          return res.DT as any;
        }
        // Return null if user data could not be retrieved
        else {
          throw new Error(res.message as string);
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
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider !== "credentials") {
        //crate account
        const res = await sendRequest<IBackendRes<JWT>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
          method: "POST",
          body: {
            type: account?.provider.toLocaleUpperCase(),
            username: user.email,
          },
        });
        console.log("check res data:")
        if (res.data) {
          token.access_token = res.data?.access_token;
          token.refresh_token = res.data?.refresh_token;
          token.user = res.data.user;
        }
      }
      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.access_token = user?.access_token;
        //@ts-ignore
        token.refresh_token = user?.refresh_token;
        //@ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.role = token.role;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
