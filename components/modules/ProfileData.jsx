import moment from "moment/moment";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function ProfileData({ user, setEdit }) {
  const { name, lastName, email, createdAt } = user;

  // handlers
  const logoutHandler = async () => {
    signOut();
  };

  return (
    <div className="profile-data">
      <div>
        <span>Name: </span>
        <p>{name}</p>
      </div>
      <div>
        <span>Last Name: </span>
        <p>{lastName}</p>
      </div>
      <div>
        <span>Email: </span>
        <p>{email}</p>
      </div>
      <div>
        <span>Member Since: </span>
        <p>{moment(createdAt).format("YYYY-MM-DD")}</p>
      </div>
      <div className="flex justify-between mt-16 space-x-6">
        <button
          onClick={() => setEdit(true)}
          className="bg-blue-600 text-white"
        >
          Edit Profile
        </button>
        <button
          onClick={logoutHandler}
          className="border-2 bg-transparent border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-150"
        >
          Logout
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

export default ProfileData;
