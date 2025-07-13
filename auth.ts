import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || 'supersecretkey',
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  callbacks: {
    jwt: async ({ token, user }) => {
      // Si hay un usuario, estamos en el primer inicio de sesión
      if (user) {
        token.role = user.role as string;
        token.id = user.id as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  ...authConfig,
});
