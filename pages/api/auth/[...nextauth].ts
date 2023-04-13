import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { UserModel } from "../../../context/user";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
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
      const existingUser = await db.collection("users").findOne({ email: profile?.email });

      if (existingUser) {

        return true;
      } 
      // else {
      //   return true;
      // }
      await db.collection("users").insertOne({
        name: profile?.name,
        email: profile?.email,
      });

      return true
    },
    async session({session, user}) {
      session.user = user;
      return session;
    },
  },
  debug: true
});