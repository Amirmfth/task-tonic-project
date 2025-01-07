import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { useState } from "react";
import RadioButton from "../elements/RadioButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const addTodoMutation = useMutation({
    mutationFn: async () => {
      return await axios
        .post("/api/todos", { title, status }, { withCredentials: true })
        .then((res) => res.data);
    },
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Todo added successfully");
      } else {
        toast.error("Failed to add todo");
      }
    },
    onError: () => {
      toast.error("Failed to add todo");
    },
  });

  //handlers
  const addTodoHandler = async () => {
    addTodoMutation.mutate();
  };

  return (
    <div className="add-form">
      <h2 className="text-2xl font-bold">
        <GrAddCircle />
        Add New Todo
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
        <button onClick={addTodoHandler} disabled={addTodoMutation.isPending}>
          {addTodoMutation.isPending && <ClipLoader size={20} />}
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTodoPage;