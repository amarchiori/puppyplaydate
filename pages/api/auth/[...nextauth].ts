import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({user, account, profile}) {
      const client = clientPromise
      const db = (await client).db("puppyplaydate")
      const existingUser = await db.collection("users").findOne({ email: user.email });

      if (!existingUser) {
        // If user doesn't exist, add empty puppies array to user object
        user.puppies = [];
        await db.collection("users").insertOne(user);
        return true;
      } else {
        return true;
      }
    },
    async session({session, user}) {
      session.user = user;
      return session;
    },
  },
  debug: true
});