import React, { useState } from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import axios from "axios";
import { ClipLoader } from "react-spinners";

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
        <div key={i._id} className="tasks__card">
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4>{i.title}</h4>
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
        </div>
      ))}
    </div>
  );
}

export default Tasks;
