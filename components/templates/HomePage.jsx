import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Tasks from "../modules/Tasks";
import HomePageSkeleton from "../modules/HomePageSkeleton";

function HomePage() {

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
  });
  const todos = data?.data?.todos;



  if (isPending)
    return (
      <HomePageSkeleton/>
    );
  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        <Tasks
          data={todos["todo"]}
          refetch={refetchGetTodos}
          next="inProgress"
        />
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Tasks
          data={todos["inProgress"]}
          refetch={refetchGetTodos}
          next="review"
          back="todo"
        />
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Tasks
          data={todos["review"]}
          refetch={refetchGetTodos}
          next="done"
          back="inProgress"
        />
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={todos["done"]} refetch={refetchGetTodos} back="review" />
      </div>
    </div>
  );
}

export default HomePage;
