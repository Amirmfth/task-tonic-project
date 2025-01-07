import AddTodoPage from "@/components/templates/AddTodoPage";
import { getSession } from "next-auth/react";


function AddTodo() {
  return <AddTodoPage />;
}

export default AddTodo;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  
  return {
    props: { session },
  };
}