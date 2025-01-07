import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { verifyPassword } from "@/utils/auth";
import User from "@/models/User";

export default async function handler(req, res) {
  // connect to db
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "failed to connect to DB" });
  }

  //   authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ status: "failed", message: "not logged in" });
  }

  //   get user
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }

  //   GET REQUESTS
  if (req.method === "GET") {
    console.log(user.email);
    return res.status(200).json({
      status: "success",
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  }
}
