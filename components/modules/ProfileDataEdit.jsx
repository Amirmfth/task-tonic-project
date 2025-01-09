import axios from "axios";
import moment from "moment/moment";
import { useState } from "react";
import { toast } from "react-toastify";

function ProfileDataEdit({ user, setEdit, refetch }) {
  const { name, lastName, email, createdAt } = user;
  const [editName, setEditName] = useState(name);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editEmail, setEditEmail] = useState(email);

  const saveEditHandler = async () => {
    const res = await axios
      .patch("/api/profile", {
        name: editName,
        lastName: editLastName,
        email: editEmail,
      })
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    if (res.status === "success") {
      toast.success("Profile updated successfully");
      refetch();
      setEdit(false);
    }
  };

  return (
    <div className="profile-data">
      <div>
        <span>Name: </span>
        <input
          className="text-xl text-black"
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </div>
      <div>
        <span>Last Name: </span>
        <input
          className="text-xl text-black"
          type="text"
          value={editLastName}
          onChange={(e) => setEditLastName(e.target.value)}
        />
      </div>
      <div>
        <span>Email: </span>
        <input
          className="text-xl text-black"
          type="text"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />
      </div>
      <div>
        <span>Member Since: </span>
        <p>{moment(createdAt).format("YYYY-MM-DD")}</p>
      </div>
      <div className="flex justify-between mt-16 space-x-6">
        <button
          onClick={() => setEdit(false)}
          className="border-2 bg-transparent border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-150"
        >
          Cancel
        </button>
        <button onClick={saveEditHandler} className="bg-green-600 text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfileDataEdit;
