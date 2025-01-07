import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import ProfileData from "../modules/ProfileData";

function ProfilePage({ session }) {
  const { data, isPending } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      return await axios.get("/api/profile").then((res) => res.data);
    },
  });
  const user = data?.data;

  return (
    <div className="profile-form">
      <h2 className="text-2xl font-bold">
        <CgProfile />
        Profile
      </h2>
      {isPending ? (
        <div className="flex items-center justify-center">
          <ClipLoader size={80} color="#3f47f4" />
        </div>
      ) : (
        <ProfileData user={user} />
      )}
    </div>
  );
}

export default ProfilePage;


