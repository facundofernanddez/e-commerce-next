import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ["facundofernanddez@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions as AuthOptions);

export const isAdminRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not admin session";
  }
};
