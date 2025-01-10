import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvide from "next-auth/providers/google";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Failed to connect to DB");
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        const isPasswordCorrect = await verifyPassword(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
    GoogleProvide({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account.provider === "google") {
        await connectDB(); // Ensure database is connected

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          throw new Error("User already exists");
        }
        // Create a new user if not found
        await User.create({
          name: user.name,
          email: user.email,
        });

        return true; // Allow the sign-in to proceed
      }
    },
  },
};

export default NextAuth(authOptions);
