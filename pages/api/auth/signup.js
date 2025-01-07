import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", error: "failed to connect to DB" });
  }

  const { email, password, name, lastName } = req.body;
  if (!email || !password || !name || !lastName)
    return res
      .status(400)
      .json({
        status: "failed",
        error: "email, password, name and lastName are required",
      });

  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))
    return res.status(400).json({ status: "failed", error: "invalid email" });

  if (password.length < 8)
    return res
      .status(400)
      .json({
        status: "failed",
        error: "password must be at least 8 characters",
      });

  if (name.length < 2 || lastName.length < 2)
    return res
      .status(400)
      .json({
        status: "failed",
        error: "name and lastName must be at least 2 characters",
      });

  const isUserExists = await User.findOne({ email });
  if (isUserExists)
    return res
      .status(400)
      .json({ status: "failed", error: "user already exists" });

  const hashedPassword = await hashPassword(password);
  let user;
  try {
    user = await User.create({
      email,
      password: hashedPassword,
      name,
      lastName,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", error: "failed to create user" });
  }

  res.status(201).json({ status: "success", data: user });
}
