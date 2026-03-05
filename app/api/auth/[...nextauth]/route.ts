import NextAuth from 'next-auth';

import { authOptions } from '@/lib/auth-options';

/** NextAuth: GET/POST /api/auth/* — сессии, signIn, signOut, callbacks (в т.ч. подстановка user.id из Firestore). */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
