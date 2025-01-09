import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { useEffect, useState } from "react";
import RadioButton from "../elements/RadioButton";

function TodoDetailPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [todoDetails, setTodoDetails] = useState({});
  //   get todo
  const { todoId: id, edit } = router.query;

  useEffect(() => {
    setIsPending(true);
    const fetchTodo = async () => {
      return await axios
        .get(`/api/todo/${id}`)
        .then((res) => res.data.data)
        .catch((err) => toast.error(err));
    };
    fetchTodo().then((res) => {
      setIsPending(false);
      setTodoDetails(res);
    });
  }, []);

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <ClipLoader size={180} color="#3f47f4" />
      </div>
    );

  return (
    <div>
      {edit && <TodoDetailPageEdit todo={todoDetails} />}
      {!edit && <TodoDetailPagedata todo={todoDetails} />}
    </div>
  );
}

export default TodoDetailPage;

function TodoDetailPageEdit({ todo }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);
  const router = useRouter();

  const todoEditSave = async () => {
    const res = await axios
      .patch(`/api/todo/${todo._id}`, { title, description, status })
      .then((res) => res.data)
      .catch((err) => toast.error(err));

    if (res.status === "success") {
      toast.success("Todo updated successfully");
      router.push("/");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="add-form flex-1">
        <h2 className="text-2xl font-bold">
          <MdEdit />
          Edit your todo
        </h2>
        <div className="add-form__input">
          <div className="add-form__input--first">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="add-form__input--first">
              <label htmlFor="description" className="my-4">
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                className="p-2 rounded-xl shadow-md -mb-12"
                rows={"7"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="add-form__input--second">
            <RadioButton
              name={"todo"}
              title={"Todo"}
              status={status}
              setStatus={setStatus}
            >
              <BsAlignStart />
            </RadioButton>
            <RadioButton
              name={"inProgress"}
              title={"in Progress"}
              status={status}
              setStatus={setStatus}
            >
              <FiSettings />
            </RadioButton>
            <RadioButton
              name={"review"}
              title={"Review"}
              status={status}
              setStatus={setStatus}
            >
              <AiOutlineFileSearch />
            </RadioButton>
            <RadioButton
              name={"done"}
              title={"Done"}
              status={status}
              setStatus={setStatus}
            >
              <MdDoneAll />
            </RadioButton>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => router.push("/")}
              className="bg-red-500 rounded-lg text-white"
            >
              Cancel
            </button>
            <button
              onClick={todoEditSave}
              className="bg-green-500 rounded-lg text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/assets/images/checklist-todo.webp"
        width={900}
        height={700}
        alt="todo"
        priority
      />
    </div>
  );
}

function TodoDetailPagedata({ todo }) {
  console.log(todo);
  return (
    <div className="flex justify-between">
      <div className="add-form flex-1">
        <h2 className="text-2xl font-bold">Todo: {todo.title}</h2>
        <div className="add-form__input">
          <div className="add-form__input--first">
            <label htmlFor="title">Title:</label>
            <p className="text-2xl font-semibold">{todo.title}</p>
            <div className="add-form__input--first">
              <label htmlFor="description" className="my-4">
                Description:
              </label>
              <p className="p-2 bg-white text-black text-lg rounded-lg">
                {todo.description}
              </p>
            </div>
            <label>Status:</label>
            <p className="p-2 px-4 border-4 w-fit border-black rounded-lg text-xl font-semibold">
                {todo.status}
            </p>
          </div>
          
        </div>
      </div>
      <Image
        src="/assets/images/checklist-todo.webp"
        width={900}
        height={700}
        alt="todo"
        priority
      />
    </div>
  );
}
