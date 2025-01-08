import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import ProfileData from "../modules/ProfileData";
import Image from "next/image";
import { useState } from "react";
import ProfileDataEdit from "../modules/ProfileDataEdit";

function ProfilePage({ session }) {
  const [edit, setEdit] = useState(false);
  const { data, isPending  , refetch} = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      return await axios.get("/api/profile").then((res) => res.data);
    },
  });
  const user = data?.data;

  

  return (
    <div className="flex justify-between">
      <div className="profile-form">
        <h2 className="text-4xl font-bold">
          <CgProfile />
          Profile
        </h2>
        {isPending && (
          <div className="flex items-center justify-center">
            <ClipLoader size={80} color="#3f47f4" />
          </div>
        )}
        {edit && <ProfileDataEdit refetch={refetch} setEdit={setEdit}  user={user} />}
        {!edit && !isPending && <ProfileData user={user} setEdit={setEdit} />}
      </div>
      <Image
        className="mr-60"
        src={"/assets/images/profile-icons.png"}
        width={700}
        height={700}
        alt="Profile"
      />
    </div>
  );
}

export default ProfilePage;
