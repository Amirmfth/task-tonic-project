import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Tasks from "../modules/Tasks";

function HomePage() {
  const router = useRouter();
  const { status } = useSession();

  const {
    data,
    isPending,
    error,
    refetch: refetchGetTodos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await axios.get("/api/todos").then((res) => res.data);
    },
    enabled: status === "authenticated",
  });
  const todos = data?.data?.todos;
  console.log(todos);

  //   effects
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  useEffect(() => {}, []);

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <ClipLoader size={180} />
      </div>
    );
  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        <Tasks data={todos["todo"]} />
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Tasks data={todos["inProgress"]} />
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Tasks data={todos["review"]} />
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={todos["done"]} />
      </div>
    </div>
  );
}

export default HomePage;
