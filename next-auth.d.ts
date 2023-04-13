import NextAuth, { DefaultUser } from 'next-auth';
import { IPuppy } from './context/puppy';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"]
  }
  interface User {
    id: string;
    email?: string;
  }
}
