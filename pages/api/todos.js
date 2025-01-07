import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { sortTodos } from "@/utils/sortTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "failed to connect to DB" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ status: "failed", message: "not authorized" });

  const user = await User.findOne({ email: session.user.email });

  if (!user)
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });

  // POST REQUESTS
  if (req.method === "POST") {
    const { title, status } = req.body;

    if (!title || !status)
      return res
        .status(400)
        .json({ status: "failed", message: "title and status is required" });

    if (typeof title !== "string" || title.trim().length === 0)
      return res
        .status(400)
        .json({ status: "failed", message: "title should be a valid string" });

    user.todos.push({ title, status });
    await user.save();
    return res.status(201).json({ status: "success", message: "Todo created" });
  }

  // GET REQUESTS
  if (req.method === "GET") {
    const sortedTodos = sortTodos(user.todos);
    return res
      .status(200)
      .json({ status: "success", data: { todos: sortedTodos } });
  }
}
