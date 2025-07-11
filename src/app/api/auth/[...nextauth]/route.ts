
import NextAuth from 'next-auth';
import { authOptions } from '@/data/authOption';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
