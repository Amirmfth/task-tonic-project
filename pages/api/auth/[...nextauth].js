import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
  ],
};

export default NextAuth(authOptions);
