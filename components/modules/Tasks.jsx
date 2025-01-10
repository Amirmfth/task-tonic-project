import React, { useState } from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Tasks({ data, refetch, next, back }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // handlers
  const changeStatus = async (id, status) => {
    setLoading(true);
    const res = await axios
      .patch(`/api/todos`, { id, status }, { withCredentials: true })
      .then((res) => res.data);

    if (res.status === "success") refetch();
    setLoading(false);
  };

  const deleteTodoHandler = async (id) => {
    const res = await axios
      .delete(`/api/todos`, {data:{id}, withCredentials: true })
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    if (res.status === "success") {
      toast.success("Todo deleted successfully");
      refetch();
    }
  };
  const editTodoHandler = (id) => {
    router.push(`/todo/${id}?edit=true`);
  };
  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="relative tasks__card">
          <span className={i.status}></span>
          <RiMastodonLine className="text-xl" />
          <h4 className="w-9/12 text-xl font-semibold text-gray-800 hover:text-blue-600 hover:scale-105 duration-150">
            <Link href={`/todo/${i._id}`}>{i.title}</Link>
          </h4>
          <div>
            {!!back && (
              <button
                onClick={() => changeStatus(i._id, back)}
                className="button-back hover:-translate-y-1 hover:translate-x-1 hover:shadow-md duration-200"
                disabled={loading}
              >
                <BiLeftArrow />
                Back
              </button>
            )}
            {!!next && (
              <button
                onClick={() => changeStatus(i._id, next)}
                className="button-next hover:-translate-y-1 hover:-translate-x-1 hover:shadow-md duration-200"
                disabled={loading}
              >
                Next
                <BiRightArrow />
              </button>
            )}
          </div>
          <div className="absolute top-2 right-4 flex flex-col space-y-1 text-2xl">
            <i
              onClick={() => editTodoHandler(i._id)}
              className="bg-gray-100 text-blue-400 cursor-pointer rounded-lg p-1 hover:-translate-y-1 hover:translate-x-1 hover:shadow-md duration-200"
            >
              <MdEdit />
            </i>
            <i
              onClick={() => deleteTodoHandler(i._id)}
              className="bg-gray-100 text-red-400 cursor-pointer rounded-lg p-1  hover:-translate-y-1 hover:translate-x-1 hover:shadow-md duration-200"
            >
              <MdDelete />
            </i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
