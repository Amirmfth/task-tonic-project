import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "failed to connect to DB" });
  }
  const { todoId } = req.query;

  //   GET REQUESTS
  if (req.method === "GET") {
    let todo;
    try {
      todo = await User.findOne(
        { todos: { $elemMatch: { _id: todoId } } },
        { "todos.$": 1 }
      );
    } catch (error) {
      return res
        .status(404)
        .json({ status: "failed", message: "Todo not found" });
    }
    return res.status(200).json({ status: "success", data: todo.todos[0] });
  }

  //   PATCH REQUESTS
  if (req.method === "PATCH") {
    const { title, description, status } = req.body;
    try {
      await User.findOneAndUpdate(
        { "todos._id": todoId },
        {
          $set: {
            "todos.$.title": title,
            "todos.$.description": description,
            "todos.$.status": status,
          },
        },
        { new: true }
      );
    } catch (error) {
      return res
        .status(404)
        .json({ status: "failed", message: "Todo not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Todo updated successfully" });
  }
}
