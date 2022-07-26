import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
const NextAuth = NextAuth({
  providers: [
    CredentialsProvider({
      name: "custom-provider",
      credentials: {
        phoneNumber: {
          label: "phoneNumber",
          type: "number",
          placeholder: "0123456789",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
        };

        // call API to handle login

        switch (payload.password) {
          case "1":
            return {
              data: {
                role: 1,
                accessToken: "accessToken",
                refreshToken: "refreshToke",
              },
            };
          case "2":
            return {
              data: {
                role: 1,
                accessToken: "accessToken",
                refreshToken: "refreshToke",
              },
            };
          case "3":
            return {
              data: {
                role: 1,
                accessToken: "accessToken",
                refreshToken: "refreshToke",
              },
            };
          default:
            return null;
        }
      },
    }),
  ],
  secret: "12345",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.token,
          refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
});
