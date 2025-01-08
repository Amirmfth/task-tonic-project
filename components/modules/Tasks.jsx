import React, { useState } from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function Tasks({ data, refetch, next, back }) {
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
  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="relative tasks__card">
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4 className="text-2xl font-bold text-gray-800">{i.title}</h4>
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
            <i className="bg-gray-100 text-blue-400 cursor-pointer rounded-lg p-1">
              <MdEdit />
            </i>
            <i className="bg-gray-100 text-red-400 cursor-pointer rounded-lg p-1">
              <MdDelete />
            </i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
