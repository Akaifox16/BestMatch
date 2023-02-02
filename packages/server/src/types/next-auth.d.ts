import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   *  Return user.id in Session
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession['user'];
  }
}
