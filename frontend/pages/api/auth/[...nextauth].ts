import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }),
  ],
  debug: true,
};

export default (req: any, res: any) => NextAuth(req, res, options);
